import { useState } from 'react';
import BookButton from './BookButton';
import SignedCopyOrderFlow from './SignedCopyOrderFlow';
import { AMAZON_STORES } from '@/config/amazon';
import { getBrowserAmazonStore, selectEbookUrl, trackPurchaseClick } from '@/lib/purchase';

const BuySection = () => {
  const [amazon] = useState(getBrowserAmazonStore);
  return (
    <section id="buy" className="scroll-mt-20 bg-lapis text-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="band-heading">Order a signed copy</h2>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-14">
          <div>
            <SignedCopyOrderFlow />
          </div>

          <div className="lg:border-l-2 lg:border-ember/40 lg:pl-16">
            <h3 className="text-2xl md:text-3xl font-serif text-ember mb-4">
              Prefer a bookstore?
            </h3>
            <p className="text-lg leading-relaxed text-stonepage/90 mb-8">
              Print copies are stocked at Sapna Book House, Gangarams,
              Higginbothams and The Bookworm in several major Indian cities.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif text-ember mb-4">
              Outside India
            </h3>
            <p className="text-lg leading-relaxed text-stonepage/90 mb-6">
              Order on Amazon in 15 countries, including the US, UK, Canada,
              Australia, Germany and Japan.
            </p>
            <BookButton
              variant="outline-ember"
              href={amazon.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPurchaseClick('AmazonClick', 'buy', amazon.store)}
            >
              Order from Amazon India
            </BookButton>
            <a
              href={selectEbookUrl(amazon.store)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackPurchaseClick('EbookClick', 'buy', amazon.store === 'India' ? undefined : amazon.store)}
              className="mt-3 flex w-fit items-center min-h-[44px] text-ember underline underline-offset-4 hover:text-stonepage focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
            >
              Buy the ebook
            </a>
            <p className="mt-3 text-stonepage/60 text-base">
              As an Amazon Associate I earn from qualifying purchases.
            </p>
            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 border-t-2 border-ember/40 pt-4">
              {AMAZON_STORES.map(([country, url]) => (
                <li key={country}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackPurchaseClick('AmazonClick', 'country_list', country)}
                    className="inline-flex items-center min-h-[44px] text-ember underline underline-offset-4 hover:text-stonepage focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                  >
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuySection;
