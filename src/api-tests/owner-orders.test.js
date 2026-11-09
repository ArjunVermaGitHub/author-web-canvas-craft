import { expect, test, beforeEach } from 'bun:test';
import handler, { validateUpdate } from '../../api/owner-orders.js';
import { isOrderId, isOrderStatus, codeMatches } from '../lib/orderStatus.js';

function fakeRes() {
  const r = { code: 0, body: null, setHeader() {}, status(c) { r.code = c; return r; }, json(b) { r.body = b; return r; }, end() { return r; } };
  return r;
}
function fakeDb(updates) {
  return { collection: () => ({
    async updateOne(q, u) { updates.push([q, u]); return { matchedCount: q.orderId === 'RK-ABC123' ? 1 : 0 }; },
    find: () => ({ sort: () => ({ limit: () => ({ toArray: async () => [{ orderId: 'RK-ABC123' }] }) }) }),
  }) };
}
beforeEach(() => { process.env.OWNER_ACCESS_CODE = 'secret-code'; });

test('order IDs must match RK-XXXXXX', () => {
  expect(isOrderId('RK-ABC123')).toBe(true);
  expect(isOrderId('RK-abc123')).toBe(false);
  expect(isOrderId('RK-ABC12')).toBe(false);
  expect(isOrderId({ $ne: 1 })).toBe(false);
});
test('only the three statuses are allowed', () => {
  for (const s of ['pending_verification', 'paid', 'cancelled']) expect(isOrderStatus(s)).toBe(true);
  expect(isOrderStatus('shipped')).toBe(false);
  expect(validateUpdate({ orderId: 'RK-ABC123', status: 'refunded' })).toBe('Invalid status');
});
test('code comparison rejects wrong or missing codes', () => {
  expect(codeMatches('secret-code', 'secret-code')).toBe(true);
  expect(codeMatches('secret-codf', 'secret-code')).toBe(false);
  expect(codeMatches('', 'secret-code')).toBe(false);
  expect(codeMatches('x', undefined)).toBe(false);
});
test('wrong code cannot list or change orders', async () => {
  const updates = [];
  const res = fakeRes();
  await handler({ method: 'POST' }, res, { rawBody: JSON.stringify({ code: 'nope', orderId: 'RK-ABC123', status: 'paid' }), db: fakeDb(updates) });
  expect(res.code).toBe(401);
  expect(updates.length).toBe(0);
  const res2 = fakeRes();
  await handler({ method: 'POST' }, res2, { rawBody: JSON.stringify({ code: 'nope' }), db: fakeDb(updates) });
  expect(res2.code).toBe(401);
  expect(res2.body.orders).toBeUndefined();
});
test('valid update stores status and statusUpdatedAt', async () => {
  const updates = [];
  const res = fakeRes();
  await handler({ method: 'POST' }, res, { rawBody: JSON.stringify({ code: 'secret-code', orderId: 'RK-ABC123', status: 'paid' }), db: fakeDb(updates) });
  expect(res.code).toBe(200);
  expect(updates[0][1].$set.status).toBe('paid');
  expect(updates[0][1].$set.statusUpdatedAt).toBeInstanceOf(Date);
});
test('invalid status is rejected before touching the database', async () => {
  const updates = [];
  const res = fakeRes();
  await handler({ method: 'POST' }, res, { rawBody: JSON.stringify({ code: 'secret-code', orderId: 'RK-ABC123', status: 'shipped' }), db: fakeDb(updates) });
  expect(res.code).toBe(400);
  expect(updates.length).toBe(0);
});
