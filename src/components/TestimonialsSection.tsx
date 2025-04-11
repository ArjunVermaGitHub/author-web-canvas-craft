
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "A breathtaking blend of history and imagination.",
      author: "Book Lover Magazine"
    },
    {
      quote: "Shiva's voice gave me chills.",
      author: "Fantasy Reader"
    },
    {
      quote: "Be the inclusive capther prev deo",
      author: "Literary Review"
    },
    {
      quote: "Watch behind-the-scenes videos",
      author: "Digital Content Reviewer"
    }
  ];

  return (
    <section className="book-section bg-book-dark">
      <div className="container mx-auto">
        <h2 className="section-heading">What Readers Are Saying</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-book-medium p-6 rounded-lg border-l-4 border-book-gold"
            >
              <p className="text-book-light mb-4">
                <span className="text-book-gold text-4xl leading-none mr-2">"</span>
                {testimonial.quote}
                <span className="text-book-gold text-4xl leading-none ml-2">"</span>
              </p>
              <p className="text-book-amber text-right">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
