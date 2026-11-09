import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const canonical = (source) => source.match(/rel="canonical" href="([^"]+)"/)?.[1];

test('homepage static and route canonical use the real live domain', () => {
  expect(canonical(read('../../index.html'))).toBe('https://riturajverma.com/');
  expect(canonical(read('./Index.tsx'))).toBe('https://riturajverma.com/');
});

test('pen-name canonical and sharing URL self-reference the real live domain', () => {
  const source = read('./JamesFurrington.tsx');
  expect(canonical(source)).toBe('https://riturajverma.com/james-furrington');
  expect(source.match(/property="og:url" content="([^"]+)"/)?.[1]).toBe('https://riturajverma.com/james-furrington');
});

test('sitemap uses the real live domain for all public pages', () => {
  expect([...read('../../public/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])).toEqual([
    'https://riturajverma.com/', 'https://riturajverma.com/james-furrington',
    'https://riturajverma.com/lph/',
    'https://riturajverma.com/lph/alternate-endings/',
    'https://riturajverma.com/lph/alternate-endings/a-high-like-heaven/',
    'https://riturajverma.com/lph/alternate-endings/a-high-like-heaven/1-2/',
    'https://riturajverma.com/lph/alternate-endings/a-high-like-heaven/2-2/',
    'https://riturajverma.com/lph/alternate-endings/a-high-like-heaven/3-2/',
    'https://riturajverma.com/lph/alternate-endings/the-emotional-cripple/',
    'https://riturajverma.com/lph/alternate-endings/the-emotional-cripple/1-2/',
    'https://riturajverma.com/lph/alternate-endings/the-emotional-cripple/2-2/',
    'https://riturajverma.com/lph/alternate-endings/the-emotional-cripple/3-2/',
    'https://riturajverma.com/lph/alternate-endings/the-intimacy-of-space/',
    'https://riturajverma.com/lph/alternate-endings/the-intimacy-of-space/1-2/',
    'https://riturajverma.com/lph/alternate-endings/the-intimacy-of-space/2-2/',
    'https://riturajverma.com/lph/alternate-endings/the-intimacy-of-space/3-2/',
  ]);
});