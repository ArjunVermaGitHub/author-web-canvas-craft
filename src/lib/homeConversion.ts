import { NAV_PAGES } from '@/config/site';
import { READER_REVIEWS } from '@/data/readerReviews';

export const DESKTOP_NAV_PATHS = ['/reviews', '/wiki', '/world', '/author'] as const;
export const DESKTOP_NAV_PAGES = DESKTOP_NAV_PATHS.flatMap(path => NAV_PAGES.filter(page => page.path === path));
export const MORE_NAV_PAGES = NAV_PAGES.filter(page => !DESKTOP_NAV_PATHS.some(path => path === page.path) && page.path !== '/shop');
export const HOME_REVIEWERS = READER_REVIEWS.filter(review => review.insta).slice(0, 8);

export function giftMessage(name: string): string {
  const recipient = name.trim().slice(0, 24);
  return recipient ? `To ${recipient}, every hero starts small. Read bravely!` : '';
}
export function messageFromPrefill(current: string, initial: string | undefined, edited: boolean): string {
  return edited || initial === undefined ? current : initial;
}
export function showHomeOrderBar(heroPassed: boolean, orderVisible: boolean): boolean {
  return heroPassed && !orderVisible;
}
