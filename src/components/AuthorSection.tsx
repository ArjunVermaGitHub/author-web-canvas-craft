import React from 'react';

const socials = [
  ['Instagram', 'https://www.instagram.com/raghav.kartikeya.series/'],
  ['Facebook', 'https://www.facebook.com/profile.php?id=61574944773635'],
  ['YouTube', 'https://www.youtube.com/@RaghavKartikeya'],
] as const;

const AuthorSection = () => {
  return (
    <section id="author" className="scroll-mt-20 bg-lapis text-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="shrink-0">
            <img
              src="/dad.jpeg"
              alt="Rituraj Verma"
              className="w-56 h-56 md:w-72 md:h-72 object-cover border-4 border-ember"
            />
          </div>

          <div className="max-w-2xl">
            <h2 className="band-heading">Rituraj Verma</h2>
            <p className="text-lg md:text-xl leading-relaxed text-stonepage/90 mb-8">
              Rituraj spent nearly ten years writing Book 1. He trained as an
              engineer in India, holds an MBA from the United States, and built
              a career in corporate strategy. He wrote the series because he
              wanted Indian children to have heroes who come from their own
              stories.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[44px] text-ember font-semibold underline underline-offset-4 hover:text-stonepage transition-colors"
                  >
                    {label}
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

export default AuthorSection;
