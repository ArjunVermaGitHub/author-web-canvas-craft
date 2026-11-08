import { describe, expect, test } from 'bun:test';
import { selectAmazonStore, trackPurchaseClick, trackOrderSaved } from './purchase';
import { AMAZON_STORES, AMAZON_URL, AMAZON_EBOOK_URL } from '../config/amazon';
import { TOTAL_PRICE } from '../config/book';

describe('purchase destinations', () => {
  test('uses the configured ₹335 total', () => { expect(TOTAL_PRICE).toBe(335); });
  test('uses India for India and unknown regions', () => {
    expect(selectAmazonStore('en-IN', 'America/New_York')).toEqual({ store: 'India', url: AMAZON_URL });
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

describe('OrderSaved tracking', () => {
  test('sends placement, INR value and order id', () => {
    const calls = [];
    trackOrderSaved('buy', TOTAL_PRICE, 'RK-ABC123', (...args) => calls.push(args));
    expect(calls).toEqual([
      ['trackCustom', 'OrderSaved', { placement: 'buy', value: 335, currency: 'INR', order_id: 'RK-ABC123' }],
    ]);
  });
  test('omits order_id when absent and never throws', () => {
    const calls = [];
    trackOrderSaved('modal', TOTAL_PRICE, undefined, (...args) => calls.push(args));
    expect(calls).toEqual([
      ['trackCustom', 'OrderSaved', { placement: 'modal', value: 335, currency: 'INR' }],
    ]);
    expect(() => trackOrderSaved('buy', TOTAL_PRICE)).not.toThrow();
    expect(() => trackOrderSaved('buy', TOTAL_PRICE, 'RK-X', () => { throw new Error('blocked'); })).not.toThrow();
  });
});

describe('Ebook click tracking', () => {
  test('sends EbookClick with the placement only', () => {
    const calls = [];
    trackPurchaseClick('EbookClick', 'hero', undefined, (...args) => calls.push(args));
    trackPurchaseClick('EbookClick', 'buy', undefined, (...args) => calls.push(args));
    expect(calls).toEqual([
      ['trackCustom', 'EbookClick', { placement: 'hero' }],
      ['trackCustom', 'EbookClick', { placement: 'buy' }],
    ]);
  });
  test('does nothing without a pixel and never throws when it fails', () => {
    expect(() => trackPurchaseClick('EbookClick', 'hero')).not.toThrow();
    expect(() => trackPurchaseClick('EbookClick', 'buy', undefined, () => { throw new Error('blocked'); })).not.toThrow();
  });
});

describe('Indian-edition ebook link', () => {
  test('points at the Kindle edition with the associates tag', () => {
    expect(AMAZON_EBOOK_URL).toContain('B0HF7RJB8C');
    expect(AMAZON_EBOOK_URL).toContain('tag=raghavlink1-21');
  });
});