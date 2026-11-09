import { expect, test } from 'bun:test';
import { Readable } from 'node:stream';
import { EventEmitter } from 'node:events';
import handler from '../../api/insights.js';

async function request(body) {
  const req = Readable.from([Buffer.from(JSON.stringify(body))]);
  req.method = 'POST'; req.headers = { 'content-type': 'application/json' };
  const res = new EventEmitter();
  res.setHeader = () => {};
  res.status = value => { res.statusCode = value; return res; };
  res.json = value => { res.body = value; return res; };
  res.end = () => {};
  await handler(req, res);
  return res;
}
test('tracking analysis rejects wrong owner codes before model calls', async () => {
  const oldCode = process.env.OWNER_ACCESS_CODE; const oldKey = process.env.LOVABLE_API_KEY;
  process.env.OWNER_ACCESS_CODE = 'local-test-only'; process.env.LOVABLE_API_KEY = 'test-no-network';
  try { expect((await request({ code: 'wrong', mode: 'tracking', comparison: {} })).statusCode).toBe(401); }
  finally {
    if (oldCode === undefined) delete process.env.OWNER_ACCESS_CODE; else process.env.OWNER_ACCESS_CODE = oldCode;
    if (oldKey === undefined) delete process.env.LOVABLE_API_KEY; else process.env.LOVABLE_API_KEY = oldKey;
  }
});
test('owner comparison with missing or unmatched fields is rejected before model calls', async () => {
  const oldCode = process.env.OWNER_ACCESS_CODE; const oldKey = process.env.LOVABLE_API_KEY;
  process.env.OWNER_ACCESS_CODE = 'local-test-only'; process.env.LOVABLE_API_KEY = 'test-no-network';
  try { expect((await request({ code: 'local-test-only', mode: 'tracking', comparison: {} })).statusCode).toBe(400); }
  finally {
    if (oldCode === undefined) delete process.env.OWNER_ACCESS_CODE; else process.env.OWNER_ACCESS_CODE = oldCode;
    if (oldKey === undefined) delete process.env.LOVABLE_API_KEY; else process.env.LOVABLE_API_KEY = oldKey;
  }
});