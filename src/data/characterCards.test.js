import { expect, test } from 'bun:test';
import { CHARACTER_CARDS } from './characterCards';
import { readFileSync } from 'node:fs';
import vercel from '../../vercel.json';

test('six supplied characters stay in the requested order', () => {
  expect(CHARACTER_CARDS.map(c => c.id)).toEqual(['raghav', 'priya', 'anna', 'parashuram', 'tarak', 'dobhal']);
  expect(CHARACTER_CARDS.map(c => c.role)).toEqual(['The hero', 'His best friend', 'His mother', 'The immortal warrior-sage', 'The last savage of the mountain', 'National Security Adviser']);
});
test('only Parashuram and Tarak use the requested book-cover placeholder', () => {
  expect(CHARACTER_CARDS.filter(c => c.image === '/raghav-ebook-cover.jpg').map(c => c.id)).toEqual(['parashuram', 'tarak']);
});
test('every character has separate permanent mp3 clips, never expiring source links', () => {
  for (const c of CHARACTER_CARDS) {
    expect(c.voice).toBe(`/audio/characters/${c.id}-voice.mp3`);
    expect(c.bed).toBe(`/audio/characters/${c.id}-bed.mp3`);
    expect(c.voice).not.toBe(c.bed);
    for (const url of [c.voice, c.bed, ...(c.image.startsWith('/characters/') ? [c.image] : [])]) {
      const pointer = JSON.parse(readFileSync(new URL(`../../public${url}.asset.json`, import.meta.url), 'utf8'));
      const route = vercel.routes.find(r => r.src === url);
      expect(route?.headers?.Location).toBe(`https://author-web-canvas-craft.lovable.app${pointer.url}`);
      expect(vercel.routes.indexOf(route)).toBeLessThan(vercel.routes.findIndex(r => r.handle === 'filesystem'));
    }
  }
});