import { expect, test } from 'bun:test';
import { CHARACTER_CARDS } from './characterCards';
import { readFileSync } from 'node:fs';
import vercel from '../../vercel.json';

test('six supplied characters stay in the requested order', () => {
  expect(CHARACTER_CARDS.map(c => c.id)).toEqual(['raghav', 'tarak', 'little-yama', 'parashuram', 'priya', 'dobhal']);
  expect(CHARACTER_CARDS.map(c => c.role)).toEqual(['The hero', 'The last savage of the mountain', 'The child god of death', 'The immortal warrior-sage', 'His best friend', 'National Security Adviser']);
});
test('all six characters use their supplied portraits rather than book-cover placeholders', () => {
  expect(CHARACTER_CARDS.map(c => c.image)).toEqual(CHARACTER_CARDS.map(c => `/characters/${c.id}.webp`));
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

test('Little Yama alternate portrait and Anna legacy media retain permanent local redirects', () => {
  expect(CHARACTER_CARDS.some(c => c.id === 'anna')).toBe(false);
  for (const url of ['/characters/little-yama-alt.webp', '/audio/characters/little-yama-voice-alt.mp3', '/characters/anna.webp', '/audio/characters/anna-voice.mp3', '/audio/characters/anna-bed.mp3']) {
    const pointer = JSON.parse(readFileSync(new URL(`../../public${url}.asset.json`, import.meta.url), 'utf8'));
    const route = vercel.routes.find(r => r.src === url);
    expect(route?.headers?.Location).toBe(`https://author-web-canvas-craft.lovable.app${pointer.url}`);
    expect(vercel.routes.indexOf(route)).toBeLessThan(vercel.routes.findIndex(r => r.handle === 'filesystem'));
  }
});