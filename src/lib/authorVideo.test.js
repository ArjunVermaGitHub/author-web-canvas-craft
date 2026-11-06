import { describe, expect, test } from 'bun:test';
import { getAuthorVideoEmbedUrl } from './authorVideo';

describe('author video visibility and privacy', () => {
  test('empty configuration hides the video', () => {
    expect(getAuthorVideoEmbedUrl('')).toBeNull();
    expect(getAuthorVideoEmbedUrl('   ')).toBeNull();
  });
  test('only valid YouTube URLs can produce an embed', () => {
    expect(getAuthorVideoEmbedUrl('https://example.com/watch?v=dQw4w9WgXcQ')).toBeNull();
    expect(getAuthorVideoEmbedUrl('https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ')).toBeNull();
    expect(getAuthorVideoEmbedUrl('https://www.youtube.com/watch?v=invalid')).toBeNull();
  });
  test('YouTube watch and share URLs use the no-cookie embed host', () => {
    const expected = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ';
    expect(getAuthorVideoEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(expected);
    expect(getAuthorVideoEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(expected);
  });
});