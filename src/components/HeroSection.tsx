import React from 'react';
import BookButton from './BookButton';
import { BOOK_PRICE, SHIPPING_PRICE, TOTAL_PRICE } from '@/config/book';

const facts = [
  ['Genre', 'Mythological fantasy, teens and young adults'],
  ['Series', 'Book 1'],
  ['Publisher', 'Qurate Books, August 2026'],
  ['ISBN', '9789358987447'],
];

const HeroSection = () => {
  return (
    <section id="top" className="scroll-mt-20 bg-stonepage">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-3/5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-lapis font-serif leading-tight mb-6">
              Raghav Kartikeya and the Tablets of Dharma
            </h1>
            <p className="text-lg md:text-xl text-lapis leading-relaxed mb-8 max-w-2xl">
              A nine-year-old from Mumbai finds he can read the Indus Valley
              script, a language no scholar has ever deciphered. It leads him
              to a hidden school in the Himalayas, and to an immortal warlord
              who wants humanity gone.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
              <BookButton href="#buy" className="sm:w-auto">
                Order a signed copy — ₹{TOTAL_PRICE}
              </BookButton>
              <a
                href="/Raghav-Kartikeya-Sample-Chapters.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-carnelian font-semibold underline underline-offset-4 hover:text-lapis transition-colors min-h-[44px] flex items-center"
              >
                Read the first two chapters free
              </a>
            </div>

            <p className="text-lapis/80 text-base max-w-xl leading-relaxed mb-10">
              ₹{BOOK_PRICE} for the book and ₹{SHIPPING_PRICE} for shipping
              within India. The author handwrites your message inside the
              cover. Pay by PhonePe QR.
            </p>

            <dl className="border-t-2 border-lapis max-w-xl">
              {facts.map(([term, detail]) => (
                <div
                  key={term}
                  className="flex gap-4 py-3 border-b border-lapis/20"
                >
                  <dt className="font-semibold text-lapis w-28 shrink-0">
                    {term}
                  </dt>
                  <dd className="text-lapis/90">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col items-center gap-5 lg:items-end">
            <img
              src="/raghav-ebook-cover.jpg"
              alt="Raghav Kartikeya and the Tablets of Dharma — book cover"
              className="w-full max-w-xs md:max-w-sm h-auto"
            />
            <PinterestSaveButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
