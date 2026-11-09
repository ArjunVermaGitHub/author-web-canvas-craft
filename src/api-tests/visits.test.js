import { expect, test } from 'bun:test';
import { recordCampaignSession } from '../../api/visits.js';

function fakeDb() {
  const rows = new Map();
  return { rows, collection: () => ({
    async createIndex() {},
    async updateOne(q, u) { if (!rows.has(q.sessionId)) rows.set(q.sessionId, u.$setOnInsert); },
  }) };
}
test('a repeated session is counted once', async () => {
  const db = fakeDb();
  const utm = { source: 'facebook', medium: 'paid', campaign: 'diwali_sales' };
  await recordCampaignSession(db, 'abcdefgh-1', utm);
  await recordCampaignSession(db, 'abcdefgh-1', utm);
  expect(db.rows.size).toBe(1);
  expect(db.rows.get('abcdefgh-1')).toMatchObject(utm);
});
test('missing labels are logged as direct / organic', async () => {
  const db = fakeDb();
  await recordCampaignSession(db, 'abcdefgh-2', undefined);
  expect(db.rows.get('abcdefgh-2')).toMatchObject({ source: 'direct', medium: 'organic', campaign: '(none)' });
});
test('invalid session id is ignored', async () => {
  const db = fakeDb();
  expect(await recordCampaignSession(db, 'x', {})).toBe(false);
  expect(db.rows.size).toBe(0);
});
