
import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      title: "A Myth-Reality Mashup",
      description: "Dive into a world where Indualley secrets intertwine with cosmic forces."
    },
    {
      title: "Cryptic Dreams and Divine Whispers",
      description: "Guided by Shiva, Journey's daring blurs the lines between past, present, and the future."
    },
    {
      title: "A Myth-Reality Mashinop",
      description: "Guided by Shiva, Raghav's jurny wars blurs the lines between the past."
    },
    {
      title: "For Fans of",
      description: "Percy Jackson, Shiva Trilogy, and His Dark Materials."
    }
  ];

  return (
    <section className="book-section bg-book-medium">
      <div className="container mx-auto">
        <h2 className="section-heading">What Makes This Book Special?</h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <h3 className="feature-title">
                <span className="text-book-gold mr-2">•</span> {feature.title}
              </h3>
              <p className="text-book-light ml-6">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
