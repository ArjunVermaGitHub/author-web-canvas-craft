
import React from 'react';
import BookButton from './BookButton';

const SneakPeekSection = () => {
  return (
    <section className="book-section bg-book-dark">
      <div className="container mx-auto">
        <h2 className="section-heading">Sneak Peek</h2>
        
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl text-book-light italic mb-6">
            "There will come a boy who remembers what others have forgotten.
            A boy who carries the flame of Dharma in his bones..."
          </blockquote>
          
          <BookButton className="mt-8" onClick={()=> window.open('/Raghav-Kartikeya-Sample-Chapters.pdf', '_blank', 'noopener,noreferrer')}>
          Read the first two chapters free
          </BookButton>
        </div>
      </div>
    </section>
  );
};

export default SneakPeekSection;
