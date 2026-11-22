import { expect, test } from 'bun:test';
import { recordCampaignSession, adVisitsTable } from '../../api/visits.js';

function fakeDb() {
  const rows = new Map();
  return { rows, collection: () => ({
    async createIndex() {},
    async updateOne(q, u) { if (!rows.has(q.sessionId)) rows.set(q.sessionId, u.$setOnInsert); },
  }) };
}
test('a repeated session is counted once', async () => {
  const db = fakeDb();
  const utm = { source: 'facebook', medium: 'paid', campaign: 'diwali_sales', content: 'hero_a' };
  await recordCampaignSession(db, 'abcdefgh-1', utm);
  await recordCampaignSession(db, 'abcdefgh-1', utm);
  expect(db.rows.size).toBe(1);
  expect(db.rows.get('abcdefgh-1')).toMatchObject(utm);
});
test('missing labels are logged as direct / organic', async () => {
  const db = fakeDb();
  await recordCampaignSession(db, 'abcdefgh-2', undefined);
  expect(db.rows.get('abcdefgh-2')).toMatchObject({ source: 'direct', medium: 'organic', campaign: '(none)', content: '(none)' });
});
test('invalid session id is ignored', async () => {
  const db = fakeDb();
  expect(await recordCampaignSession(db, 'x', {})).toBe(false);
  expect(db.rows.size).toBe(0);
});

test('server cleans optional content and accepts old requests without it', async () => {
  const db = fakeDb();
  await recordCampaignSession(db, 'abcdefgh-1', { source: 'Meta', content: ' AD_A ' });
  await recordCampaignSession(db, 'abcdefgh-2', { source: 'Meta', content: '<script>' });
  await recordCampaignSession(db, 'abcdefgh-3', { source: 'Meta' });
  expect(db.rows.get('abcdefgh-1').content).toBe('ad_a');
  expect(db.rows.get('abcdefgh-2').content).toBe('(none)');
  expect(db.rows.get('abcdefgh-3').content).toBe('(none)');
});

test('ad visits group session rows for exactly the last 7 days, including legacy content', async () => {
  let pipeline;
  const now = new Date('2026-11-22T02:51:00Z');
  const db = { collection: name => {
    expect(name).toBe('rituraj-campaign-sessions');
    return { aggregate: stages => { pipeline = stages; return { toArray: async () => [{ _id: 'ad_a', visits: 17 }, { _id: '(none)', visits: 2 }] }; } };
  } };
  expect(await adVisitsTable(db, now)).toEqual([{ content: 'ad_a', visits: 17 }, { content: '(none)', visits: 2 }]);
  expect(pipeline[0]).toEqual({ $match: { createdAt: { $gte: new Date('2026-11-15T02:51:00Z'), $lte: now } } });
  expect(pipeline[1]).toEqual({ $group: { _id: { $ifNull: ['$content', '(none)'] }, visits: { $sum: 1 } } });
  expect(pipeline[3]).toEqual({ $limit: 200 });
});
