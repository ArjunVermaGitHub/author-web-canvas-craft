import { ALTERNATE_STORIES, endingPath, storyPath, type AlternateStory } from '../data/alternateEndings';

export const LPH_INDEX_PATH = '/lph/alternate-endings/';

export function normalizeLphSlug(raw: string): string {
  let decoded = raw;
  try { decoded = decodeURIComponent(raw); } catch { /* Keep malformed escapes harmless. */ }
  return decoded.normalize('NFKC').toLowerCase()
    .replace(/[\u00ad\u200b-\u200d\ufeff\s]/gu, '')
    .replace(/[\p{Dash_Punctuation}\u2212]/gu, '-')
    .replace(/[.,;:)\]"'”’]+$/gu, '')
    .replace(/(?:\/?index\.html)+$/u, '')
    .replace(/[.,;:)\]"'”’]+$/gu, '')
    .replace(/-+/g, '-');
}

function uniqueMatch<T>(items: T[], matches: (item: T) => boolean): T | undefined {
  const found = items.filter(matches);
  return found.length === 1 ? found[0] : undefined;
}

export function resolveStory(raw: string): AlternateStory | undefined {
  const slug = normalizeLphSlug(raw);
  const available = ALTERNATE_STORIES.filter(story => story.endings.length > 0);
  return uniqueMatch(available, story => normalizeLphSlug(story.slug) === slug)
    ?? uniqueMatch(available, story => normalizeLphSlug(story.slug).replace(/-/g, '') === slug.replace(/-/g, ''));
}

export function resolveEnding(story: AlternateStory, raw: string) {
  const slug = normalizeLphSlug(raw);
  const matched = uniqueMatch(story.endings, ending => normalizeLphSlug(ending.slug) === slug)
    ?? uniqueMatch(story.endings, ending => normalizeLphSlug(ending.slug).replace(/-/g, '') === slug.replace(/-/g, ''));
  if (matched) return matched;
  const number = /^(?:ending-?)?(\d+)$/.exec(slug)?.[1];
  if (!number) return undefined;
  return uniqueMatch(story.endings, (_ending, index?: number) => false)
    ?? story.endings.find((_ending, index) => index + 1 === Number(number));
}

/** Resolve the entire copied path, ignoring junk after the story/ending. */
export function resolveLphPath(pathname: string): string {
  const segments = pathname.split('/').map(normalizeLphSlug).filter(Boolean);
  if (segments.length === 1 && segments[0] === 'lph') return '/lph/';
  if (segments[0] !== 'lph' || segments[1] !== 'alternate-endings') return LPH_INDEX_PATH;
  const story = resolveStory(segments[2] ?? '');
  if (!story) return LPH_INDEX_PATH;
  const ending = resolveEnding(story, segments[3] ?? '');
  return ending ? endingPath(story.slug, ending.slug) : storyPath(story.slug);
}