import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';
import { randomBytes } from 'crypto';
import { createRazorpayOrder, razorpayEnabled } from './utils/razorpay.js';
import { TOTAL_PRICE } from '../src/config/bookPrice.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const NAME_RE = /^[\p{L} .'-]{2,100}$/u;
const PHONE_RE = /^[6-9]\d{9}$/;
const PINCODE_RE = /^[1-9]\d{5}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeOrderId() {
  return `RK-${randomBytes(3).toString('hex').toUpperCase()}`;
}

export default async function handler(req, res, deps = {}) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = deps.rawBody ?? await buffer(req);
    const body = JSON.parse(rawBody.toString());
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const address = typeof body.address === 'string' ? body.address.trim() : '';
    const pincode = typeof body.pincode === 'string' ? body.pincode.trim() : '';
    const message =
      typeof body.message === 'string' && body.message.trim()
        ? body.message.trim()
        : undefined;
    const amount = Number(body.amount);

    if (!name || !NAME_RE.test(name)) {
      return res.status(400).json({ error: 'Please provide a valid name' });
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }
    if (!PHONE_RE.test(phone)) {
      return res.status(400).json({ error: 'Please provide a valid 10-digit mobile number' });
    }
    if (!address || address.length < 10 || address.length > 300) {
      return res.status(400).json({ error: 'Please provide a full address (10–300 characters)' });
    }
    if (!PINCODE_RE.test(pincode)) {
      return res.status(400).json({ error: 'Please provide a valid 6-digit pincode' });
    }
    if (message && message.length > 200) {
      return res.status(400).json({ error: 'Message must be 200 characters or fewer' });
    }
    if (!Number.isFinite(amount) || amount <= 0 || amount > 100000) {
      return res.status(400).json({ error: 'Invalid order amount' });
    }

    const env = deps.env ?? process.env;
    const active = razorpayEnabled(env);
    const MONGODB_URI = env.MONGODB_URI;
    if (!MONGODB_URI) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const db = deps.db ?? await connectToDatabase(MONGODB_URI);
    const collection = db.collection('rituraj-orders');
    const orderId = makeOrderId();

    await collection.insertOne({
      orderId,
      name,
      email,
      phone,
      address,
      pincode,
      message: message ?? null,
      amount: active ? TOTAL_PRICE : amount,
      paymentMethod: active ? 'razorpay' : 'phonepe',
      status: 'pending_verification',
      createdAt: new Date(),
    });

    let razorpay;
    if (active) {
      razorpay = await createRazorpayOrder(orderId, env, deps.fetch ?? fetch);
      await collection.updateOne({ orderId }, { $set: { razorpayOrderId: razorpay.orderId } });
    }

    return res.status(201).json({
      message: 'Order saved successfully',
      orderId,
      ...(razorpay ? { razorpay } : {}),
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
