import { expect, test } from 'bun:test';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AlternateEnding from './AlternateEnding';
import AlternateEndingsIndex from './AlternateEndingsIndex';

test('LPH pages render self-referencing canonicals for every legacy route variant', () => {
  const paths = ['/lph', '/lph/alternate-endings',
    ...['a-high-like-heaven', 'the-emotional-cripple', 'the-intimacy-of-space', 'the-practitioner-of-austerity', 'victim-of-many-loves', 'the-soul-mate-theorist'].flatMap(storySlug => [
      `/lph/alternate-endings/${storySlug}`,
      ...['1-2', '2-2', '3-2'].map(slug => `/lph/alternate-endings/${storySlug}/${slug}`),
    ])];
  for (const path of paths) {
    for (const suffix of ['', '/']) {
      const context = {};
      renderToString(h(HelmetProvider, { context },
        h(MemoryRouter, { initialEntries: [`${path}${suffix}`] },
          h(Routes, null,
            h(Route, { path: '/lph', element: h(AlternateEndingsIndex) }),
            h(Route, { path: '/lph/alternate-endings', element: h(AlternateEndingsIndex) }),
            h(Route, { path: '/lph/alternate-endings/:storySlug', element: h(AlternateEndingsIndex) }),
            h(Route, { path: '/lph/alternate-endings/:storySlug/:endingSlug', element: h(AlternateEnding) }),
          ),
        ),
      ));
      expect(context.helmet?.link.toComponent().find(link => link.props.rel === 'canonical')?.props.href)
        .toBe(`https://riturajverma.com${path}/`);
    }
  }
});