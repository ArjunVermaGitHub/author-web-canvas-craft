import { describe, expect, test } from 'bun:test';
import handler, { decodeEntities, parseNewsRss } from './news.js';

const item = (title, url, date = 'Sun, 08 Nov 2026 10:00:00 GMT', source = '') => `<item><title><![CDATA[${title}]]></title><link>${url}</link><pubDate>${date}</pubDate>${source ? `<source>${source}</source>` : ''}</item>`;

describe('news RSS', () => {
  test('decodes XML, HTML and numeric entities', () => {
    expect(decodeEntities('Indus &amp; Harappa &#39; &#x2014; &quot; &nbsp;')).toBe('Indus & Harappa \' — "  ');
  });
  test('splits outlet, prefers source, filters junk and insecure URLs, sorts and deduplicates headlines', () => {
    const xml = `<rss>${
      item('Harappan discoveries - Old outlet', 'https://example.com/old', 'Sat, 07 Nov 2026 10:00:00 GMT') +
      item('INDUS &amp; Dharma - Example', 'https://example.com/new?a=1&amp;b=2', undefined, 'Actual &amp; Source') +
      item('Harappan discoveries! - New outlet', 'https://example.com/newer') +
      item('Sports news - Indus Times', 'https://example.com/junk') +
      item('Lothal news - Outlet', 'http://example.com/insecure') +
      item('Kalibangan news - Outlet', 'https://example.com/bad-date', 'invalid')
    }</rss>`;
    const results = parseNewsRss(xml);
    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({ title: 'INDUS & Dharma', outlet: 'Actual & Source', year: 2026, date: '2026-11-08T10:00:00.000Z', url: 'https://example.com/new?a=1&b=2' });
    expect(results[1].title).toBe('Harappan discoveries!');
  });
  test('recognises all requested locations and caps results at 15', () => {
    const names = ['Indus', 'Harappa', 'Harappan', 'Mohenjo-daro', 'Dholavira', 'Rakhigarhi', 'Lothal', 'Kalibangan'];
    const xml = `<rss>${Array.from({ length: 20 }, (_, i) => item(`${names[i % names.length]} discovery ${i} - Outlet`, `https://example.com/${i}`)).join('')}</rss>`;
    expect(parseNewsRss(xml)).toHaveLength(15);
    expect(parseNewsRss(`<rss>${names.map((name) => item(`${name} discovery - Outlet`, `https://example.com/${name}`)).join('')}</rss>`)).toHaveLength(8);
  });
  test('empty feed stays empty', () => {
    expect(parseNewsRss('<rss><channel></channel></rss>')).toEqual([]);
  });
  test('upstream failure returns 502 without caching the error', async () => {
    const original = globalThis.fetch;
    const headers = {};
    const res = { setHeader(name, value) { headers[name] = value; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
    globalThis.fetch = async () => { throw new Error('Unavailable'); };
    try {
      await handler({ method: 'GET' }, res);
      expect(res.code).toBe(502);
      expect(res.body.error).toBeTruthy();
      expect(headers['Cache-Control']).toBe('no-store');
    } finally { globalThis.fetch = original; }
  });
});