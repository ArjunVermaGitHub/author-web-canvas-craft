// api/visits.js — unique visitor counter (one record per browser per day)
import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';

export const config = { api: { bodyParser: false } };

const ID_RE = /^[a-zA-Z0-9-]{8,64}$/;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = await connectToDatabase(process.env.MONGODB_URI);
    const col = db.collection('rituraj-visits');

    if (req.method === 'POST') {
      let body = {};
      try {
        const raw = (await buffer(req)).toString();
        body = raw ? JSON.parse(raw) : {};
      } catch {
        body = {};
      }
      const visitorId = String(body.visitorId || '');
      if (ID_RE.test(visitorId)) {
        const day = new Date().toISOString().slice(0, 10);
        await col.updateOne(
          { visitorId, day },
          { $setOnInsert: { visitorId, day, createdAt: new Date() } },
          { upsert: true }
        );
      }
    }

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [last24h, total] = await Promise.all([
      col.distinct('visitorId', { createdAt: { $gte: since } }).then((a) => a.length),
      col.distinct('visitorId').then((a) => a.length),
    ]);
    return res.status(200).json({ last24h, total });
  } catch (err) {
    console.error('Visit counter error:', err);
    return res.status(500).json({ error: 'Could not load visitor count' });
  }
}
