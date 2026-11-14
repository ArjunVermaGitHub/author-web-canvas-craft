import { buffer } from 'micro';
import { connectToDatabase } from './utils/mongodb.js';
import { markPaid, toPaise, verifySignature } from './utils/razorpay.js';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res, deps = {}) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Razorpay-Signature');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const env = deps.env ?? process.env;
  if (!env.RAZORPAY_WEBHOOK_SECRET) return res.status(503).json({ error: 'Webhook unavailable' });
  try {
    const raw = deps.rawBody ?? await buffer(req);
    if (!verifySignature(raw, req.headers['x-razorpay-signature'], env.RAZORPAY_WEBHOOK_SECRET)) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    const event = JSON.parse(raw.toString());
    if (!['payment.captured', 'order.paid'].includes(event.event)) return res.status(200).json({ ok: true });
    const payment = event.payload?.payment?.entity;
    if (!payment || typeof payment.id !== 'string' || typeof payment.order_id !== 'string' || payment.status !== 'captured' || payment.currency !== 'INR') {
      return res.status(400).json({ error: 'Invalid payment' });
    }
    const db = deps.db ?? await connectToDatabase(env.MONGODB_URI);
    const orders = db.collection('rituraj-orders');
    const order = await orders.findOne({ razorpayOrderId: payment.order_id, paymentMethod: 'razorpay' });
    if (!order) return res.status(200).json({ ok: true });
    if (payment.amount !== toPaise(order.amount)) return res.status(400).json({ error: 'Amount does not match' });
    await markPaid(orders, payment.order_id, payment.id);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: 'Could not process webhook' });
  }
}