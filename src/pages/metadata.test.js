import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { CANONICAL_BASE, NAV_PAGES } from '../config/site';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const canonical = (source) => source.match(/rel="canonical" href="([^"]+)"/)?.[1];
const jsonLdBlocks = (source) => [...source.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => m[1]);

test('homepage static and route canonical use the real live domain', () => {
  expect(canonical(read('../../index.html'))).toBe('https://www.riturajverma.com/');
  expect(`${CANONICAL_BASE}${NAV_PAGES[0].path}`).toBe('https://www.riturajverma.com/');
});

test('pen-name canonical and sharing URL self-reference the real live domain', () => {
  const source = read('./JamesFurrington.tsx');
  expect(canonical(source)).toBe('https://www.riturajverma.com/james-furrington');
  expect(source.match(/property="og:url" content="([^"]+)"/)?.[1]).toBe('https://www.riturajverma.com/james-furrington');
});

test('sitemap uses the real live domain for all public pages', () => {
  expect([...read('../../public/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])).toEqual([
    ...NAV_PAGES.map(page => `${CANONICAL_BASE}${page.path}`), 'https://www.riturajverma.com/privacy', 'https://www.riturajverma.com/james-furrington',
    'https://www.riturajverma.com/lph/',
    'https://www.riturajverma.com/lph/alternate-endings/',
    'https://www.riturajverma.com/lph/alternate-endings/a-high-like-heaven/',
    'https://www.riturajverma.com/lph/alternate-endings/a-high-like-heaven/1-2/',
    'https://www.riturajverma.com/lph/alternate-endings/a-high-like-heaven/2-2/',
    'https://www.riturajverma.com/lph/alternate-endings/a-high-like-heaven/3-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-emotional-cripple/',
    'https://www.riturajverma.com/lph/alternate-endings/the-emotional-cripple/1-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-emotional-cripple/2-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-emotional-cripple/3-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-intimacy-of-space/',
    'https://www.riturajverma.com/lph/alternate-endings/the-intimacy-of-space/1-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-intimacy-of-space/2-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-intimacy-of-space/3-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-practitioner-of-austerity/',
    'https://www.riturajverma.com/lph/alternate-endings/the-practitioner-of-austerity/1-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-practitioner-of-austerity/2-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-practitioner-of-austerity/3-2/',
    'https://www.riturajverma.com/lph/alternate-endings/victim-of-many-loves/',
    'https://www.riturajverma.com/lph/alternate-endings/victim-of-many-loves/1-2/',
    'https://www.riturajverma.com/lph/alternate-endings/victim-of-many-loves/2-2/',
    'https://www.riturajverma.com/lph/alternate-endings/victim-of-many-loves/3-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-soul-mate-theorist/',
    'https://www.riturajverma.com/lph/alternate-endings/the-soul-mate-theorist/1-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-soul-mate-theorist/2-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-soul-mate-theorist/3-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-soul-mate-theorist/4-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-facebook-stalker/',
    'https://www.riturajverma.com/lph/alternate-endings/the-facebook-stalker/1-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-facebook-stalker/2-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-facebook-stalker/3-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-night-of-the-affair/',
    'https://www.riturajverma.com/lph/alternate-endings/the-night-of-the-affair/1-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-night-of-the-affair/2-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-night-of-the-affair/3-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-pursuit-of-perfection/',
    'https://www.riturajverma.com/lph/alternate-endings/the-pursuit-of-perfection/1-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-pursuit-of-perfection/2-2/',
    'https://www.riturajverma.com/lph/alternate-endings/the-pursuit-of-perfection/3-2/',
  ]);
});

test('homepage carries one structured-data block with the author, series and book nodes', () => {
  const blocks = jsonLdBlocks(read('../../index.html'));
  expect(blocks).toHaveLength(1);
  const graph = JSON.parse(blocks[0]);
  expect(graph['@context']).toBe('https://schema.org');
  expect(graph['@graph'].map(node => node['@type'])).toEqual(['Person', 'BookSeries', 'Book']);
  const book = graph['@graph'][2];
  expect(book.offers.price).toBe('335');
  expect(book.offers.priceCurrency).toBe('INR');
  expect(book.offers.shippingDetails.shippingDestination.addressCountry).toBe('IN');
  expect(book.workExample.map(edition => edition.isbn)).toEqual(['9789358984019', '9789358987447', undefined]);
  expect(book.workExample.map(edition => edition.sameAs)).toEqual([
    'https://www.amazon.in/dp/9358984015', 'https://www.amazon.com/dp/9358987448', undefined,
  ]);
});