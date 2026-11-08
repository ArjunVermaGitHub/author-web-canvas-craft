import { describe, expect, test } from 'bun:test';
import { selectAmazonStore, trackPurchaseClick } from './purchase';
import { AMAZON_STORES } from '../config/amazon';
import { TOTAL_PRICE } from '../config/book';

describe('purchase destinations', () => {
  test('uses the configured ₹335 total', () => { expect(TOTAL_PRICE).toBe(335); });
  test('uses India for India and unknown regions', () => {
    expect(selectAmazonStore('en-IN', 'America/New_York')).toEqual({ store: 'India', url: 'https://amzn.in/d/0igsWonn' });
    expect(selectAmazonStore('en-ZA', 'Europe/London').store).toBe('India');
    expect(selectAmazonStore('', 'Etc/UTC').store).toBe('India');
  });
  test('matches each supported browser region to its country store', () => {
    const regions = ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'JP', 'SG', 'NL', 'SE', 'PL', 'BE'];
    regions.forEach((region, index) => {
      expect(selectAmazonStore(`en-${region}`, 'Asia/Kolkata')).toEqual({ store: AMAZON_STORES[index][0], url: AMAZON_STORES[index][1] });
    });
  });
  test('uses timezone only when language has no region', () => {
    expect(selectAmazonStore('en', 'Europe/London').url).toBe('https://www.amazon.co.uk/dp/9358987448');
    expect(selectAmazonStore('en', 'Australia/Sydney').store).toBe('Australia');
    expect(selectAmazonStore('invalid_locale', 'Asia/Tokyo').store).toBe('Japan');
  });
});

describe('optional Meta click tracking', () => {
  test('sends custom events with placement and Amazon store', () => {
    const calls = [];
    const pixel = (...args) => calls.push(args);
    trackPurchaseClick('OrderClick', 'sticky_bar', undefined, pixel);
    trackPurchaseClick('AmazonClick', 'hero', 'United States', pixel);
    expect(calls).toEqual([
      ['trackCustom', 'OrderClick', { placement: 'sticky_bar' }],
      ['trackCustom', 'AmazonClick', { placement: 'hero', store: 'United States' }],
    ]);
  });
  test('does not interrupt navigation without a pixel or when it fails', () => {
    expect(() => trackPurchaseClick('OrderClick', 'header')).not.toThrow();
    expect(() => trackPurchaseClick('AmazonClick', 'hero', 'India', () => { throw new Error('blocked'); })).not.toThrow();
  });
});