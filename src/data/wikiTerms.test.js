import { describe, expect, test } from 'bun:test';
import { WIKI_TERMS } from './wikiTerms';

describe('WIKI_TERMS', () => {
  test('has 19 items', () => {
    expect(WIKI_TERMS).toHaveLength(19);
  });

  test('every item has a term, blurb and an https url', () => {
    for (const item of WIKI_TERMS) {
      expect(typeof item.term).toBe('string');
      expect(item.term.trim().length).toBeGreaterThan(0);
      expect(typeof item.blurb).toBe('string');
      expect(item.blurb.trim().length).toBeGreaterThan(0);
      expect(item.blurb.split(/\s+/).length).toBeLessThanOrEqual(12);
      expect(item.url.startsWith('https://')).toBe(true);
    }
  });

  test('urls are unique', () => {
    const urls = WIKI_TERMS.map((item) => item.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  test('terms are unique', () => {
    const terms = WIKI_TERMS.map((item) => item.term);
    expect(new Set(terms).size).toBe(terms.length);
  });
});
