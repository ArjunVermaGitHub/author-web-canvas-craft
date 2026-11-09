import { describe, expect, test } from 'bun:test';
import { FACEBOOK_URL, INSTAGRAM_URL, COMMUNITY_WHATSAPP_NUMBER, COMMUNITY_WHATSAPP_URL } from './book';

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

test('community WhatsApp number and encoded reader message', () => {
  expect(COMMUNITY_WHATSAPP_NUMBER).toBe('919324893014');
  const url = new URL(COMMUNITY_WHATSAPP_URL);
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe('/919324893014');
  expect(url.searchParams.get('text')).toBe("Hi Rituraj, I'm a reader of Raghav Kartikeya and the Tablets of Dharma.");
});
