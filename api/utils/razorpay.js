import { createHmac, timingSafeEqual } from 'node:crypto';
import { TOTAL_PRICE } from '../../src/config/bookPrice.js';

export function razorpayEnabled(env = process.env) {
  return Boolean(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET);
}

export function toPaise(price) {
  const amount = Math.round(price * 100);
  if (!Number.isFinite(price) || price <= 0 || !Number.isSafeInteger(amount)) throw new Error('Invalid price');
  return amount;
}

export function verifySignature(payload, signature, secret) {
  if (!secret || typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = createHmac('sha256', secret).update(payload).digest();
  return timingSafeEqual(expected, Buffer.from(signature, 'hex'));
}

export async function createRazorpayOrder(orderId, env = process.env, request = fetch) {
  const amount = toPaise(TOTAL_PRICE);
  const response = await request('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString('base64')}`,
    },
    body: JSON.stringify({ amount, currency: 'INR', receipt: orderId, notes: { orderId } }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Could not start payment');
  const order = await response.json();
  if (typeof order.id !== 'string' || !order.id.startsWith('order_') || order.amount !== amount || order.currency !== 'INR') {
    throw new Error('Invalid payment order');
  }
  return { orderId: order.id, keyId: env.RAZORPAY_KEY_ID, amount };
}

// First verified capture wins; retries/webhooks cannot replace paymentId or paidAt.
export async function markPaid(collection, razorpayOrderId, paymentId, paidAt = new Date()) {
  return collection.updateOne(
    { razorpayOrderId, paymentMethod: 'razorpay', paidAt: { $exists: false } },
    { $set: { status: 'paid', paymentId, paidAt, statusUpdatedAt: paidAt } },
  );
}

export async function capturedPayment(paymentId, env = process.env, request = fetch) {
  const response = await request(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
    headers: { Authorization: `Basic ${Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString('base64')}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Could not verify payment');
  return response.json();
}