import { READER_REVIEWS } from '@/data/readerReviews';
import { HOME_REVIEWERS } from '@/lib/homeConversion';
export default function HomeReaderProof() {
  return <section id="reviews" className="band-section scroll-mt-44 border-y border-accent/35"><div className="site-container">
    <h2 className="page-heading">{READER_REVIEWS.length} readers have reviewed it</h2>
    <p className="text-secondary text-lg max-w-3xl mb-7">Bookstagrammers and parents across India posted video reviews on Instagram and wrote them up on Amazon and Goodreads. Tap a name to watch.</p>
    <div className="home-review-row">{HOME_REVIEWERS.map(review => <a key={review.name} href={review.insta} target="_blank" rel="noopener noreferrer" className="content-panel p-5 flex flex-col items-start gap-3 min-w-0">
      <span className="w-11 h-11 flex items-center justify-center rounded-full bg-accent/15 text-accent text-xl font-serif" aria-hidden="true">{review.name.replace(/^@/, '').charAt(0).toUpperCase()}</span>
      <span className="text-sm text-primary">▶ Reel review</span><span className="text-accent font-semibold break-words">{review.name}</span>
    </a>)}</div>
    <a href="/reviews" className="inline-flex min-h-11 items-center mt-5 text-accent underline underline-offset-4">See all reviews →</a>
  </div></section>;
}
