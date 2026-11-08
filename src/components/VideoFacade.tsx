import { useState } from 'react';
import { Play } from 'lucide-react';
import BookButton from './BookButton';

interface VideoFacadeProps {
  embedUrl: string;
  title: string;
  label: string;
  postUrl?: string;
  featured?: boolean;
}

const VideoFacade = ({ embedUrl, title, label, postUrl, featured = false }: VideoFacadeProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <div className={`relative mx-auto overflow-hidden bg-book-dark ${featured ? 'aspect-[4/5] w-full max-w-[56svh] md:max-w-none' : 'aspect-video w-full'}`}>
        {loaded ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src="/raghav-ebook-cover.jpg"
              alt="Raghav Kartikeya and the Tablets of Dharma book cover"
              loading="lazy"
              decoding="async"
              width={800}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <BookButton
              type="button"
              aria-label={featured ? 'Play trailer' : `Play ${title}`}
              onClick={() => setLoaded(true)}
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full p-0"
            >
              <Play className="h-7 w-7" aria-hidden="true" />
            </BookButton>
            <p className="absolute inset-x-0 bottom-0 bg-book-dark px-4 py-3 text-center text-base text-book-light">
              {label}
            </p>
          </>
        )}
      </div>
      {postUrl && (
        <a href={postUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-[44px] items-center text-base text-book-light underline underline-offset-4">
          Watch on Instagram
        </a>
      )}
    </div>
  );
};

export default VideoFacade;