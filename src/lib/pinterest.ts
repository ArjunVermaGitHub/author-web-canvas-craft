// Builds the Pinterest "create pin" link used by the Save on Pinterest button.
// Returns '' when any part is missing or not an absolute http(s) URL, so the
// button can hide itself instead of linking to a broken pin.

export interface PinterestPin {
  url: string;
  media: string;
  description: string;
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function buildPinterestPinUrl({ url, media, description }: PinterestPin): string {
  if (!url.trim() || !media.trim() || !description.trim()) return '';
  if (!isHttpUrl(url) || !isHttpUrl(media)) return '';

  const params = [
    `url=${encodeURIComponent(url)}`,
    `media=${encodeURIComponent(media)}`,
    `description=${encodeURIComponent(description)}`,
  ].join('&');

  return `https://www.pinterest.com/pin/create/button/?${params}`;
}
