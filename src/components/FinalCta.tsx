import React from 'react';
import PurchaseButtons from './PurchaseButtons';
import { TOTAL_PRICE } from '@/config/book';

const FinalCta = () => {
  return (
    <section className="bg-background band-section final-glow">
      <div className="site-container">
        <h2 className="page-heading ">
          Start Raghav's journey today
        </h2>
        <PurchaseButtons placement="final_cta" className="sm:justify-start" followClassName="sm:justify-start" signedClassName="text-lg px-8">
          Order a signed copy — ₹{TOTAL_PRICE}
        </PurchaseButtons>
      </div>
    </section>
  );
};

export default FinalCta;
