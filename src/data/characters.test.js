import { expect, test } from 'bun:test';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { CHARACTERS, CHARACTERS_INTRO } from './characters';
import Characters from '../pages/Characters';

const AUTHOR_TEXT = [
  ['Raghav', 'The hero', 'Raghav is nine, lives in Mumbai and gets bullied at school, where they call him Zero Confidence. He is sickly and often out of breath. He is also the only person alive who can read the Indus Valley script, which no scholar has ever deciphered. That gift leads him to Shambhala, a secret academy hidden in the Himalayas.', 'They call me Zero Confidence. Then I read a word nobody has read in seven thousand years.'],
  ['Tarak', 'The last savage of the mountain', 'Tarak is an immortal warlord who wants humanity gone. For seven thousand years he has hunted the Indus script, and the tablets of Dharma written in it. A sickly nine-year-old reads the script like a comic book, and that puts Raghav squarely in his way.', 'For seven thousand years I hunted that script. And a sickly child reads it like a comic book.'],
  ['Little Yama', 'The child god of death', "Little Yama is the child god of death, and Raghav's closest friend after Priya. He is also his strangest. Given the choice, he would much rather play hopscotch.", "Play hopscotch with me, and I'll tell you a secret. Tonight, you will see who you are."],
  ['Parashuram', 'The immortal warrior-sage', 'Parashuram is the warrior-sage with the axe, and one of the teachers at Shambhala.', 'I have waited longer than your cities have stood. On your feet, boy.'],
  ['Priya', 'His best friend', "Priya is Raghav's best friend and classmate in Mumbai, and the one person who notices what everyone else misses. Where others see a quiet, sickly boy, she sees a mystery worth solving.", "Pranav's not a monster. Just loud, lost and allergic to mystery. Raghav? He is the mystery."],
  ['Dobhal', 'National Security Adviser', "Dobhal is India's top security official. When a schoolboy reads a script that every cryptographer in the country has failed to crack, Raghav becomes a matter of national security, and Dobhal wants him found quietly.", "A nine-year-old just did what every cryptographer in the country couldn't. Find him. Quietly."],
  ['Maya', 'The illusionist', 'Maya is nine, and an illusionist. During Ganpati she can make the Ganesha idols dance. Her illusions are real enough for everyone to see, and no one watching realises they are illusions.', null],
  ['Anna', 'Head nurse and bereavement counsellor', 'Anna is the head nurse at Northwood Hospital. She is also its bereavement counsellor, the person families turn to when they lose someone.', null],
];

test('the eight author-approved characters appear in the author order', () =>
  expect(CHARACTERS.map(c => c.name)).toEqual(AUTHOR_TEXT.map(([name]) => name)));

test('every character carries the author-approved role, description and quote', () => {
  expect(CHARACTERS.length).toBe(8);
  for (const [index, [name, role, description, quote]] of AUTHOR_TEXT.entries()) {
    const character = CHARACTERS[index];
    expect([character.name, character.role, character.description]).toEqual([name, role, description]);
    expect(character.quote ?? null).toBe(quote);
  }
});

test('portraits use the existing hosted images with intrinsic sizes, and Maya has none', () => {
  expect(CHARACTERS.map(c => c.image ?? null)).toEqual([
    '/characters/raghav.webp', '/characters/tarak.webp', '/characters/little-yama.webp', '/characters/parashuram.webp',
    '/characters/priya.webp', '/characters/dobhal.webp', null, '/characters/anna.webp',
  ]);
  for (const character of CHARACTERS.filter(c => c.image)) {
    expect(character.imageWidth).toBeGreaterThan(0);
    expect(character.imageHeight).toBeGreaterThan(0);
  }
  expect(CHARACTERS.find(c => c.name === 'Maya').image).toBeUndefined();
});

test('the page renders the author intro, every card and quote into static HTML', () => {
  const html = renderToString(h(HelmetProvider, {}, h(MemoryRouter, { initialEntries: ['/characters'] }, h(Characters))))
    .replace(/<!--\s*-->/g, '').replace(/&#x27;/g, "'");
  expect(html).toContain(CHARACTERS_INTRO);
  for (const [, , description, quote] of AUTHOR_TEXT) {
    expect(html).toContain(`<p class="mt-4">${description}</p>`);
    if (quote) expect(html).toContain(`<p class="mt-4 italic text-secondary">“${quote}”</p>`);
  }
  for (const character of CHARACTERS.filter(c => c.image)) {
    expect(html).toContain(`width="${character.imageWidth}" height="${character.imageHeight}" loading="lazy"`);
  }
});
