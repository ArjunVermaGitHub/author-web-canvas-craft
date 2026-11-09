import { describe, expect, test } from 'bun:test';
import { OTHER_BOOKS, OTHER_BOOKS_SERIES_URL, OTHER_BOOK_SERIES } from './otherBooks';

describe('pen-name catalogue', () => {
  test('contains ten books with unique titles and URLs', () => {
    expect(OTHER_BOOKS).toHaveLength(10);
    expect(new Set(OTHER_BOOKS.map(book => book.title)).size).toBe(10);
    expect(new Set(OTHER_BOOKS.map(book => book.url)).size).toBe(10);
  });
  test('uses the exact supplied Amazon destinations in order', () => {
    expect(OTHER_BOOKS.map(book => book.url)).toEqual([
      'https://www.amazon.com/dp/B0DPKTX5XL', 'https://www.amazon.com/dp/B0DPVCYXMW',
      'https://www.amazon.com/dp/B0DPQYCZ72', 'https://www.amazon.com/dp/B0F4QM55GW',
      'https://www.amazon.com/dp/B0DPQ9JCX4', 'https://www.amazon.com/dp/B0DPJ2ZVBJ',
      'https://www.amazon.com/dp/B0DPX79C8X', 'https://www.amazon.com/dp/B0DQ4KNV3L',
      'https://www.amazon.com/dp/B0DQJBKSFT', 'https://www.amazon.com/dp/B0DPPC382S',
    ]);
    for (const book of OTHER_BOOKS) expect(book.url).toMatch(/^https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}$/);
    expect(OTHER_BOOKS_SERIES_URL).toBe('https://www.amazon.com/dp/B0DPJ8NZVK');
  });
  test('blurbs are nonempty and at most twenty words', () => {
    for (const book of OTHER_BOOKS) {
      expect(book.blurb.trim().length).toBeGreaterThan(0);
      expect(book.blurb.trim().split(/\s+/).length).toBeLessThanOrEqual(20);
    }
  });
  test('preserves formats, page counts and the China title spelling', () => {
    expect(OTHER_BOOKS.map(book => book.pages)).toEqual([84, 84, 84, 78, 84, 83, 84, 84, 84, 84]);
    expect(OTHER_BOOKS.map(book => book.format)).toEqual(['Paperback', 'Paperback', 'Paperback', 'Hardcover', 'Paperback', 'Paperback', 'Paperback', 'Paperback', 'Paperback', 'Paperback']);
    expect(OTHER_BOOKS[5].title).toBe('Cute Chats in China Coloring Book');
    expect(OTHER_BOOKS[3].title).toContain('Bold & Easy hardcover edition');
    expect(OTHER_BOOK_SERIES).toEqual([{ label: 'James Furrington: Cute Cats Coloring Books', path: '/james-furrington' }]);
  });
});