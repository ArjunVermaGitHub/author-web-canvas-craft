import { READER_REVIEWS } from '@/data/readerReviews';

export function selectSignedCopyReviews(reviews: typeof READER_REVIEWS = READER_REVIEWS) {
  return reviews.filter((review): review is typeof review & { amazon: string; goodreads: string } =>
    Boolean(review.amazon && review.goodreads)
  ).slice(0, 3);
}