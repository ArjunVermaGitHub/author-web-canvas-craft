import { expect, test } from 'bun:test';
import { INTERNET_ABBREVIATIONS } from './internetAbbreviations';

const REQUIRED = {
  ftfy: 'Fixed that for you',
  brb: 'Be right back',
  gtg: 'Got to go',
  loml: 'Love of my life',
};

test('includes the required slang abbreviations with expected meanings', () => {
  for (const [abbr, meaning] of Object.entries(REQUIRED)) {
    const entry = INTERNET_ABBREVIATIONS.find((item) => item.abbr === abbr);
    expect(entry).toBeDefined();
    expect(entry.meaning).toBe(meaning);
  }
});

test('abbreviation list is large and unique by abbr', () => {
  expect(INTERNET_ABBREVIATIONS.length).toBeGreaterThanOrEqual(200);
  const keys = INTERNET_ABBREVIATIONS.map((item) => item.abbr.toLowerCase());
  expect(new Set(keys).size).toBe(keys.length);
});

test('every entry has a non-empty abbr and meaning', () => {
  for (const entry of INTERNET_ABBREVIATIONS) {
    expect(entry.abbr.trim().length).toBeGreaterThan(0);
    expect(entry.meaning.trim().length).toBeGreaterThan(0);
  }
});
