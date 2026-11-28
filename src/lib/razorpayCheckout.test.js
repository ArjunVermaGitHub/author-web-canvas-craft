import { expect, test } from 'bun:test';
import { purchaseOnce, trackConfirmedPurchase } from './razorpayCheckout';
test('Purchase fires once per order including reloaded storage and repeated callbacks', () => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
  let fires = 0; const fire = () => { fires++; }; const seen = new Set();
  expect(purchaseOnce('RK-ABC123', fire, storage, seen)).toBe(true);
  expect(purchaseOnce('RK-ABC123', fire, storage, seen)).toBe(false);
  expect(purchaseOnce('RK-ABC123', fire, storage, new Set())).toBe(false);
  expect(fires).toBe(1);
  expect(purchaseOnce('RK-DEF123', fire, storage, seen)).toBe(true); expect(fires).toBe(2);
});

test('confirmed Purchase and purchase_confirmed include session attribution without changing deduplication', () => {
  const previous = globalThis.window;
  const values = new Map([['rv-campaign-session', JSON.stringify({ id: 'abcdefgh-1', utm: { source: 'meta', medium: 'paid', campaign: 'launch', content: 'ad_a' } })]]);
  const storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) };
  const calls = [];
  globalThis.window = { location: { search: '' }, sessionStorage: storage, localStorage: storage, crypto: { randomUUID: () => 'abcdefgh-2' }, fbq: (...args) => calls.push(args), dataLayer: [] };
  try {
    trackConfirmedPurchase('RK-ATTRIB1', 399, 'Book');
    trackConfirmedPurchase('RK-ATTRIB1', 399, 'Book');
    expect(calls).toEqual([['track', 'Purchase', { value: 399, currency: 'INR', content_name: 'Book', content_type: 'product', order_id: 'RK-ATTRIB1', utm_campaign: 'launch', utm_content: 'ad_a' }]]);
    expect(window.dataLayer).toEqual([{ event: 'purchase_confirmed', value: 399, currency: 'INR', order_id: 'RK-ATTRIB1', utm_campaign: 'launch', utm_content: 'ad_a' }]);
  } finally { if (previous === undefined) delete globalThis.window; else globalThis.window = previous; }
});

test('verified purchase emits purchase_complete once without Meta, with ad labels', () => {
  const previous = globalThis.window;
  const values = new Map(); const calls = [];
  globalThis.window = { location: { hostname: 'www.riturajverma.com', pathname: '/', search: '?utm_campaign=launch&utm_content=ad_2' }, crypto: { randomUUID: () => 'abcdefgh-3' }, localStorage: { getItem: k => values.get(k), setItem: (k,v) => values.set(k,v) }, clarity: (...args) => calls.push(args), dataLayer: [] };
  try {
    trackConfirmedPurchase('RK-CLARITY1', 399, 'Book');
    trackConfirmedPurchase('RK-CLARITY1', 399, 'Book');
    expect(calls).toEqual([['set', 'utm_campaign', 'launch'], ['set', 'utm_content', 'ad_2'], ['event', 'purchase_complete']]);
    expect(window.dataLayer).toHaveLength(1);
  } finally { if (previous === undefined) delete globalThis.window; else globalThis.window = previous; }
});
