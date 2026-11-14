import { expect, test } from 'bun:test';
import { whatsappUrl } from './whatsapp';
const message = "Hi Rituraj, I'm a reader of Raghav Kartikeya and the Tablets of Dharma.";
test('touch uses wa.me with original number and message', () => {
  const url = new URL(whatsappUrl(true, '919324893014', message));
  expect(url.origin).toBe('https://wa.me'); expect(url.pathname).toBe('/919324893014'); expect(url.searchParams.get('text')).toBe(message);
});
test('fine pointer uses WhatsApp Web with same number and encoded message', () => {
  const url = new URL(whatsappUrl(false, '919324893014', message));
  expect(url.origin).toBe('https://web.whatsapp.com'); expect(url.pathname).toBe('/send');
  expect(url.searchParams.get('phone')).toBe('919324893014'); expect(url.searchParams.get('text')).toBe(message);
});