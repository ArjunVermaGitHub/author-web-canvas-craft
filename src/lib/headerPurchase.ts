import { OTHER_BOOK_SERIES } from '@/data/otherBooks';

// Raghav Kartikeya purchase buttons belong only on Raghav pages,
// never on pen-name pages listed in OTHER_BOOK_SERIES.
export function shouldShowPurchaseButtons(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (normalized === '/lph' || normalized.startsWith('/lph/')) return false;
  return !OTHER_BOOK_SERIES.some(series => series.path === normalized);
}
