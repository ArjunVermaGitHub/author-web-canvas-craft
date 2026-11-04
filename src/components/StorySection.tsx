import React from 'react';

const beats = [
  {
    title: 'He reads the unreadable',
    text: 'Raghav is nine and lives in Mumbai. The carved signs on the Indus tablets make sense to him, and no one can explain why.',
  },
  {
    title: 'He finds a school hidden in the Himalayas',
    text: 'The signs lead him to Shambhala, a secret academy. Lord Shiva speaks to him in dreams, Lord Parashuram teaches there, and Raghav learns he carries a divine inheritance.',
  },
  {
    title: 'He faces an immortal warlord',
    text: 'Tarak wants to destroy humanity. The enemies who once attacked the city of Mohenjo-daro are back, and this time the world has nuclear weapons.',
  },
];

const StorySection = () => {
  return (
    <section id="story" className="scroll-mt-20 bg-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="page-heading max-w-3xl">
          Three things happen to Raghav in Book 1
        </h2>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-10 mb-12">
          {beats.map((beat) => (
            <article key={beat.title} className="border-t-4 border-carnelian pt-6">
              <h3 className="text-xl md:text-2xl font-serif text-lapis mb-3 leading-snug">
                {beat.title}
              </h3>
              <p className="text-lapis/90 leading-relaxed">{beat.text}</p>
            </article>
          ))}
        </div>

        <p className="text-lg text-lapis/90 max-w-3xl border-l-4 border-lapis pl-5">
          Written for readers who liked Harry Potter, Percy Jackson and the
          Shiva Trilogy — in short, fast scenes built around a classic hero's
          journey.
        </p>
      </div>
    </section>
  );
};

export default StorySection;
