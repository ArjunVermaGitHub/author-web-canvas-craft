
// api/order.js — stores book orders with shipping details in MongoDB
import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';

const NAME_RE = /^[\p{L} .'-]{2,100}$/u;
const PHONE_RE = /^[6-9]\d{9}$/; // Indian mobile numbers
const PINCODE_RE = /^[1-9]\d{5}$/;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
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
    const { name, phone, address, pincode, message, amount } = JSON.parse(rawBody.toString());

    if (!name || !NAME_RE.test(name.trim())) {
      return res.status(400).json({ error: 'Please provide a valid name' });
    }
    if (!phone || !PHONE_RE.test(String(phone).trim())) {
      return res.status(400).json({ error: 'Please provide a valid 10-digit mobile number' });
    }
    if (!address || address.trim().length < 10 || address.trim().length > 300) {
      return res.status(400).json({ error: 'Please provide a full address (10–300 characters)' });
    }
    if (!pincode || !PINCODE_RE.test(String(pincode).trim())) {
      return res.status(400).json({ error: 'Please provide a valid 6-digit pincode' });
    }
    if (typeof amount !== 'number' || amount <= 0 || amount > 100000) {
      return res.status(400).json({ error: 'Invalid order amount' });
    }
    if (message !== undefined && message !== null && (typeof message !== 'string' || message.trim().length > 200)) {
      return res.status(400).json({ error: 'Message must be 200 characters or fewer' });
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    const db = await connectToDatabase(MONGODB_URI);
    const collection = db.collection('rituraj-orders');

    const result = await collection.insertOne({
      name: name.trim(),
      phone: String(phone).trim(),
      address: address.trim(),
      pincode: String(pincode).trim(),
      message: typeof message === 'string' && message.trim() ? message.trim() : null, // handwritten note for the author to write on the book
      amount,
      status: 'payment_confirmed_by_buyer', // verify in PhonePe app before shipping
      orderedAt: new Date(),
    });

    return res.status(201).json({
      message: 'Order placed successfully',
      orderId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
