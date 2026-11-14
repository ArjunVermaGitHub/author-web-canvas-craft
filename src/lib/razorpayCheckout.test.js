import { expect, test } from 'bun:test';
import { purchaseOnce } from './razorpayCheckout';
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