import { expect, test } from 'bun:test';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import OtherBooksSection from './OtherBooksSection';
import { LPH_BOOK } from '../data/alternateEndings';
import { OTHER_BOOKS, OTHER_BOOKS_SERIES_URL } from '../data/otherBooks';

const render = (lphBook = LPH_BOOK) => renderToStaticMarkup(h(MemoryRouter, null, h(OtherBooksSection, { lphBook })));
const destinations = html => [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1]);

test('both catalogue cards use existing book data and exact purchase/reading destinations', () => {
  const html = render();
  expect(html).toContain(LPH_BOOK.title.replaceAll('&', '&amp;'));
  expect(html).toContain(`${LPH_BOOK.year} · ${LPH_BOOK.publisher}`);
  expect(html).toContain(`${OTHER_BOOKS.length} coloring books`);
  expect(destinations(html)).toEqual([
    LPH_BOOK.indiaUrl, LPH_BOOK.internationalUrl, '/lph/alternate-endings/',
    '/james-furrington', OTHER_BOOKS_SERIES_URL,
  ]);
  expect([...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]+)"/g)].map(match => [match[1], match[2]])).toEqual(
    OTHER_BOOKS.slice(0, 4).map(book => [book.cover.path, book.cover.alt.replaceAll('&', '&amp;')]),
  );
});

test('LPH defaults contain no invented Kindle destination or cover', () => {
  expect(LPH_BOOK.kindleUrl).toBeUndefined();
  expect(LPH_BOOK.cover).toBeUndefined();
  expect(destinations(render())).toHaveLength(5);
});

test('a supplied Kindle destination appears first and only when configured', () => {
  const kindleUrl = 'https://example.com/test-kindle';
  expect(destinations(render({ ...LPH_BOOK, kindleUrl }))).toEqual([
    kindleUrl, LPH_BOOK.indiaUrl, LPH_BOOK.internationalUrl, '/lph/alternate-endings/',
    '/james-furrington', OTHER_BOOKS_SERIES_URL,
  ]);
  expect(destinations(render())).not.toContain(kindleUrl);
});

test('a supplied LPH cover is included without changing the four catalogue covers', () => {
  const cover = { path: '/test-lph-cover.jpg', alt: 'Test LPH cover', width: 300, height: 400 };
  const sources = [...render({ ...LPH_BOOK, cover }).matchAll(/<img[^>]*src="([^"]+)"/g)].map(match => match[1]);
  expect(sources).toEqual([cover.path, ...OTHER_BOOKS.slice(0, 4).map(book => book.cover.path)]);
});