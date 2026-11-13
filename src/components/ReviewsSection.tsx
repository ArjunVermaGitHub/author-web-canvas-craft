import React from 'react';
import { READER_REVIEWS } from '@/data/readerReviews';
import PurchaseButtons from './PurchaseButtons';

// Real, verified reader reviews only. Never add invented reviews.
const SHOW_REVIEWS = true;

const REVIEWS = [
  {
    quotes: [
      'The writing is simple, visual and fast-paced.',
      'A truly unputdownable mythological mystery.',
    ],
    attribution: 'Bhavi Nagda, verified purchase on Amazon.in, 10 September 2026',
    url: 'https://www.amazon.in/portal/customer-reviews/srp/-/R3C1VGRZ8C4XPQ/ref=cm_cr_dp_d_rvw_ttl?_encoding=UTF8&ie=UTF8',
  },
  {
    quotes: [
      'One of the most powerful first chapter I have read this year in speculative fiction.',
      'The world of this story looks organic and lived in, and not dry or forced.',
    ],
    attribution: 'Rahul Vishnoi, Amazon.in, 24 October 2026',
    url: 'https://www.amazon.in/gp/customer-reviews/R2WK37XLPVN6AW',
  },
];

const ReviewsSection = () => {
  if (!SHOW_REVIEWS) return null;
  return (
    <section className="bg-background band-section">
      <div className="site-container">
        <h2 className="page-heading">What readers say</h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
          {REVIEWS.map((r) => (
            <article key={r.url} className="content-panel p-6">
              <p className="text-carnelian text-xl mb-3" aria-label="5 out of 5 stars" role="img">
                <span aria-hidden="true">★★★★★</span>
              </p>
              <blockquote className="font-serif text-xl text-lapis leading-snug space-y-2 mb-4">
                {r.quotes.map((q) => (
                  <p key={q}>“{q}”</p>
                ))}
              </blockquote>
              <p className="text-lapis/90 mb-3">{r.attribution}</p>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-carnelian font-semibold underline underline-offset-4 hover:text-lapis transition-colors min-h-[44px] inline-flex items-center"
              >
                Read the full review on Amazon
              </a>
            </article>
          ))}
        </div>

        <h3 className="font-serif text-2xl text-lapis mt-14 mb-6 content-panel p-6">
          More reader reviews
        </h3>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 divide-y divide-lapis/15 sm:divide-y-0">
          {READER_REVIEWS.map((r) => (
            <li key={r.insta} className="py-3 sm:border-b sm:border-lapis/15">
              <p className="font-semibold text-lapis break-words">{r.name}</p>
              <p className="flex flex-wrap gap-x-4">
                {[
                  { label: 'Instagram', href: r.insta },
                  { label: 'Amazon', href: r.amazon },
                  { label: 'Goodreads', href: r.goodreads },
                ]
                  .filter((l) => l.href)
                  .map((l) => (
                    <a
                      key={l.label}
                      href={l.href ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${r.name}'s review on ${l.label}`}
                      className="text-carnelian underline underline-offset-4 hover:text-lapis min-h-[44px] inline-flex items-center"
                    >
                      {l.label}
                    </a>
                  ))}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <PurchaseButtons placement="reviews" className="sm:w-fit">Order a signed copy</PurchaseButtons>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
