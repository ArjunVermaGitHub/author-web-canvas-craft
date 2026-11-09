import { describe, expect, test } from 'bun:test';
import { ALTERNATE_STORIES, LPH_BOOK, endingPath, endingTitle, lphCanonical, storyPath } from './alternateEndings';

describe('LPH alternate endings', () => {
  test('pilot has the three legacy ending slugs and labels', () => {
    const pilot = ALTERNATE_STORIES.find(story => story.slug === 'a-high-like-heaven');
    expect(pilot?.endings.map(ending => [ending.slug, ending.label])).toEqual([
      ['1-2', 'Happy'], ['2-2', 'Sad'], ['3-2', 'Twist'],
    ]);
    expect(pilot?.endings.map(ending => ending.paragraphs.length)).toEqual([5, 5, 7]);
  });
  test('reader-facing titles carry no emotion labels', () => {
    const pilot = ALTERNATE_STORIES.find(story => story.slug === 'a-high-like-heaven');
    expect(pilot?.endings.map(ending => endingTitle(pilot, ending))).toEqual([
      'A high, like heaven: Ending 1', 'A high, like heaven: Ending 2', 'A high, like heaven: Ending 3',
    ]);
  });
  test('eight remaining stories await ending data', () => {
    expect(ALTERNATE_STORIES.filter(story => story.endings.length === 0).map(story => story.title)).toEqual([
      'The emotional cripple', 'The intimacy of space', 'The practitioner of austerity',
      'The victim of many loves', 'The soul mate theorist', 'The Facebook stalker',
      'The night of the affair', 'The pursuit of perfection',
    ]);
  });
  test('legacy ending canonicals use the real domain and a trailing slash', () => {
    for (const slug of ['1-2', '2-2', '3-2']) {
      expect(lphCanonical(endingPath('a-high-like-heaven', slug))).toBe(`https://riturajverma.com/lph/alternate-endings/a-high-like-heaven/${slug}/`);
    }
    expect(lphCanonical(storyPath('a-high-like-heaven'))).toBe('https://riturajverma.com/lph/alternate-endings/a-high-like-heaven/');
    expect(lphCanonical('/lph')).toBe('https://riturajverma.com/lph/');
    expect(lphCanonical('/lph/alternate-endings/')).toBe('https://riturajverma.com/lph/alternate-endings/');
  });
  test('LPH purchase links point to the supplied edition', () => {
    expect(LPH_BOOK.indiaUrl).toBe('https://www.amazon.in/dp/B007TPAI06');
    expect(LPH_BOOK.internationalUrl).toBe('https://www.amazon.com/dp/B007TPAI06');
  });
});