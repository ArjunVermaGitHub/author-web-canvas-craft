import { expect, test } from 'bun:test';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { NAV_PAGES } from '../config/site';
import PageLayout from '../components/PageLayout';
const paths = ['/', '/books', '/wiki', '/characters', '/reviews', '/world', '/author', '/media', '/shop'];
test('all nine approved pages appear in navigation order', () => expect(NAV_PAGES.map(p=>p.path)).toEqual(paths));
for (const page of NAV_PAGES) test(`${page.path} resolves its own www canonical and title`, () => {
  const context = {};
  renderToString(h(HelmetProvider,{context},h(MemoryRouter,{initialEntries:[page.path]},h(PageLayout,{page,home:page.path==='/'},null))));
  expect(context.helmet.link.toComponent().filter(l=>l.props.rel==='canonical').map(l=>l.props.href)).toEqual([`https://www.riturajverma.com${page.path}`]);
  expect(context.helmet.title.toComponent()[0].props.children).toBe(`${page.label} — Raghav Kartikeya: Fantasy with Roots`);
});
