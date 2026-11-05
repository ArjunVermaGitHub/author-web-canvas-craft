import React from 'react';

// Placeholder for real reader reviews — the owner fills this block in
// once verified reviews exist. No invented reviews.
const SHOW_REVIEWS = false;

const ReviewsSection = () => {
  if (!SHOW_REVIEWS) return null;
  return (
    <section className="bg-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="page-heading">Reader reviews</h2>
        <div className="border-2 border-dashed border-lapis/40 px-6 py-10 md:py-14 text-center max-w-3xl">
          <p className="text-lapis/70 text-lg">
            No reader reviews published yet.
          </p>
          <p className="text-lapis/50 text-sm mt-2">
            Verified reviews will appear here as readers share them.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
