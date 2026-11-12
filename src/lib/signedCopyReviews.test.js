import { expect, test } from 'bun:test';
import { selectSignedCopyReviews } from './signedCopyReviews';
import { READER_REVIEWS } from '../data/readerReviews';

test('ad page selects exactly the first three reviewers with Amazon and Goodreads links', () => {
  expect(selectSignedCopyReviews()).toEqual(READER_REVIEWS.slice(0, 3));
  expect(selectSignedCopyReviews().map(review => review.name)).toEqual([
    'sakshi Bookishworld26', 'Surbhi Jain', 'Varsha Dubey',
  ]);
});

test('selection skips missing links while preserving source order and URLs', () => {
  const entries = [
    { ...READER_REVIEWS[0], amazon: null },
    READER_REVIEWS[1],
    { ...READER_REVIEWS[2], goodreads: null },
    READER_REVIEWS[3], READER_REVIEWS[4], READER_REVIEWS[5],
  ];
  expect(selectSignedCopyReviews(entries)).toEqual([READER_REVIEWS[1], READER_REVIEWS[3], READER_REVIEWS[4]]);
});