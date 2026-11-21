import { expect, test } from 'bun:test';
import { giftMessage, messageFromPrefill, showHomeOrderBar, DESKTOP_NAV_PAGES, MORE_NAV_PAGES, HOME_REVIEWERS } from './homeConversion';
import { NAV_PAGES } from '../config/site';
import { READER_REVIEWS } from '../data/readerReviews';

test('gift name creates the requested handwritten message, not a default when empty', () => {
  expect(giftMessage(' Aarav ')).toBe('To Aarav, every hero starts small. Read bravely!');
  expect(giftMessage('')).toBe('');
  expect(giftMessage('A'.repeat(30))).toBe(`To ${'A'.repeat(24)}, every hero starts small. Read bravely!`);
});
test('gift prefilling updates an untouched message', () => expect(messageFromPrefill('old', giftMessage('Maya'), false)).toBe('To Maya, every hero starts small. Read bravely!'));
test('gift prefilling never overwrites an edited message, including an intentionally cleared field', () => {
  expect(messageFromPrefill('My own message', giftMessage('Maya'), true)).toBe('My own message');
  expect(messageFromPrefill('', giftMessage('Maya'), true)).toBe('');
});
test('existing flows without initialMessage retain their current message', () => expect(messageFromPrefill('Existing', undefined, false)).toBe('Existing'));
test('sticky ordering starts only after the hero CTA is above the viewport and hides at order', () => {
  expect(showHomeOrderBar(false, false)).toBe(false);
  expect(showHomeOrderBar(true, false)).toBe(true);
  expect(showHomeOrderBar(true, true)).toBe(false);
  expect(showHomeOrderBar(false, true)).toBe(false);
});
test('compact desktop links and More preserve every existing page', () => {
  expect(DESKTOP_NAV_PAGES.map(page => page.path)).toEqual(['/reviews', '/wiki', '/world', '/author']);
  expect([...DESKTOP_NAV_PAGES, ...MORE_NAV_PAGES].map(page => page.path).concat('/shop').sort()).toEqual(NAV_PAGES.map(page => page.path).sort());
});
test('eight homepage reviewer links come verbatim from supplied reviews', () => {
  expect(HOME_REVIEWERS).toHaveLength(8);
  expect(HOME_REVIEWERS).toEqual(READER_REVIEWS.slice(0, 8));
});
