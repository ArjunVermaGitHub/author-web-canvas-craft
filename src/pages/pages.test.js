import { expect, test } from 'bun:test';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { HOME_TEASER_PAGES, NAV_PAGES } from '../config/site';
import PageLayout from '../components/PageLayout';
import NotFound from './NotFound';
import OwnerInsights from './OwnerInsights';
const paths = ['/', '/start-here', '/books', '/wiki', '/characters', '/reviews', '/world', '/author', '/media', '/other-books', '/shop'];
test('Other Books appears between Media Room and Shop in navigation', () => expect(NAV_PAGES.map(p=>p.path)).toEqual(paths));
test('home retains exactly eight series teasers without Other Books', () => {
  expect(HOME_TEASER_PAGES.map(p => p.path)).toEqual(['/books', '/wiki', '/characters', '/reviews', '/world', '/author', '/media', '/shop']);
});
for (const page of NAV_PAGES) test(`${page.path} resolves its own www canonical and title`, () => {
  const context = {};
  renderToString(h(HelmetProvider,{context},h(MemoryRouter,{initialEntries:[page.path]},h(PageLayout,{page,home:page.path==='/'},null))));
  expect(context.helmet.link.toComponent().filter(l=>l.props.rel==='canonical').map(l=>l.props.href)).toEqual([`https://www.riturajverma.com${page.path}`]);
  expect(context.helmet.title.toComponent()[0].props.children).toBe(page.seoTitle ?? `${page.label} — Raghav Kartikeya: Fantasy with Roots`);
  const meta = context.helmet.meta.toComponent();
  const description = page.seoDescription ?? page.description;
  expect(meta.find(tag => tag.props.name === 'description').props.content).toBe(description);
  expect(meta.find(tag => tag.props.property === 'og:title').props.content).toBe(page.seoTitle ?? `${page.label} — Raghav Kartikeya: Fantasy with Roots`);
  expect(meta.find(tag => tag.props.property === 'og:description').props.content).toBe(description);
});

for (const [path, Component] of [['/not-a-page', NotFound], ['/owner/insights', OwnerInsights]]) {
  test(`${path} is excluded from indexing`, () => {
    const context = {};
    renderToString(h(HelmetProvider, {context}, h(MemoryRouter, {initialEntries: [path]}, h(Component))));
    expect(context.helmet.meta.toComponent().filter(tag => tag.props.name === 'robots').map(tag => tag.props.content)).toEqual(['noindex']);
    if (Component === NotFound) expect(context.helmet.title.toComponent()[0].props.children).toBe('Page not found — Raghav Kartikeya');
  });
}
