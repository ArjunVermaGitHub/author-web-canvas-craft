import React, { useState } from 'react';
import BookButton from './BookButton';
import BuyModal from './BuyModal';
import { TOTAL_PRICE } from '@/config/book';

const CtaSection = () => {
  const [showBuyModal, setShowBuyModal] = useState(false);

  return (
    <section className="book-section bg-gradient-to-b from-book-medium to-book-dark p-8 md:p-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-book-gold mb-4">
          Begin Your Mythical Journey
        </h2>
        <p className="text-book-light text-lg max-w-2xl mx-auto mb-8">
          Discover the world where dreams and ancient memories intertwine, and
          destiny calls you to a forgotten civilization.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BookButton onClick={() => setShowBuyModal(true)}>
            Order Your Copy — ₹{TOTAL_PRICE}
          </BookButton>
        </div>
      </div>

      <BuyModal
        open={showBuyModal}
        onOpenChange={setShowBuyModal}
      />
    </section>
  );
};

export default CtaSection;
