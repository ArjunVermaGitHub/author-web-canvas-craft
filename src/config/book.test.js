import { describe, expect, test } from 'bun:test';
import { FACEBOOK_URL, INSTAGRAM_URL } from './book';

describe('author follow links', () => {
  test('Instagram points at the series profile', () => {
    expect(INSTAGRAM_URL).toBe('https://www.instagram.com/raghav.kartikeya.series/');
  });
  test('Facebook points at the author page', () => {
    expect(FACEBOOK_URL).toBe('https://www.facebook.com/profile.php?id=61574944773635');
  });
  test('both are https links', () => {
    [INSTAGRAM_URL, FACEBOOK_URL].forEach((url) => {
      expect(url.startsWith('https://')).toBe(true);
    });
  });
});
