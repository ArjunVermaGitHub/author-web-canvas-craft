import { expect, test } from 'bun:test';
import { normalizeLphSlug, resolveStory, resolveEnding, resolveLphPath } from './lphSlug';

const base = '/lph/alternate-endings/';
const story = 'a-high-like-heaven';
const canonical = `${base}${story}/1-2/`;
for (const [label, path] of [
  ['exact URL', canonical],
  ['uppercase', canonical.toUpperCase()],
  ['trailing dot', `${base}${story}/1-2./`],
  ['trailing parenthesis', `${base}${story})/1-2)/`],
  ['encoded trailing space', `${base}${story}%20/1-2%20/`],
  ['soft hyphen', `${base}a-high-like-hea\u00adven/1-2/`],
  ['en dash', `${base}a–high–like–heaven/1–2/`],
  ['hyphenation break', `${base}a-high-like-hea-ven/1-2/`],
  ['missing trailing slash', canonical.slice(0, -1)],
  ['index.html', `${canonical}index.html`],
  ['trailing junk', `${canonical}copied-junk/`],
  ['whitespace inside', `${base}a-high-like-hea%20ven/1-2/`],
  ['line break hyphenation', `${base}a-high-like-hea-%0Aven/1-2/`],
]) test(label, () => expect(resolveLphPath(path)).toBe(canonical));

test('unknown ending falls back to story index', () => expect(resolveLphPath(`${base}${story}/4-2/`)).toBe(`${base}${story}/`));
test('unknown story falls back to alternate-endings index', () => expect(resolveLphPath(`${base}unknown/1-2/`)).toBe(base));
test('catch-all recovers unknown LPH segments', () => expect(resolveLphPath('/lph/junk/index.html')).toBe(base));
test('story index drops index.html and extra segments', () => expect(resolveLphPath(`${base}${story}/index.html/junk`)).toBe(`${base}${story}/`));
test('malformed percent encoding does not throw', () => expect(normalizeLphSlug('unknown%zz')).toBe('unknown%zz'));
test('NFKC, invisible characters, punctuation and repeated dashes normalize', () => {
  expect(normalizeLphSlug('Ａ\u200b\u200c\u200d\ufeff\u00a0--high—like‐heaven.,;:)]"\'”’')).toBe(story);
});
for (const alias of ['1', 'ending-1', '1-2', 'ENDING–1', '12']) test(`ending alias ${alias}`, () => {
  const resolved = resolveStory(story);
  expect(resolved).toBeDefined();
  expect(resolveEnding(resolved, alias)?.slug).toBe('1-2');
});
test('ambiguous ending number is not guessed', () => {
  const fixture = { slug: 'test', title: 'Test', endings: [{slug:'1-2', paragraphs:[]}, {slug:'12', paragraphs:[]}] };
  expect(resolveEnding(fixture, '1--2')?.slug).toBe('1-2');
  expect(resolveEnding(fixture, '1-2-')?.slug).toBeUndefined();
});