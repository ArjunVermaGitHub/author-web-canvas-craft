import { expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';

test('both mobile hero assets stay below the requested 150 KB budget', () => {
  for (const name of ['hero-cover-mobile', 'hero-background-mobile']) {
    const pointer = JSON.parse(readFileSync(new URL(`../../public/${name}.webp.asset.json`, import.meta.url), 'utf8'));
    expect(pointer.content_type).toBe('image/webp');
    expect(pointer.size).toBeLessThan(150000);
  }
});