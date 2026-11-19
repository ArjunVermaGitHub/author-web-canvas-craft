import { describe, expect, test } from 'bun:test';
import { ALTERNATE_STORIES, LPH_BOOK, endingPath, endingTitle, lphCanonical, storyPath } from './alternateEndings';

describe('LPH alternate endings', () => {
  test('pilot has the three legacy ending slugs and labels', () => {
    const pilot = ALTERNATE_STORIES.find(story => story.slug === 'a-high-like-heaven');
    expect(pilot?.endings.map(ending => [ending.slug, ending.label])).toEqual([
      ['1-2', 'Happy'], ['2-2', 'Sad'], ['3-2', 'Twist'],
    ]);
    expect(pilot?.endings.map(ending => ending.paragraphs.length)).toEqual([11, 8, 11]);
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
      ['1-2', 'Happy', 8], ['2-2', 'Sad', 7], ['3-2', 'Twist', 8],
    ]);
    expect(story?.endings.map(ending => endingTitle(story, ending))).toEqual([
      'The emotional cripple: Ending 1', 'The emotional cripple: Ending 2', 'The emotional cripple: Ending 3',
    ]);
  });
  test('third story has three legacy endings with the supplied paragraph breaks', () => {
    const story = ALTERNATE_STORIES.find(item => item.slug === 'the-intimacy-of-space');
    expect(story?.title).toBe('The intimacy of space');
    expect(story?.endings.map(ending => [ending.slug, ending.label, ending.paragraphs.length])).toEqual([
      ['1-2', 'Happy', 9], ['2-2', 'Sad', 8], ['3-2', 'Twist', 9],
    ]);
    expect(story?.endings.map(ending => endingTitle(story, ending))).toEqual([
      'The intimacy of space: Ending 1', 'The intimacy of space: Ending 2', 'The intimacy of space: Ending 3',
    ]);
  });
  test('fourth story has three legacy endings with the supplied paragraph breaks', () => {
    const story = ALTERNATE_STORIES.find(item => item.slug === 'the-practitioner-of-austerity');
    expect(story?.title).toBe('The practitioner of austerity');
    expect(story?.endings.map(ending => [ending.slug, ending.label, ending.paragraphs.length])).toEqual([
      ['1-2', 'Happy', 8], ['2-2', 'Sad', 7], ['3-2', 'Twist', 8],
    ]);
    expect(story?.endings.map(ending => endingTitle(story, ending))).toEqual([
      'The practitioner of austerity: Ending 1', 'The practitioner of austerity: Ending 2', 'The practitioner of austerity: Ending 3',
    ]);

  });
  test('fifth story preserves printed URLs and supplied paragraph breaks', () => {
    const story = ALTERNATE_STORIES.find(item => item.slug === 'victim-of-many-loves');
    expect(story?.title).toBe('The victim of many loves');
    expect(ALTERNATE_STORIES.some(item => item.slug === 'the-victim-of-many-loves')).toBe(false);
    expect(story?.endings.map(ending => [ending.slug, ending.label, ending.paragraphs.length])).toEqual([
      ['1-2', 'Happy', 8], ['2-2', 'Sad', 7], ['3-2', 'Twist', 10],
    ]);
    expect(story?.endings.map(ending => endingPath(story.slug, ending.slug))).toEqual([
      '/lph/alternate-endings/victim-of-many-loves/1-2/',
      '/lph/alternate-endings/victim-of-many-loves/2-2/',
      '/lph/alternate-endings/victim-of-many-loves/3-2/',
    ]);
    expect(story?.endings.map(ending => endingTitle(story, ending))).toEqual([
      'The victim of many loves: Ending 1', 'The victim of many loves: Ending 2', 'The victim of many loves: Ending 3',
    ]);
  });
  test('sixth story preserves printed slugs and appends the supplied Open ending', () => {
    const story = ALTERNATE_STORIES.find(item => item.slug === 'the-soul-mate-theorist');
    expect(story?.title).toBe('The soul mate theorist');
    expect(story?.endings.map(ending => [ending.slug, ending.label, ending.paragraphs.length])).toEqual([
      ['1-2', 'Happy', 10], ['2-2', 'Sad', 8], ['3-2', 'Twist', 10], ['4-2', 'Open', 8],
    ]);
    expect(story?.endings.map(ending => endingTitle(story, ending))).toEqual([
      'The soul mate theorist: Ending 1', 'The soul mate theorist: Ending 2',
      'The soul mate theorist: Ending 3', 'The soul mate theorist: Ending 4',
    ]);
    expect(ALTERNATE_STORIES.filter(item => item.slug !== 'the-soul-mate-theorist').map(item => item.endings.length)).toEqual([3, 3, 3, 3, 3, 3, 3, 3]);
  });
  test('seventh story preserves printed slugs and the supplied paragraph breaks', () => {
    const story = ALTERNATE_STORIES.find(item => item.slug === 'the-facebook-stalker');
    expect(story?.title).toBe('The Facebook stalker');
    expect(story?.endings.map(ending => [ending.slug, ending.label, ending.paragraphs.length])).toEqual([
      ['1-2', 'Happy', 7], ['2-2', 'Sad', 9], ['3-2', 'Twist', 10],
    ]);
  });
  test('Open ending preserves all eight supplied paragraphs verbatim', () => {
    const story = ALTERNATE_STORIES.find(item => item.slug === 'the-soul-mate-theorist');
    expect(story?.endings.find(ending => ending.slug === '4-2')?.paragraphs).toEqual([
      `"Disappointed," said Rajneesh, turning the word over. "That depends on what the dreams were."`,
      `"Tell me, then," said Paromita. "All of them. Right now. The flat, the job, the boy in a good school, the wedding, or no wedding. Tell me what you see."`,
      `He started to. He had a whole speech, built over forty hours, with sections and sub-sections. But somewhere around the second sentence, he noticed she was not listening to the words. She was watching his hands, the way a gambler watches the dealer's.`,
      `"You don't believe me," he said.`,
      `"I believe you believe it. That isn't the same thing." She stirred her tea. "I'll make you a deal. Ask me again on Diwali. If the dream is still the same on Diwali, I'll tell you mine."`,
      `"What if mine has changed by then?"`,
      `"Then you'll have learned something," she said. "And so will I."`,
      `Diwali was four months away. Rajneesh walked home through the hot afternoon trying to decide whether he had just been given a chance or a polite goodbye. By the time he reached his building, he had decided it was both, and that, perhaps, this was what it meant to begin something with another person: not knowing which, and turning up anyway.`,
    ]);
  });
  test('eighth story preserves printed slugs and blank-line paragraph breaks', () => {
    const story = ALTERNATE_STORIES.find(item => item.slug === 'the-night-of-the-affair');
    expect(story?.title).toBe('The night of the affair');
    expect(story?.endings.map(ending => [ending.slug, ending.label, ending.paragraphs.length])).toEqual([
      ['1-2', 'Happy', 11], ['2-2', 'Sad', 8], ['3-2', 'Twist', 10],
    ]);
  });
  test('ninth story preserves printed slugs and supplied paragraph breaks', () => {
    const story = ALTERNATE_STORIES.find(item => item.slug === 'the-pursuit-of-perfection');
    expect(story?.title).toBe('The pursuit of perfection');
    expect(story?.endings.map(ending => [ending.slug, ending.label, ending.paragraphs.length])).toEqual([
      ['1-2', 'Happy', 8], ['2-2', 'Sad', 10], ['3-2', 'Twist', 11],
    ]);
  });
  test('all nine stories have endings and none await ending data', () => {
    expect(ALTERNATE_STORIES).toHaveLength(9);
    expect(ALTERNATE_STORIES.filter(story => story.endings.length > 0)).toHaveLength(9);
    expect(ALTERNATE_STORIES.filter(story => story.endings.length === 0)).toHaveLength(0);
  });
  test('legacy ending canonicals use the real domain and a trailing slash', () => {
    for (const story of ALTERNATE_STORIES) {
      const storySlug = story.slug;
      for (const { slug } of story.endings) {
        expect(lphCanonical(endingPath(storySlug, slug))).toBe(`https://www.riturajverma.com/lph/alternate-endings/${storySlug}/${slug}/`);
      }
      expect(lphCanonical(storyPath(storySlug))).toBe(`https://www.riturajverma.com/lph/alternate-endings/${storySlug}/`);
    }
    expect(lphCanonical('/lph')).toBe('https://www.riturajverma.com/lph/');
    expect(lphCanonical('/lph/alternate-endings/')).toBe('https://www.riturajverma.com/lph/alternate-endings/');
  });
  test('LPH purchase links point to the supplied edition', () => {
    expect(LPH_BOOK.indiaUrl).toBe('https://www.amazon.in/dp/B007TPAI06');
    expect(LPH_BOOK.internationalUrl).toBe('https://www.amazon.com/dp/B007TPAI06');
  });
});