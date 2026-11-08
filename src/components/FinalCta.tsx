import React from 'react';
import PurchaseButtons from './PurchaseButtons';
import { TOTAL_PRICE } from '@/config/book';

const FinalCta = () => {
  return (
    <section className="bg-stonepage band-section">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="page-heading max-w-3xl mx-auto">
          Start Raghav's journey today
        </h2>
        <PurchaseButtons placement="final_cta" className="sm:justify-center" signedClassName="text-lg px-8">
          Order a signed copy — ₹{TOTAL_PRICE}
        </PurchaseButtons>
      </div>
    </section>
  );
};

export default FinalCta;
