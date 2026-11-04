import React from 'react';
import BookButton from './BookButton';
import { TOTAL_PRICE } from '@/config/book';

const FinalCta = () => {
  return (
    <section className="bg-stonepage band-section">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="page-heading max-w-3xl mx-auto">
          Start Raghav's journey today
        </h2>
        <BookButton href="#buy" className="text-lg px-8">
          Order a signed copy — ₹{TOTAL_PRICE}
        </BookButton>
      </div>
    </section>
  );
};

export default FinalCta;
