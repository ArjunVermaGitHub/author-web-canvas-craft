import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BookButton from '@/components/BookButton';
import SignedCopyOrderFlow from '@/components/SignedCopyOrderFlow';
import VisitorCounter from '@/components/VisitorCounter';
import { BOOK_TITLE, TOTAL_PRICE } from '@/config/book';
import { READER_REVIEWS } from '@/data/readerReviews';
import { getBrowserAmazonStore, trackPurchaseClick } from '@/lib/purchase';
import { selectSignedCopyReviews } from '@/lib/signedCopyReviews';

const reviews = selectSignedCopyReviews();
const reviewLinkClass = 'inline-flex min-h-[44px] items-center text-sm text-carnelian underline underline-offset-4 hover:text-lapis';

const SignedCopy = () => {
  const [amazon] = useState(getBrowserAmazonStore);

  return (
    <div className="public-site">
      <Helmet>
        <title>Order a signed copy — Raghav Kartikeya and the Tablets of Dharma</title>
        <meta name="description" content={`Order ${BOOK_TITLE}, signed by Rituraj Verma with your own message handwritten inside, for ₹${TOTAL_PRICE}.`} />
        <link rel="canonical" href="https://www.riturajverma.com/signed-copy" />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content={`Order a signed copy — ${BOOK_TITLE}`} />
        <meta property="og:description" content={`A signed copy with your own message handwritten inside — ₹${TOTAL_PRICE}.`} />
        <meta property="og:url" content="https://www.riturajverma.com/signed-copy" />
      </Helmet>
      <header className="site-header">
        <div className="site-container">
          <Link to="/" className="inline-flex min-h-[44px] items-center font-serif text-xl">Rituraj Verma</Link>
        </div>
      </header>
      <main>
        <section className="site-container pb-5 pt-5 md:pt-8">
          <div className="flex items-center gap-4 md:gap-6">
            <img src="/raghav-ebook-cover.jpg" alt={`${BOOK_TITLE} book cover`} className="h-auto w-20 shrink-0 md:w-32" fetchPriority="high" />
            <h1 className="min-w-0 text-2xl leading-tight md:text-4xl">{BOOK_TITLE}</h1>
          </div>
          <p className="mt-4 leading-relaxed">A nine-year-old from Mumbai finds he can read the Indus Valley script, a language no scholar has ever deciphered. It leads him to a hidden school in the Himalayas, and to an immortal warlord who wants humanity gone.</p>
          <p className="mt-4 font-semibold">Signed by the author, with your own message handwritten inside — <span className="whitespace-nowrap">₹{TOTAL_PRICE}</span></p>
          <BookButton href="#signed-copy-order" className="mt-3 w-full sm:w-auto">Order your signed copy</BookButton>
        </section>
        <section className="site-container border-t border-border py-4">
          <h2 className="text-xl md:text-2xl">Read what reviewers said</h2>
          <ul className="mt-2 grid gap-x-6 sm:grid-cols-3">
            {reviews.map(review => (
              <li key={review.insta} className="flex flex-wrap items-center justify-between gap-x-3 sm:block">
                <p className="min-w-0 break-words text-sm font-semibold">{review.name}</p>
                <div className="flex gap-3">
                  <a href={review.amazon} target="_blank" rel="noopener noreferrer" className={reviewLinkClass}>Amazon review</a>
                  <a href={review.insta} target="_blank" rel="noopener noreferrer" className={reviewLinkClass}>Instagram</a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-1 text-sm text-lapis/80">{READER_REVIEWS.length} reader reviews so far</p>
        </section>
        <section id="signed-copy-order" className="scroll-mt-4 bg-background py-6 text-stonepage md:py-8">
          <div className="site-container">
            <h2 className="mb-5 text-3xl text-ember">Order a signed copy</h2>
            <SignedCopyOrderFlow placement="landing" paymentPlacement="landing_payment" />
          </div>
        </section>
        <div className="site-container py-4">
          <a href={amazon.url} target="_blank" rel="noopener noreferrer" onClick={() => trackPurchaseClick('AmazonClick', 'landing', amazon.store)} className="inline-flex min-h-[44px] items-center underline underline-offset-4">Prefer Amazon? Order there instead</a>
          <p className="text-sm text-lapis/70">As an Amazon Associate I earn from qualifying purchases.</p>
        </div>
      </main>
      <footer className="border-t border-border py-3">
        <div className="site-container">
          <Link to="/privacy" className="inline-flex min-h-[44px] items-center underline underline-offset-4">Privacy policy</Link>
        </div>
        <VisitorCounter showCounts={false} />
      </footer>
    </div>
  );
};

export default SignedCopy;