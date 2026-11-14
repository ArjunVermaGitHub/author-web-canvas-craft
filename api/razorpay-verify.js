import { buffer } from 'micro';
import { connectToDatabase } from './utils/mongodb.js';
import { capturedPayment, markPaid, razorpayEnabled, toPaise, verifySignature } from './utils/razorpay.js';
import { TOTAL_PRICE } from '../src/config/bookPrice.js';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res, deps = {}) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const env = deps.env ?? process.env;
  if (!razorpayEnabled(env)) return res.status(503).json({ error: 'Payment verification unavailable' });
  let body;
  try { body = JSON.parse((deps.rawBody ?? await buffer(req)).toString()); }
  catch { return res.status(400).json({ error: 'Invalid request' }); }
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body;
  if (typeof orderId !== 'string' || !/^order_[a-zA-Z0-9]+$/.test(orderId) || typeof paymentId !== 'string' || !/^pay_[a-zA-Z0-9]+$/.test(paymentId) ||
      !verifySignature(`${orderId}|${paymentId}`, signature, env.RAZORPAY_KEY_SECRET)) {
    return res.status(400).json({ error: 'Invalid payment signature' });
  }
  try {
    const db = deps.db ?? await connectToDatabase(env.MONGODB_URI);
    const orders = db.collection('rituraj-orders');
    const order = await orders.findOne({ razorpayOrderId: orderId, paymentMethod: 'razorpay' });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.paidAt) {
      if (order.paymentId !== paymentId) return res.status(409).json({ error: 'Payment does not match' });
      return res.status(200).json({ ok: true });
    }
    // A valid checkout signature can precede capture. Never report an authorization as paid.
    const payment = await capturedPayment(paymentId, env, deps.fetch ?? fetch);
    if (payment.id !== paymentId || payment.order_id !== orderId || payment.status !== 'captured' ||
        payment.currency !== 'INR' || payment.amount !== toPaise(order.amount) || payment.amount !== toPaise(TOTAL_PRICE)) {
      return res.status(409).json({ error: 'Payment not yet confirmed. Please try again.' });
    }
    await markPaid(orders, orderId, paymentId);
    const saved = await orders.findOne({ razorpayOrderId: orderId });
    if (!saved?.paidAt || saved.paymentId !== paymentId) return res.status(409).json({ error: 'Payment does not match' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: 'Could not verify payment. Please try again.' });
  }
}