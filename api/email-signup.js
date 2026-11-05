
// api/email-signup.js
import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';

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
    const { email, name } = JSON.parse(rawBody.toString());

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Name is optional: the Chapter One form only collects an email.

    const MONGODB_URI = process.env.MONGODB_URI;
    const db = await connectToDatabase(MONGODB_URI);
    const collection = db.collection('rituraj-subscribers');

    const existingEmail = await collection.findOne({ email });
    if (existingEmail) {
      return res.status(200).json({ message: 'Email already registered', status: 'exists' });
    }

    await collection.insertOne({
      email,
      name: typeof name === 'string' && name.trim() ? name.trim() : null,
      source: 'chapter-one',
      subscribedAt: new Date(),
    });

    return res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error processing email signup:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
