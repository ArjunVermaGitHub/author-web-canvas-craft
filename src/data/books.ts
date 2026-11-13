import { BOOK_TITLE } from '@/config/book';
export interface SeriesBook { title: string; cover: string; facts: readonly (readonly [string, string])[] }
export const BOOKS: SeriesBook[] = [{
  title: BOOK_TITLE, cover: '/raghav-ebook-cover.jpg',
  facts: [['Genre', 'Mythological fantasy, teens and young adults'], ['Series', 'Book 1'], ['Publisher', 'Qurate Books, August 2026'], ['ISBN', '9789358987447']],
}];
