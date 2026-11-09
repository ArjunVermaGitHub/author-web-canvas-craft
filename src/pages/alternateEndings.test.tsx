import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AlternateEnding from './AlternateEnding';
import AlternateEndingsIndex from './AlternateEndingsIndex';

test('LPH pages render self-referencing canonicals for every legacy route variant', () => {
  const paths = ['/lph', '/lph/alternate-endings', '/lph/alternate-endings/a-high-like-heaven',
    ...['1-2', '2-2', '3-2'].map(slug => `/lph/alternate-endings/a-high-like-heaven/${slug}`)];
  for (const path of paths) {
    for (const suffix of ['', '/']) {
      const context = {} as { helmet?: { link: { toComponent(): Array<{ props: { rel?: string; href?: string } }> } } };
      renderToString(
        <HelmetProvider context={context}>
          <MemoryRouter initialEntries={[`${path}${suffix}`]}>
            <Routes>
              <Route path="/lph" element={<AlternateEndingsIndex />} />
              <Route path="/lph/alternate-endings" element={<AlternateEndingsIndex />} />
              <Route path="/lph/alternate-endings/:storySlug" element={<AlternateEndingsIndex />} />
              <Route path="/lph/alternate-endings/:storySlug/:endingSlug" element={<AlternateEnding />} />
            </Routes>
          </MemoryRouter>
        </HelmetProvider>,
      );
      expect(context.helmet?.link.toComponent().find(link => link.props.rel === 'canonical')?.props.href)
        .toBe(`https://riturajverma.com${path}/`);
    }
  }
});