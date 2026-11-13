import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LphBookLinks from '@/components/LphBookLinks';
import { ALTERNATE_STORIES, LPH_BOOK, endingPath, endingTitle, lphCanonical, storyPath } from '@/data/alternateEndings';
import NotFound from './NotFound';

export default function AlternateEndingsIndex() {
  const { storySlug } = useParams();
  const { pathname } = useLocation();
  const story = ALTERNATE_STORIES.find(item => item.slug === storySlug && item.endings.length > 0);
  if (storySlug && !story) return <NotFound />;

  const title = story ? `${story.title}: Alternate endings` : `${LPH_BOOK.title} — Alternate endings`;
  const description = story
    ? `Read the alternate endings for ${story.title}, a story by Rituraj Verma in Love, Peace & Happiness.`
    : `Alternate endings to stories in ${LPH_BOOK.title}, the 2012 book by Rituraj Verma.`;
  const canonical = lphCanonical(story ? storyPath(story.slug) : pathname);

  return (
    <div className="public-site">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
      </Helmet>
      <Header />
      <main id="top" className="band-section">
        <div className="site-container min-w-0">
          <h1 className="page-heading break-words">{story ? story.title : LPH_BOOK.title}</h1>
          <p className="text-xl mb-4">Alternate endings</p>
          <p className="text-sm leading-relaxed mb-8">{story ? 'A story in Love, Peace & Happiness by Rituraj Verma' : `Rituraj Verma · ${LPH_BOOK.year} · ${LPH_BOOK.publisher} · ISBN ${LPH_BOOK.isbn}`}</p>
          {story ? (
            <>
              <ul className="divide-y divide-lapis/20 border-t-2 border-lapis">
                {story.endings.map(ending => (
                  <li key={ending.slug}>
                    <Link to={endingPath(story.slug, ending.slug)} className="block py-5 underline underline-offset-4 text-lg">{endingTitle(story, ending)}</Link>
                  </li>
                ))}
              </ul>
              <Link to="/lph/alternate-endings/" className="mt-6 min-h-11 inline-flex items-center underline underline-offset-4">All stories</Link>
            </>
          ) : (
            <ul className="divide-y divide-lapis/20 border-t-2 border-lapis">
              {ALTERNATE_STORIES.map(item => (
                <li key={item.slug} className="py-5">
                  {item.endings.length > 0 ? (
                    <Link to={storyPath(item.slug)} className="min-h-11 inline-flex items-center underline underline-offset-4 text-lg">{item.title}</Link>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1"><span className="text-lg">{item.title}</span><span className="text-sm text-lapis/70">Coming soon</span></div>
                  )}
                </li>
              ))}
            </ul>
          )}
          <LphBookLinks />
        </div>
      </main>
      <Footer />
    </div>
  );
}