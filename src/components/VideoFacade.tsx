import { useState } from 'react';
import { Play } from 'lucide-react';
import BookButton from './BookButton';

interface VideoFacadeProps {
  embedUrl?: string;
  title: string;
  label: string;
  postUrl?: string;
  shape: 'tall' | 'wide';
}

const VideoFacade = ({ embedUrl, title, label, postUrl, shape }: VideoFacadeProps) => {
  const [loaded, setLoaded] = useState(false);
  const boxClassName = `relative mx-auto overflow-hidden bg-book-dark ${shape === 'tall' ? 'aspect-[9/16] w-[min(100%,calc(75svh*9/16))]' : 'aspect-video w-full'}`;
  const poster = (
    <img
      src="/raghav-ebook-cover.jpg"
      alt="Raghav Kartikeya and the Tablets of Dharma book cover"
      loading="lazy"
      decoding="async"
      width={800}
      height={1000}
      className="absolute inset-0 h-full w-full object-contain"
    />
  );

  if (postUrl) {
    return (
      <a href={postUrl} target="_blank" rel="noopener noreferrer"
        aria-label="Watch the 2-minute trailer on Instagram, opens in a new tab"
        className="block min-h-[44px]">
        <div className={boxClassName}>
          {poster}
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Play className="h-7 w-7" aria-hidden="true" />
          </span>
        </div>
        <p className="bg-book-dark px-4 py-3 text-center text-base text-book-light">{label}</p>
      </a>
    );
  }

  return (
    <div>
      <div className={boxClassName}>
        {loaded && embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {poster}
            <BookButton
              type="button"
              aria-label={`Play ${title}`}
              onClick={() => setLoaded(true)}
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full p-0"
            >
              <Play className="h-7 w-7" aria-hidden="true" />
            </BookButton>
          </>
        )}
      </div>
      <p className="bg-book-dark px-4 py-3 text-center text-base text-book-light">
        {label}
      </p>
    </div>
  );
};

export default VideoFacade;