import { z } from 'zod';

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}, 'Enter a valid date.');
const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
export const trackingComparisonSchema = z.object({
  startDate: date,
  endDate: date,
  timezone: z.string().trim().min(1).max(80).refine(value => {
    try { new Intl.DateTimeFormat('en', { timeZone: value }); return true; } catch { return false; }
  }, 'Enter a valid timezone, such as Asia/Kolkata.'),
  destination: z.string().url().max(300).refine(value => new URL(value).protocol === 'https:', 'Use an HTTPS destination.'),
  scope: z.string().trim().min(1).max(300),
  matched: z.literal(true),
  outboundClicks: count,
  landingPageViews: count,
  ga4Sessions: count,
  notes: z.string().trim().max(1500).default(''),
}).refine(value => value.endDate >= value.startDate, { message: 'End date must be on or after start date.', path: ['endDate'] });

export function comparisonMetrics(data) {
  const percent = (numerator, denominator) => denominator === 0 ? null : Math.round(numerator / denominator * 1000) / 10;
  return {
    landingPageViewRate: percent(data.landingPageViews, data.outboundClicks),
    sessionsPerLandingPageView: percent(data.ga4Sessions, data.landingPageViews),
    clickToViewDifference: data.outboundClicks - data.landingPageViews,
    viewToSessionDifference: data.landingPageViews - data.ga4Sessions,
  };
}