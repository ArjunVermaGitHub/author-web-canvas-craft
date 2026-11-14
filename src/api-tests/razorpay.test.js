import { expect, test } from 'bun:test';
import { createHmac } from 'node:crypto';
import orderHandler from '../../api/order.js';
import verifyHandler from '../../api/razorpay-verify.js';
import webhookHandler from '../../api/razorpay-webhook.js';
import { markPaid, toPaise, verifySignature, razorpayEnabled } from '../../api/utils/razorpay.js';
const env = { MONGODB_URI: 'mongodb://test-only', RAZORPAY_KEY_ID: 'test-id', RAZORPAY_KEY_SECRET: 'test-secret', RAZORPAY_WEBHOOK_SECRET: 'test-webhook' };
const sign = (value, secret = env.RAZORPAY_KEY_SECRET) => createHmac('sha256', secret).update(value).digest('hex');
const res = () => ({ code: 0, body: null, setHeader() {}, status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; }, end() {} });
function database() {
  const rows = [];
  const collection = {
    insertOne: async row => { rows.push(row); },
    findOne: async q => rows.find(row => Object.entries(q).every(([k, v]) => row[k] === v)),
    updateOne: async (q, u) => {
      const row = rows.find(row => Object.entries(q).every(([k, v]) => k === 'paidAt' ? row.paidAt === undefined : row[k] === v));
      if (!row) return { matchedCount: 0 };
      Object.assign(row, u.$set);
      return { matchedCount: 1 };
    },
  };
  return { rows, collection, db: { collection: () => collection } };
}
const buyer = { name: 'Test Reader', email: 'reader@example.com', phone: '9876543210', address: '123 Test Street Mumbai', pincode: '400001', amount: 1 };

