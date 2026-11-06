import { describe, expect, test } from 'bun:test';
import { buildPinterestPinUrl } from './pinterest';

const URL_ = 'https://www.riturajverma.com/';
const MEDIA = 'https://www.riturajverma.com/raghav-ebook-cover.jpg';

describe('Pinterest save button link', () => {
  test('builds the pin-creation link with the site, cover and description', () => {
    const href = buildPinterestPinUrl({
      url: URL_,
      media: MEDIA,
      description: 'Read the first two chapters free',
    });
    expect(href).toBe(
      'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.riturajverma.com%2F&media=https%3A%2F%2Fwww.riturajverma.com%2Fraghav-ebook-cover.jpg&description=Read%20the%20first%20two%20chapters%20free',
    );
  });

  test('stays on pinterest.com and keeps every value as data', () => {
    const href = buildPinterestPinUrl({
      url: URL_,
      media: MEDIA,
      description: 'Tricky & chars = need escaping',
    });
    const parsed = new URL(href);
    expect(parsed.origin).toBe('https://www.pinterest.com');
    expect(parsed.pathname).toBe('/pin/create/button/');
    expect(parsed.searchParams.get('description')).toBe('Tricky & chars = need escaping');
    expect(parsed.searchParams.get('media')).toBe(MEDIA);
    expect(parsed.searchParams.get('url')).toBe(URL_);
  });

  test('returns no link when a part is missing or not a web address', () => {
    expect(buildPinterestPinUrl({ url: '', media: MEDIA, description: 'x' })).toBe('');
    expect(buildPinterestPinUrl({ url: URL_, media: '   ', description: 'x' })).toBe('');
    expect(buildPinterestPinUrl({ url: URL_, media: MEDIA, description: '' })).toBe('');
    expect(buildPinterestPinUrl({ url: 'javascript:alert(1)', media: MEDIA, description: 'x' })).toBe('');
    expect(buildPinterestPinUrl({ url: URL_, media: 'not-a-url', description: 'x' })).toBe('');
  });
});
