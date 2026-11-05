import React from 'react';

const PressSection = () => {
  return (
    <section id="press" className="scroll-mt-20 bg-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="page-heading">In the press</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          <article className="border-t-4 border-lapis pt-6">
            <h3 className="text-xl font-serif text-lapis mb-3 leading-snug">
              <a
                href="https://theprint.in/ani-press-releases/debut-author-rituraj-verma-launches-raghav-kartikeya-and-the-tablets-of-dharma-a-mythology-fantasy-novel-rooted-in-the-undeciphered-indus-valley-script/3024584/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-carnelian transition-colors"
              >
                Debut author launches an Indus Valley mythology-fantasy novel
              </a>
            </h3>
            <p className="text-lapis/90 leading-relaxed">
              Press release from Qurate Books, distributed by ANI and published
              on ThePrint, 25 August 2026.
            </p>
          </article>

          <article className="border-t-4 border-lapis pt-6">
            <h3 className="text-xl font-serif text-lapis mb-3 leading-snug">
              <a
                href="https://theliteraturemag.com/raghav-kartikeya-and-the-tablets-of-dharma-by-rituraj-verma-an-epic-mythological-science-fiction-thriller-of-ancient-civilisations-immortal-enemies-and-humanitys-survival/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-carnelian transition-colors"
              >
                Featured in The Literature Mag
              </a>
            </h3>
            <p className="text-lapis/90 leading-relaxed">
              Feature article, 27 October 2026
            </p>
          </article>

          <article className="border-t-4 border-lapis pt-6">
            <h3 className="text-xl font-serif text-lapis mb-3 leading-snug">
              <a
                href="https://www.netgalley.com/catalog/book/885792"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-carnelian transition-colors"
              >
                Offered to reviewers on NetGalley
              </a>
            </h3>
            <p className="text-lapis/90 leading-relaxed">
              Reviewers and librarians can request the book on NetGalley.
            </p>
          </article>

          <article className="border-t-4 border-lapis pt-6">
            <blockquote className="text-xl font-serif text-lapis leading-snug mb-3">
              “This story belongs to everyone.”
            </blockquote>
            <p className="text-lapis/90 leading-relaxed">
              Rituraj Verma, in the launch announcement.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
