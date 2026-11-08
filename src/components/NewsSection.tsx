import { ExternalLink } from 'lucide-react';
import { INDUS_NEWS } from '@/data/indusNews';

const NewsSection = () => {
  return (
    <section id="news" className="scroll-mt-20 bg-stonepage band-section" aria-labelledby="news-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="news-heading" className="page-heading max-w-3xl">
          The Indus Valley in the news
        </h2>
        <p className="text-lg text-lapis/90 max-w-3xl mb-10">
          Real discoveries from the civilisation behind the book.
        </p>

        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-8">
          {INDUS_NEWS.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 flex-col justify-between gap-3 border-t-4 border-lapis pt-5 transition-colors hover:border-carnelian focus-visible:border-carnelian focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carnelian focus-visible:ring-offset-2 focus-visible:ring-offset-stonepage"
              >
                <span className="font-serif text-xl text-lapis leading-snug transition-colors group-hover:text-carnelian">
                  {item.title}
                </span>
                <span className="flex items-center justify-between gap-3 text-base text-lapis/70">
                  <span>
                    {item.outlet} · {item.year}
                  </span>
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
          Links go to external news sites and open in a new tab. Some may need a free sign-in or have a paywall.
        </p>
      </div>
    </section>
  );
};

export default NewsSection;
