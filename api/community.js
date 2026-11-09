import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';
import { communitySchema } from '../src/lib/communityValidation.js';

export const config = { api: { bodyParser: false } };

// Dependencies are injectable for isolated tests; production uses the existing Mongo connection.
export function createCommunityHandler(connect = connectToDatabase) {
  return async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    let body;
    try {
      const rawBody = await buffer(req, { limit: '16kb' });
      body = JSON.parse(rawBody.toString());
    } catch {
      return res.status(400).json({ error: 'Please send valid signup details.' });
    }
    if (body && typeof body.honeypot === 'string' && body.honeypot.trim()) {
      return res.status(201).json({ status: 'joined' });
    }
    const result = communitySchema.safeParse(body);
    if (!result.success) {
      const errors = {};
      for (const issue of result.error.issues) errors[issue.path[0]] ??= issue.message;
      return res.status(400).json({ error: 'Please check your details.', errors });
    }
    if (!process.env.MONGODB_URI) return res.status(500).json({ error: 'Server configuration error' });
    try {
      const db = await connect(process.env.MONGODB_URI);
      const collection = db.collection('rituraj-community');
      // A unique index also prevents concurrent signups creating duplicate emails.
      await collection.createIndex({ email: 1 }, { unique: true });
      const { name, email, phone } = result.data;
      if (await collection.findOne({ email })) return res.status(200).json({ status: 'exists' });
      await collection.insertOne({ name, email, phone, consent: true, source: 'community-section', joinedAt: new Date() });
      return res.status(201).json({ status: 'joined' });
    } catch (error) {
      if (error?.code === 11000) return res.status(200).json({ status: 'exists' });
      // Do not log database errors: they may contain personal details.
      return res.status(500).json({ error: 'Could not join right now. Please try again.' });
    }
  };
}

export default createCommunityHandler();