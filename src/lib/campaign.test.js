import { expect, test } from 'bun:test';
import { readUtm, normalizeUtm, resolveSession, indiaDay, ORGANIC } from './campaign.js';

test('no UTM labels means organic/direct', () => {
  expect(readUtm('?foo=1')).toBeNull();
  expect(resolveSession(null, '', 'abcdefgh-1').utm).toEqual(ORGANIC);
  expect(normalizeUtm({ source: '<script>' })).toEqual(ORGANIC);
});
test('labels are trimmed and lowercased', () => {
  expect(readUtm('?utm_source=Facebook&utm_medium=%20Paid&utm_campaign=Diwali_Sales')).toEqual({ source: 'facebook', medium: 'paid', campaign: 'diwali_sales' });
});
test('stored session survives page changes without labels', () => {
  const s = { id: 'abcdefgh-1', utm: { source: 'facebook', medium: 'paid', campaign: 'diwali_sales' } };
  expect(resolveSession(s, '', 'zzzzzzzz-2')).toBe(s);
  expect(resolveSession(s, '?utm_source=facebook&utm_medium=paid&utm_campaign=diwali_sales', 'zzzzzzzz-2')).toBe(s);
});
test('different labels start a new session', () => {
  const s = { id: 'abcdefgh-1', utm: { ...ORGANIC } };
  const next = resolveSession(s, '?utm_source=instagram&utm_medium=paid&utm_campaign=x', 'zzzzzzzz-2');
  expect(next.id).toBe('zzzzzzzz-2');
  expect(next.utm.source).toBe('instagram');
});
test('today uses India calendar day', () => {
  expect(indiaDay(new Date('2026-11-09T19:00:00Z'))).toBe('2026-11-10');
  expect(indiaDay(new Date('2026-11-09T18:00:00Z'))).toBe('2026-11-09');
});
