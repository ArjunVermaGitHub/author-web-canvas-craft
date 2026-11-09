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
  test('second story has three legacy endings with the supplied paragraph breaks', () => {
    const story = ALTERNATE_STORIES.find(item => item.slug === 'the-emotional-cripple');
    expect(story?.title).toBe('The emotional cripple');
    expect(story?.endings.map(ending => [ending.slug, ending.label, ending.paragraphs.length])).toEqual([
      ['1-2', 'Happy', 6], ['2-2', 'Sad', 5], ['3-2', 'Twist', 7],
    ]);
    expect(story?.endings.map(ending => endingTitle(story, ending))).toEqual([
      'The emotional cripple: Ending 1', 'The emotional cripple: Ending 2', 'The emotional cripple: Ending 3',
    ]);
    expect(ALTERNATE_STORIES.filter(item => item.endings.length > 0)).toHaveLength(2);
  });
  test('seven remaining stories await ending data', () => {
    expect(ALTERNATE_STORIES.filter(story => story.endings.length === 0).map(story => story.title)).toEqual([
      'The intimacy of space', 'The practitioner of austerity',
      'The victim of many loves', 'The soul mate theorist', 'The Facebook stalker',
      'The night of the affair', 'The pursuit of perfection',
    ]);
  });
  test('legacy ending canonicals use the real domain and a trailing slash', () => {
    for (const storySlug of ['a-high-like-heaven', 'the-emotional-cripple']) {
      for (const slug of ['1-2', '2-2', '3-2']) {
        expect(lphCanonical(endingPath(storySlug, slug))).toBe(`https://riturajverma.com/lph/alternate-endings/${storySlug}/${slug}/`);
      }
      expect(lphCanonical(storyPath(storySlug))).toBe(`https://riturajverma.com/lph/alternate-endings/${storySlug}/`);
    }
    expect(lphCanonical('/lph')).toBe('https://riturajverma.com/lph/');
    expect(lphCanonical('/lph/alternate-endings/')).toBe('https://riturajverma.com/lph/alternate-endings/');
  });
  test('LPH purchase links point to the supplied edition', () => {
    expect(LPH_BOOK.indiaUrl).toBe('https://www.amazon.in/dp/B007TPAI06');
    expect(LPH_BOOK.internationalUrl).toBe('https://www.amazon.com/dp/B007TPAI06');
  });
});