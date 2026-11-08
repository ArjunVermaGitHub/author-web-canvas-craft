import { ExternalLink } from 'lucide-react';
import { WIKI_TERMS } from '@/data/wikiTerms';

const WikiSection = () => (
  <section id="wiki" className="scroll-mt-20 bg-stonepage band-section" aria-labelledby="wiki-heading">
    <div className="max-w-6xl mx-auto">
      <h2 id="wiki-heading" className="page-heading max-w-3xl">
        Raghav Kartikeya's Wiki
      </h2>
      <p className="text-lg text-lapis/90 max-w-3xl mb-10">
        Curious about a place, a myth or an idea from the story? Start here.
      </p>

      <ul className="grid md:grid-cols-2 gap-x-8 gap-y-8">
        {WIKI_TERMS.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-11 flex-col justify-between gap-3 border-t-4 border-lapis pt-5 transition-colors hover:border-carnelian focus-visible:border-carnelian focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carnelian focus-visible:ring-offset-2 focus-visible:ring-offset-stonepage"
            >
              <span className="font-serif text-xl text-lapis leading-snug break-words transition-colors group-hover:text-carnelian">
                {item.term}
              </span>
              <span className="text-base text-lapis/80 break-words">{item.blurb}</span>
              <span className="flex items-center justify-between gap-3 text-base text-lapis/70">
                <span>Wikipedia</span>
                <ExternalLink
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-lapis/60 transition-colors group-hover:text-carnelian"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-base text-lapis/60 max-w-3xl">
        Links open Wikipedia in a new tab.
      </p>
    </div>
  </section>
);

export default WikiSection;
