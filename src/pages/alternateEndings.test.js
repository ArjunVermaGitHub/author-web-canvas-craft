import { expect, test } from 'bun:test';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AlternateEnding from './AlternateEnding';
import AlternateEndingsIndex from './AlternateEndingsIndex';
import { ALTERNATE_STORIES } from '../data/alternateEndings';

test('LPH pages render self-referencing canonicals at canonical trailing-slash destinations', () => {
  const paths = ['/lph',
    ...ALTERNATE_STORIES.flatMap(story => [
      `/lph/alternate-endings/${story.slug}`,
      ...story.endings.map(ending => `/lph/alternate-endings/${story.slug}/${ending.slug}`),
    ])];
  for (const path of paths) {
    for (const suffix of ['/']) {
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
        .toBe(`https://www.riturajverma.com${path}/`);
    }
  }
});