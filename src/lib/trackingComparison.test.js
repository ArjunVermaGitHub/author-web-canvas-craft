import { expect, test } from 'bun:test';
import { trackingComparisonSchema, comparisonMetrics } from './trackingComparison';

const sample = { startDate: '2026-11-02', endDate: '2026-11-08', timezone: 'Asia/Kolkata', destination: 'https://www.riturajverma.com/', scope: 'Book sales campaign, Facebook paid traffic only', matched: true, outboundClicks: 1000, landingPageViews: 600, ga4Sessions: 300, notes: '' };
test('calculates comparison ratios and differences from the entered numbers', () => {
  expect(comparisonMetrics(sample)).toEqual({ landingPageViewRate: 60, sessionsPerLandingPageView: 50, clickToViewDifference: 400, viewToSessionDifference: 300 });
});
test('zero denominators remain unavailable rather than implying a rate', () => {
  expect(comparisonMetrics({ outboundClicks: 0, landingPageViews: 0, ga4Sessions: 0 })).toEqual({ landingPageViewRate: null, sessionsPerLandingPageView: null, clickToViewDifference: 0, viewToSessionDifference: 0 });
});
test('requires confirmation that dates, timezone and paid scope match', () => {
  expect(trackingComparisonSchema.safeParse({ ...sample, matched: false }).success).toBe(false);
  expect(trackingComparisonSchema.safeParse(sample).success).toBe(true);
});
test('rejects invalid dates, reversed ranges and invalid timezones', () => {
  for (const change of [{ startDate: '2026-02-30' }, { endDate: '2026-11-01' }, { timezone: 'not-a-timezone' }]) {
    expect(trackingComparisonSchema.safeParse({ ...sample, ...change }).success).toBe(false);
  }
});
test('requires nonnegative whole counts but allows sessions or views to exceed clicks', () => {
  for (const field of ['outboundClicks', 'landingPageViews', 'ga4Sessions']) {
    for (const value of [-1, 1.5, '', NaN]) expect(trackingComparisonSchema.safeParse({ ...sample, [field]: value }).success).toBe(false);
  }
  expect(trackingComparisonSchema.safeParse({ ...sample, ga4Sessions: 2000 }).success).toBe(true);
});