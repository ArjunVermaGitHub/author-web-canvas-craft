import React from 'react';

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
    <section className="bg-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="page-heading">What readers say</h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
          {REVIEWS.map((r) => (
            <article key={r.url} className="border-t-4 border-lapis pt-6">
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
      </div>
    </section>
  );
};

export default ReviewsSection;
