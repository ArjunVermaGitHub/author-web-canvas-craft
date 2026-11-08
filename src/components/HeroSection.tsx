import React from 'react';
import PurchaseButtons from './PurchaseButtons';
import PinterestSaveButton from './PinterestSaveButton';
import { BOOK_PRICE, SHIPPING_PRICE, TOTAL_PRICE, SAMPLE_CHAPTERS_URL } from '@/config/book';
import { AMAZON_EBOOK_URL } from '@/config/amazon';
import { trackPurchaseClick } from '@/lib/purchase';

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

            <div className="flex flex-col gap-4 mb-6">
              <PurchaseButtons placement="hero" className="sm:flex-wrap sm:self-start" signedClassName="sm:w-auto">
                Order a signed copy — ₹{TOTAL_PRICE}
              </PurchaseButtons>
              <a
                href={AMAZON_EBOOK_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => trackPurchaseClick('EbookClick', 'hero')}
                className="text-lapis font-semibold underline underline-offset-4 hover:text-carnelian transition-colors min-h-[44px] flex items-center"
              >
                Buy the ebook
              </a>
              <p className="text-lapis/60 text-base">
                As an Amazon Associate I earn from qualifying purchases.
              </p>
              <a
                href={SAMPLE_CHAPTERS_URL}
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
