import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LphBookLinks from '@/components/LphBookLinks';
import { ALTERNATE_STORIES, endingPath, endingTitle, lphCanonical, storyPath } from '@/data/alternateEndings';
import NotFound from './NotFound';

export default function AlternateEnding() {
  const { storySlug, endingSlug } = useParams();
  const story = ALTERNATE_STORIES.find(item => item.slug === storySlug);
  const ending = story?.endings.find(item => item.slug === endingSlug);
  if (!story || !ending) return <NotFound />;

  const title = endingTitle(story, ending);
  const description = `${title}. An alternate ending to a story in Love, Peace & Happiness by Rituraj Verma.`;
  const canonical = lphCanonical(endingPath(story.slug, ending.slug));

  return (
    <div className="min-h-screen bg-stonepage text-lapis">
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
        <article className="max-w-3xl mx-auto min-w-0">
          <h1 className="page-heading break-words">{title}</h1>
          <p className="text-sm leading-relaxed mb-10">An alternate ending to a story in Love, Peace &amp; Happiness by Rituraj Verma</p>
          <div className="space-y-6 text-lg leading-relaxed">
            {ending.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <footer className="mt-12 border-t-2 border-lapis pt-6">
            <nav aria-label="Other endings" className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2">
              {story.endings.filter(item => item.slug !== ending.slug).map(item => (
                <Link key={item.slug} to={endingPath(story.slug, item.slug)} className="min-h-11 inline-flex items-center underline underline-offset-4">{endingTitle(story, item)}</Link>
              ))}
              <Link to={storyPath(story.slug)} className="min-h-11 inline-flex items-center underline underline-offset-4">All endings for {story.title}</Link>
            </nav>
            <p className="mt-4 text-sm leading-relaxed">This is an alternate ending. The printed ending is in the book.</p>
          </footer>
          <LphBookLinks />
        </article>
      </main>
      <Footer />
    </div>
  );
}