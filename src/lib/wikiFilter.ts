import type { WikiTerm } from '@/data/wikiTerms';
export function normalizeWiki(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en').trim();
}
export function filterWiki(terms: readonly WikiTerm[], query: string): WikiTerm[] {
  const needle = normalizeWiki(query);
  return terms.filter(item => normalizeWiki(`${item.term} ${item.blurb}`).includes(needle));
}
export function groupWiki(terms: readonly WikiTerm[]): { letter: string; terms: WikiTerm[] }[] {
  const groups = new Map<string, WikiTerm[]>();
  for (const item of [...terms].sort((a, b) => a.term.localeCompare(b.term, 'en'))) {
    const first = normalizeWiki(item.term).charAt(0).toUpperCase();
    const letter = /^[A-Z]$/.test(first) ? first : '#';
    groups.set(letter, [...(groups.get(letter) ?? []), item]);
  }
  return [...groups].map(([letter, items]) => ({ letter, terms: items }));
}
