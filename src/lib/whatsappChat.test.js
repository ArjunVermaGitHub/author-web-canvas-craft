import { expect, test } from 'bun:test';
import { allowsWhatsAppChat, trackWhatsAppChat } from './whatsappChat';

test('chat is available on public pages, including ad and pen-name pages', () => {
  for (const path of ['/', '/shop', '/signed-copy', '/signed-copy-story', '/james-furrington', '/lph/alternate-endings', '/privacy']) {
    expect(allowsWhatsAppChat(path, false)).toBe(true);
  }
});
test('chat excludes private routes and every active payment', () => {
  for (const path of ['/owner', '/owner/insights', '/private/orders', '/admin', '/api/order']) {
    expect(allowsWhatsAppChat(path, false)).toBe(false);
  }
  for (const path of ['/', '/shop', '/signed-copy', '/signed-copy-story']) expect(allowsWhatsAppChat(path, true)).toBe(false);
});
test('each click sends one standard Contact and one dataLayer event with path only', () => {
  const calls = [];
  const target = { fbq: (...args) => calls.push(args), dataLayer: [] };
  trackWhatsAppChat('/shop', target);
  expect(calls).toEqual([['track', 'Contact', { page_path: '/shop' }]]);
  expect(target.dataLayer).toEqual([{ event: 'whatsapp_chat_click', page_path: '/shop' }]);
});
test('missing or failing pixel does not prevent dataLayer tracking', () => {
  const target = { fbq: () => { throw new Error('blocked'); } };
  trackWhatsAppChat('/', target);
  expect(target.dataLayer).toEqual([{ event: 'whatsapp_chat_click', page_path: '/' }]);
  const noPixel = {};
  trackWhatsAppChat('/books', noPixel);
  expect(noPixel.dataLayer).toEqual([{ event: 'whatsapp_chat_click', page_path: '/books' }]);
});