test('valid signature verifies; invalid, tampered and malformed signatures fail', () => {
  const value = 'order_123|pay_123';
  expect(verifySignature(value, sign(value), env.RAZORPAY_KEY_SECRET)).toBe(true);
  expect(verifySignature(value, sign(value, 'wrong'), env.RAZORPAY_KEY_SECRET)).toBe(false);
  expect(verifySignature('order_123|pay_456', sign(value), env.RAZORPAY_KEY_SECRET)).toBe(false);
  expect(verifySignature(value, 'short', env.RAZORPAY_KEY_SECRET)).toBe(false);
});
test('configured ₹335 converts to 33500 paise', () => {
  expect(toPaise(335)).toBe(33500);
  expect(toPaise(1.25)).toBe(125);
  expect(() => toPaise(NaN)).toThrow();
});
test('Razorpay requires both keys', () => {
  expect(razorpayEnabled(env)).toBe(true);
  for (const e of [{}, { RAZORPAY_KEY_ID: 'id' }, { RAZORPAY_KEY_SECRET: 'secret' }]) expect(razorpayEnabled(e)).toBe(false);
});
test('missing either key retains existing order response, amount, pending status and phonepe without API calls', async () => {
  for (const keys of [{}, { RAZORPAY_KEY_ID: 'id' }, { RAZORPAY_KEY_SECRET: 'secret' }]) {
    const store = database(); const r = res(); let calls = 0;
    await orderHandler({ method: 'POST' }, r, { env: { MONGODB_URI: env.MONGODB_URI, ...keys }, db: store.db, rawBody: JSON.stringify(buyer), fetch: () => { calls++; } });
    expect(r.code).toBe(201); expect(r.body.razorpay).toBeUndefined(); expect(calls).toBe(0);
    expect(store.rows[0].paymentMethod).toBe('phonepe'); expect(store.rows[0].status).toBe('pending_verification');
    expect(store.rows[0].amount).toBe(1); expect(r.body.orderId).toMatch(/^RK-[A-F0-9]{6}$/);
  }
});
test('active order ignores client amount, sends receipt/notes and returns no secret', async () => {
  const store = database(); const r = res(); let payload;
  await orderHandler({ method: 'POST' }, r, { env, db: store.db, rawBody: JSON.stringify(buyer), fetch: async (_url, options) => {
    payload = JSON.parse(options.body);
    return { ok: true, json: async () => ({ id: 'order_123', amount: 33500, currency: 'INR' }) };
  } });
  expect(r.code).toBe(201); expect(payload).toEqual({ amount: 33500, currency: 'INR', receipt: r.body.orderId, notes: { orderId: r.body.orderId } });
  expect(r.body.razorpay).toEqual({ orderId: 'order_123', keyId: 'test-id', amount: 33500 });
  expect(JSON.stringify(r.body)).not.toContain(env.RAZORPAY_KEY_SECRET);
  expect(store.rows[0].amount).toBe(335); expect(store.rows[0].razorpayOrderId).toBe('order_123');
});
test('paid marking is atomic and idempotent, preserving first payment and time', async () => {
  const s = database(); s.rows.push({ razorpayOrderId: 'order_123', paymentMethod: 'razorpay', status: 'pending_verification' });
  const date = new Date('2026-11-14T00:00:00Z');
  await Promise.all([markPaid(s.collection, 'order_123', 'pay_123', date), markPaid(s.collection, 'order_123', 'pay_other')]);
  expect(s.rows[0].status).toBe('paid'); expect(s.rows[0].paymentId).toBe('pay_123'); expect(s.rows[0].paidAt).toEqual(date);
});
test('verification checks capture, amount and signature before paid; retry is idempotent', async () => {
  const s = database(); s.rows.push({ razorpayOrderId: 'order_123', paymentMethod: 'razorpay', amount: 335, status: 'pending_verification' });
  const body = { razorpay_order_id: 'order_123', razorpay_payment_id: 'pay_123', razorpay_signature: sign('order_123|pay_123') };
  const run = async (payment, input = body) => {
    const r = res(); await verifyHandler({ method: 'POST' }, r, { env, db: s.db, rawBody: JSON.stringify(input), fetch: async () => ({ ok: true, json: async () => payment }) }); return r;
  };
  const payment = { id: 'pay_123', order_id: 'order_123', status: 'captured', currency: 'INR', amount: 33500 };
  expect((await run(payment, { ...body, razorpay_signature: 'bad' })).code).toBe(400);
  expect((await run({ ...payment, status: 'authorized' })).code).toBe(409);
  expect((await run({ ...payment, amount: 1 })).code).toBe(409);
  expect(s.rows[0].status).toBe('pending_verification');
  expect((await run(payment)).body).toEqual({ ok: true });
  const paidAt = s.rows[0].paidAt;
  expect((await run(payment)).body).toEqual({ ok: true }); expect(s.rows[0].paidAt).toBe(paidAt);
});
test('webhook verifies raw bytes and secret; both captured events mark once, other events return 200', async () => {
  const s = database(); s.rows.push({ razorpayOrderId: 'order_123', paymentMethod: 'razorpay', amount: 335, status: 'pending_verification' });
  const run = async (event, { secret = env.RAZORPAY_WEBHOOK_SECRET, tamper = false, amount = 33500 } = {}) => {
    const raw = JSON.stringify({ event, payload: { payment: { entity: { id: 'pay_123', order_id: 'order_123', status: 'captured', currency: 'INR', amount } } } });
    const r = res(); await webhookHandler({ method: 'POST', headers: { 'x-razorpay-signature': sign(raw, env.RAZORPAY_WEBHOOK_SECRET) } }, r, { env: { ...env, RAZORPAY_WEBHOOK_SECRET: secret }, db: s.db, rawBody: Buffer.from(tamper ? raw + ' ' : raw) }); return r;
  };
  expect((await run('payment.captured', { secret: '' })).code).toBe(503);
  expect((await run('payment.captured', { tamper: true })).code).toBe(400);
  expect((await run('payment.captured', { amount: 1 })).code).toBe(400);
  expect(s.rows[0].status).toBe('pending_verification');
  expect((await run('payment.authorized')).code).toBe(200);
  expect((await run('payment.captured')).code).toBe(200); const paidAt = s.rows[0].paidAt;
  expect((await run('order.paid')).code).toBe(200); expect(s.rows[0].paidAt).toBe(paidAt);
});