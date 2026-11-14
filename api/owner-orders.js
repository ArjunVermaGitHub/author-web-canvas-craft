// api/owner-orders.js — owner-only order log. POST {code} lists orders; POST {code, orderId, status} updates one.
import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';
import { codeMatches, isOrderId, isOrderStatus } from '../src/lib/orderStatus.js';

export const config = { api: { bodyParser: false } };

export function validateUpdate(body) {
  if (!isOrderId(body.orderId)) return 'Invalid order ID';
  if (!isOrderStatus(body.status)) return 'Invalid status';
  return null;
}

export default async function handler(req, res, deps = {}) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = {};
  try {
    const raw = deps.rawBody ?? (await buffer(req)).toString();
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return res.status(400).json({ error: 'Invalid request' });
  }
  const ownerCode = process.env.OWNER_ACCESS_CODE;
  if (!ownerCode) return res.status(500).json({ error: 'Set OWNER_ACCESS_CODE in Vercel.' });
  if (!codeMatches(body.code, ownerCode)) return res.status(401).json({ error: 'Wrong access code' });

  const isUpdate = body.orderId !== undefined || body.status !== undefined;
  if (isUpdate) {
    const problem = validateUpdate(body);
    if (problem) return res.status(400).json({ error: problem });
  }

  try {
    const db = deps.db ?? (await connectToDatabase(process.env.MONGODB_URI));
    const orders = db.collection('rituraj-orders');
    if (isUpdate) {
      const statusUpdatedAt = new Date();
      const r = await orders.updateOne({ orderId: body.orderId }, { $set: { status: body.status, statusUpdatedAt } });
      if (!r.matchedCount) return res.status(404).json({ error: 'Order not found' });
      return res.status(200).json({ orderId: body.orderId, status: body.status, statusUpdatedAt });
    }
    const list = await orders.find({}, {
      projection: { _id: 0, orderId: 1, createdAt: 1, name: 1, phone: 1, email: 1, address: 1, pincode: 1, amount: 1, status: 1, message: 1, statusUpdatedAt: 1, paymentMethod: 1, paymentId: 1, paidAt: 1 },
    }).sort({ createdAt: -1 }).limit(1000).toArray();
    return res.status(200).json({ orders: list });
  } catch (err) {
    console.error('Owner orders error:', err);
    return res.status(500).json({ error: 'Could not load orders' });
  }
}
