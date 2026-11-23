import { expect, test } from 'bun:test';
import { allowsClarity, clarityEventForPurchase, trackClarityEvent, setClarityCampaign } from './clarity';

test('Clarity allows only the two public production hosts', () => {
  for (const host of ['www.riturajverma.com', 'riturajverma.com']) expect(allowsClarity(host, '/')).toBe(true);
  for (const host of ['localhost', 'lovable.dev', 'author-web-canvas-craft.lovable.app', 'id-preview--x.lovable.app', 'x.lovableproject.com']) expect(allowsClarity(host, '/')).toBe(false);
});
test('Clarity excludes owner routes and Electron', () => {
  expect(allowsClarity('www.riturajverma.com', '/owner/insights')).toBe(false);
  expect(allowsClarity('riturajverma.com', '/owner')).toBe(false);
  expect(allowsClarity('www.riturajverma.com', '/', 'Mozilla Electron/30')).toBe(false);
});
test('purchase clicks map to the requested funnel names, not form-start events', () => {
  expect(clarityEventForPurchase('AmazonClick')).toBe('amazon_click');
  expect(clarityEventForPurchase('EbookClick')).toBe('kindle_click');
  expect(clarityEventForPurchase('FlipkartClick')).toBe('flipkart_click');
  expect(clarityEventForPurchase('OrderClick')).toBe('signed_copy_click');
  expect(clarityEventForPurchase('CheckoutStarted')).toBeUndefined();
});
test('Clarity receives ad labels and one event, independently of Meta', () => {
  const calls = [];
  const target = { location: { hostname: 'www.riturajverma.com', pathname: '/', search: '?utm_campaign=launch&utm_content=ad_1' }, clarity: (...args) => calls.push(args) };
  trackClarityEvent('amazon_click', target);
  expect(calls).toEqual([['set', 'utm_campaign', 'launch'], ['set', 'utm_content', 'ad_1'], ['event', 'amazon_click']]);
  target.location.pathname = '/owner/insights';
  trackClarityEvent('amazon_click', target);
  expect(calls).toHaveLength(3);
});
test('missing and failing Clarity are harmless', () => {
  expect(() => trackClarityEvent('whatsapp_click', { location: { hostname: 'riturajverma.com', pathname: '/' } })).not.toThrow();
  expect(() => trackClarityEvent('whatsapp_click', { location: { hostname: 'riturajverma.com', pathname: '/' }, clarity: () => { throw Error('blocked'); } })).not.toThrow();
});

test('campaign labels are set as soon as Clarity becomes available without a click', () => {
 const calls = [];
 const target = { location: { hostname: 'riturajverma.com', pathname: '/', search: '?utm_campaign=launch&utm_content=ad_3' } };
 expect(setClarityCampaign(target)).toBe(false);
 target.clarity = (...args) => calls.push(args);
 expect(setClarityCampaign(target)).toBe(true);
 expect(calls).toEqual([['set', 'utm_campaign', 'launch'], ['set', 'utm_content', 'ad_3']]);
});
