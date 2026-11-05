// api/visits.js — records unique visitors (one per browser per day).
// POST {visitorId} records a visit. POST {code} with OWNER_ACCESS_CODE returns owner stats.
import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';
import { timingSafeEqual } from 'crypto';

export const config = { api: { bodyParser: false } };

const ID_RE = /^[a-zA-Z0-9-]{8,64}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function codeMatches(given, expected) {
  const a = Buffer.from(String(given || ''));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = {};
  try {
    const raw = (await buffer(req)).toString();
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const db = await connectToDatabase(process.env.MONGODB_URI);
    const visits = db.collection('rituraj-visits');

    if (body.code !== undefined) {
      const ownerCode = process.env.OWNER_ACCESS_CODE;
      if (!ownerCode) return res.status(500).json({ error: 'Set OWNER_ACCESS_CODE in Vercel.' });
      if (!codeMatches(body.code, ownerCode)) return res.status(401).json({ error: 'Wrong access code' });

      const now = Date.now();
      const orders = db.collection('rituraj-orders');
      const [last24h, total, ordersThisWeek, ordersLastWeek, ordersTotal] = await Promise.all([
        visits.distinct('visitorId', { createdAt: { $gte: new Date(now - DAY_MS) } }).then((a) => a.length),
        visits.distinct('visitorId').then((a) => a.length),
        orders.countDocuments({ createdAt: { $gte: new Date(now - 7 * DAY_MS) } }),
        orders.countDocuments({ createdAt: { $gte: new Date(now - 14 * DAY_MS), $lt: new Date(now - 7 * DAY_MS) } }),
        orders.countDocuments({}),
      ]);
      return res.status(200).json({ last24h, total, ordersThisWeek, ordersLastWeek, ordersTotal });
    }

    const visitorId = String(body.visitorId || '');
    if (!ID_RE.test(visitorId)) return res.status(400).json({ error: 'Invalid visitor' });
    const day = new Date().toISOString().slice(0, 10);
    await visits.updateOne(
      { visitorId, day },
      { $setOnInsert: { visitorId, day, createdAt: new Date() } },
      { upsert: true }
    );
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Visit counter error:', err);
    return res.status(500).json({ error: 'Could not load stats' });
  }
}
