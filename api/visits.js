// api/visits.js — records unique visitors (one per browser per day).
// GET returns public page-view counts (every page open) (no order data). POST {visitorId} records a visit. POST {code} with OWNER_ACCESS_CODE returns owner stats.
import { connectToDatabase } from './utils/mongodb.js';
import { buffer } from 'micro';
import { timingSafeEqual } from 'crypto';
import { STATUS_FILTERS } from '../src/lib/orderStatus.js';
import { normalizeUtm, isSessionId, indiaDay } from '../src/lib/campaign.js';

export const config = { api: { bodyParser: false } };

const ID_RE = /^[a-zA-Z0-9-]{8,64}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

function codeMatches(given, expected) {
  const a = Buffer.from(String(given || ''));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function campaignTable(db) {
  const today = indiaDay();
  const rows = await db.collection('rituraj-campaign-sessions').aggregate([
    { $group: { _id: { campaign: '$campaign', source: '$source', medium: '$medium' }, total: { $sum: 1 }, today: { $sum: { $cond: [{ $eq: ['$day', today] }, 1, 0] } } } },
    { $sort: { total: -1 } },
    { $limit: 200 },
  ]).toArray();
  return rows.map((r) => ({ ...r._id, today: r.today, total: r.total }));
}

export async function recordCampaignSession(db, sessionId, utm) {
  if (!isSessionId(sessionId)) return false;
  const col = db.collection('rituraj-campaign-sessions');
  await col.createIndex({ sessionId: 1 }, { unique: true });
  const labels = normalizeUtm(utm);
  await col.updateOne(
    { sessionId },
    { $setOnInsert: { sessionId, ...labels, day: indiaDay(), createdAt: new Date() } },
    { upsert: true }
  );
  return true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase(process.env.MONGODB_URI);
      const views = db.collection('rituraj-pageviews');
      const [last24h, total] = await Promise.all([
        views.countDocuments({ createdAt: { $gte: new Date(Date.now() - DAY_MS) } }),
        views.countDocuments({}),
      ]);
      return res.status(200).json({ last24h, total });
    } catch (err) {
      console.error('Visit counter error:', err);
      return res.status(500).json({ error: 'Could not load stats' });
    }
  }
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
      const thisWeek = { createdAt: { $gte: new Date(now - 7 * DAY_MS) } };
      const lastWeek = { createdAt: { $gte: new Date(now - 14 * DAY_MS), $lt: new Date(now - 7 * DAY_MS) } };
      const [last24h, total] = await Promise.all([
        visits.distinct('visitorId', { createdAt: { $gte: new Date(now - DAY_MS) } }).then((a) => a.length),
        visits.distinct('visitorId').then((a) => a.length),
      ]);
      const orderCounts = {};
      await Promise.all(Object.entries(STATUS_FILTERS).map(async ([key, f]) => {
        const [week, prevWeek, all] = await Promise.all([
          orders.countDocuments({ ...f, ...thisWeek }),
          orders.countDocuments({ ...f, ...lastWeek }),
          orders.countDocuments(f),
        ]);
        orderCounts[key] = { week, prevWeek, all };
      }));
      // Page opens vs unique visitors, both from the page-view log so the period matches exactly.
      const views = db.collection('rituraj-pageviews');
      const since24 = { createdAt: { $gte: new Date(now - DAY_MS) } };
      const [opens24h, opensTotal, uniq24h, uniqTotal, first] = await Promise.all([
        views.countDocuments(since24),
        views.countDocuments({}),
        views.distinct('visitorId', since24).then((a) => a.length),
        views.distinct('visitorId').then((a) => a.length),
        views.find({}, { projection: { createdAt: 1 } }).sort({ createdAt: 1 }).limit(1).next(),
      ]);
      const campaigns = await campaignTable(db);
      return res.status(200).json({
        last24h, total, orderCounts,
        compare: { opens24h, opensTotal, uniq24h, uniqTotal, since: first ? first.createdAt : null },
        campaigns,
      });
    }

    const visitorId = String(body.visitorId || '');
    if (!ID_RE.test(visitorId)) return res.status(400).json({ error: 'Invalid visitor' });
    await db.collection('rituraj-pageviews').insertOne({ visitorId, createdAt: new Date() });
    const day = new Date().toISOString().slice(0, 10);
    await visits.updateOne(
      { visitorId, day },
      { $setOnInsert: { visitorId, day, createdAt: new Date() } },
      { upsert: true }
    );
    try { await recordCampaignSession(db, body.sessionId, body.utm); } catch (e) { if (e?.code !== 11000) console.error('Campaign log error:', e); }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Visit counter error:', err);
    return res.status(500).json({ error: 'Could not load stats' });
  }
}
