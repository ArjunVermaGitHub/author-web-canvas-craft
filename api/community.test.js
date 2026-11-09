import { expect, test } from 'bun:test';
import { Readable } from 'node:stream';
import { createCommunityHandler } from './community.js';

const valid = { name: 'Reader Name', email: 'Reader@Example.COM', phone: '98765-43210', consent: true, honeypot: '' };
async function request(body, { exists = false, method = 'POST', dbError = null } = {}) {
  const saved = [];
  const queries = [];
  let connections = 0;
  const handler = createCommunityHandler(async () => {
    connections++;
    return { collection(name) {
      expect(name).toBe('rituraj-community');
      return {
        async createIndex(keys, options) { expect(keys).toEqual({ email: 1 }); expect(options).toEqual({ unique: true }); },
        async findOne(query) { queries.push(query); return exists ? { _id: 'existing' } : null; },
        async insertOne(row) { if (dbError) throw dbError; saved.push(row); },
      };
    } };
  });
  const req = Readable.from([typeof body === 'string' ? body : JSON.stringify(body)]);
  req.method = method;
  req.headers = { 'content-type': 'application/json' };
  const res = { headers: {}, setHeader(key, value) { this.headers[key] = value; }, status(code) { this.code = code; return this; }, json(data) { this.data = data; return this; }, end() { return this; } };
  const before = process.env.MONGODB_URI;
  process.env.MONGODB_URI = 'mongodb://mock-only';
  try { await handler(req, res); } finally { if (before === undefined) delete process.env.MONGODB_URI; else process.env.MONGODB_URI = before; }
  return { res, saved, queries, connections };
}
test('bad input returns 400 without connecting', async () => {
  for (const body of [{ ...valid, name: '1' }, { ...valid, email: 'bad' }, { ...valid, phone: '123' }, { ...valid, consent: false }, '{broken']) {
    const result = await request(body);
    expect(result.res.code).toBe(400);
    expect(result.connections).toBe(0);
  }
});
test('new signup returns 201 and saves normalized fields only', async () => {
  const result = await request({ ...valid, unwanted: 'discard' });
  expect(result.res.code).toBe(201);
  expect(result.res.data).toEqual({ status: 'joined' });
  expect(result.saved).toHaveLength(1);
  expect(result.saved[0]).toEqual({ name: 'Reader Name', email: 'reader@example.com', phone: '+919876543210', consent: true, source: 'community-section', joinedAt: expect.any(Date) });
});
test('duplicate lowercased email returns 200 without inserting', async () => {
  const result = await request(valid, { exists: true });
  expect(result.res.code).toBe(200);
  expect(result.res.data).toEqual({ status: 'exists' });
  expect(result.queries).toEqual([{ email: 'reader@example.com' }]);
  expect(result.saved).toHaveLength(0);
});
test('honeypot returns 201 without saving or connecting', async () => {
  const result = await request({ honeypot: 'bot' });
  expect(result.res.code).toBe(201);
  expect(result.connections).toBe(0);
  expect(result.saved).toHaveLength(0);
});
test('concurrent duplicate returns exists; storage failure never claims success', async () => {
  expect((await request(valid, { dbError: { code: 11000 } })).res.data).toEqual({ status: 'exists' });
  expect((await request(valid, { dbError: new Error('private database error') })).res.code).toBe(500);
});
test('preflight has order CORS headers and other methods are rejected', async () => {
  const result = await request({}, { method: 'OPTIONS' });
  expect(result.res.code).toBe(200);
  expect(result.res.headers['Access-Control-Allow-Origin']).toBe('*');
  expect(result.res.headers['Access-Control-Allow-Methods']).toBe('GET,POST,OPTIONS');
  expect((await request({}, { method: 'GET' })).res.code).toBe(405);
});