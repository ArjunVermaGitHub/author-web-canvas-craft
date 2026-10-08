import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';
import { randomBytes } from 'crypto';

export const config = {
  api: {
    bodyParser: false,
  },
};

const phoneRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^[1-9]\d{5}$/;

function makeOrderId() {
  return `RK-${randomBytes(3).toString('hex').toUpperCase()}`;
}

export default async function handler(req, res) {
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
    const rawBody = await buffer(req);
    const body = JSON.parse(rawBody.toString());
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const address = typeof body.address === 'string' ? body.address.trim() : '';
    const pincode = typeof body.pincode === 'string' ? body.pincode.trim() : '';
    const message =
      typeof body.message === 'string' && body.message.trim()
        ? body.message.trim()
        : undefined;
    const amount = Number(body.amount);

    if (!name || name.length < 2 || name.length > 100) {
      return res.status(400).json({ error: 'Valid name is required' });
    }
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Enter a valid 10-digit mobile number' });
    }
    if (!address || address.length < 10 || address.length > 300) {
      return res.status(400).json({ error: 'Please enter your full address' });
    }
    if (!pincodeRegex.test(pincode)) {
      return res.status(400).json({ error: 'Enter a valid 6-digit pincode' });
    }
    if (message && message.length > 200) {
      return res.status(400).json({ error: 'Message is too long' });
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const db = await connectToDatabase(MONGODB_URI);
    const collection = db.collection('rituraj-orders');
    const orderId = makeOrderId();

    await collection.insertOne({
      orderId,
      name,
      phone,
      address,
      pincode,
      message,
      amount,
      paymentMethod: 'phonepe',
      status: 'pending_verification',
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: 'Order saved successfully',
      orderId,
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
