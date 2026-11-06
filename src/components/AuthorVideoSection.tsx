import { AUTHOR_VIDEO_URL } from '@/config/book';
import { getAuthorVideoEmbedUrl } from '@/lib/authorVideo';

const AuthorVideoSection = () => {
  const embedUrl = getAuthorVideoEmbedUrl(AUTHOR_VIDEO_URL);
  if (!embedUrl) return null;

  return (
    <section className="bg-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="page-heading">Hear it from the author</h2>
        <iframe
          src={embedUrl}
          title="Rituraj Verma on Raghav Kartikeya and the Tablets of Dharma"
          loading="lazy"
          className="aspect-video w-full border-0"
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default AuthorVideoSection;