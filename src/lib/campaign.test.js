import { expect, test } from 'bun:test';
import { readUtm, normalizeUtm, resolveSession, indiaDay, ORGANIC, campaignTrackingData, cleanLabel, getCampaignSession, CAMPAIGN_SESSION_KEY } from './campaign.js';

test('no UTM labels means organic/direct', () => {
  expect(readUtm('?foo=1')).toBeNull();
  expect(resolveSession(null, '', 'abcdefgh-1').utm).toEqual(ORGANIC);
  expect(normalizeUtm({ source: '<script>' })).toEqual(ORGANIC);
});
test('labels are trimmed and lowercased', () => {
  expect(readUtm('?utm_source=Facebook&utm_medium=%20Paid&utm_campaign=Diwali_Sales&utm_content=%20Hero_01')).toEqual({ source: 'facebook', medium: 'paid', campaign: 'diwali_sales', content: 'hero_01' });
});
test('stored session survives page changes without labels', () => {
  const s = { id: 'abcdefgh-1', utm: { source: 'facebook', medium: 'paid', campaign: 'diwali_sales', content: 'hero_01' } };
  expect(resolveSession(s, '', 'zzzzzzzz-2')).toEqual(s);
  expect(resolveSession(s, '?utm_source=facebook&utm_medium=paid&utm_campaign=diwali_sales&utm_content=hero_01', 'zzzzzzzz-2')).toEqual(s);
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

test('a change in only utm_content starts a new session label set', () => {
  const search = '?utm_source=facebook&utm_medium=paid&utm_campaign=launch&utm_content=ad_a';
  const stored = resolveSession(null, search, 'abcdefgh-1');
  const next = resolveSession(stored, search.replace('ad_a', 'ad_b'), 'zzzzzzzz-2');
  expect(next).toEqual({ id: 'zzzzzzzz-2', utm: { source: 'facebook', medium: 'paid', campaign: 'launch', content: 'ad_b' } });
});

test('legacy sessions gain content (none) without changing their session id', () => {
  const legacy = { id: 'abcdefgh-1', utm: { source: 'facebook', medium: 'paid', campaign: 'launch' } };
  for (const search of ['', '?utm_source=facebook&utm_medium=paid&utm_campaign=launch']) {
    expect(resolveSession(legacy, search, 'zzzzzzzz-2')).toEqual({ ...legacy, utm: { ...legacy.utm, content: '(none)' } });
  }
});

test('content follows the same length and character restrictions as every label', () => {
  expect(readUtm('?utm_content=%3Cscript%3E')).toBeNull();
  expect(readUtm('?utm_content=Ad-01.2%2Btake').content).toBe('ad-01.2+take');
  expect(readUtm('?utm_content=' + 'A'.repeat(110)).content).toBe(cleanLabel('A'.repeat(110)));
  expect(normalizeUtm({ source: 'Meta', content: '<script>' }).content).toBe('(none)');
  expect(normalizeUtm({ source: 'Meta', content: ' Ad_A ' }).content).toBe('ad_a');
});

test('pixel attribution omits missing/invalid labels and never includes other session data', () => {
  expect(campaignTrackingData({ campaign: ' Launch ', content: ' Ad_A ', email: 'buyer@example.com' })).toEqual({ utm_campaign: 'launch', utm_content: 'ad_a' });
  expect(campaignTrackingData(ORGANIC)).toEqual({});
  expect(campaignTrackingData({ campaign: '<script>', content: '(none)' })).toEqual({});
  expect(campaignTrackingData({ content: 'ad_a' })).toEqual({ utm_content: 'ad_a' });
});

test('browser session keeps content through navigation and records a changed ad with a new id', () => {
  const previous = globalThis.window;
  const values = new Map(); let id = 0;
  globalThis.window = { location: { search: '?utm_campaign=launch&utm_content=ad_a' }, sessionStorage: { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) }, crypto: { randomUUID: () => `abcdefgh-${++id}` } };
  try {
    const first = getCampaignSession();
    window.location.search = '';
    expect(getCampaignSession()).toEqual(first);
    expect(JSON.parse(values.get(CAMPAIGN_SESSION_KEY)).utm.content).toBe('ad_a');
    window.location.search = '?utm_campaign=launch&utm_content=ad_b';
    const next = getCampaignSession();
    expect(next.id).not.toBe(first.id);
    expect(next.utm.content).toBe('ad_b');
  } finally { if (previous === undefined) delete globalThis.window; else globalThis.window = previous; }
});
