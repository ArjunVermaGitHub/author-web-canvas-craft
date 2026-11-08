import { describe, expect, test } from 'bun:test';
import { INDUS_NEWS } from './indusNews';

describe('INDUS_NEWS', () => {
  test('has 15 items', () => {
    expect(INDUS_NEWS).toHaveLength(15);
  });

  test('every item has a title, outlet, year and an https url', () => {
    for (const item of INDUS_NEWS) {
      expect(typeof item.title).toBe('string');
      expect(item.title.trim().length).toBeGreaterThan(0);
      expect(typeof item.outlet).toBe('string');
      expect(item.outlet.trim().length).toBeGreaterThan(0);
      expect(Number.isInteger(item.year)).toBe(true);
      expect(item.year).toBeGreaterThan(1900);
      expect(item.url.startsWith('https://')).toBe(true);
    }
  });

  test('urls are unique', () => {
    const urls = INDUS_NEWS.map((item) => item.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  test('items are ordered newest first by year', () => {
    for (let i = 1; i < INDUS_NEWS.length; i += 1) {
      expect(INDUS_NEWS[i - 1].year).toBeGreaterThanOrEqual(INDUS_NEWS[i].year);
    }
  });
});
