import React from 'react';
import BookButton from './BookButton';
import VideoFacade from './VideoFacade';

const VIDEOS = [
  {
    id: '1el4cdaDdFHWeobG2nMiUi8dp5RF_4V8i',
    title: 'Raghav Kartikeya and the Tablets of Dharma',
    shape: 'tall',
  },
  {
    id: '1wQ9LNjDf2gEaur_fgoOfsk1d7DFKjQoD',
    title: 'Raghav Kartikeya and the Tablets of Dharma — Preview',
    shape: 'wide',
  },
] as const;

const INSTAGRAM_PROFILE = 'https://www.instagram.com/raghav.kartikeya.series/';

const VideoSection = () => {
  return (
    <section className="book-section bg-book-medium">
      <div className="container mx-auto">
        <h2 className="section-heading">Watch the Story Unfold</h2>
        <p className="text-book-light text-lg text-center max-w-2xl mx-auto mb-10">
          Trailers and glimpses from Raghav Kartikeya and the Tablets of Dharma.
        </p>

        <div className="max-w-3xl mx-auto mb-10">
          <h3 className="text-2xl text-book-light text-center mb-4">The 2-minute trailer</h3>
          <VideoFacade
            postUrl="https://www.instagram.com/p/DcEaSWwtv3x/"
            title="Raghav Kartikeya and the Tablets of Dharma — The 2-minute trailer"
            label="Watch the 2-minute trailer on Instagram"
            shape="tall"
          />
        </div>

        <div className="grid md:grid-cols-2 items-start gap-6 max-w-5xl mx-auto">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="rounded-lg overflow-hidden border border-book-gold/40 bg-book-dark shadow-lg"
            >
              <VideoFacade
                embedUrl={`https://drive.google.com/file/d/${video.id}/preview`}
                title={video.title}
                label={video.title}
                shape={video.shape}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <BookButton
            variant="outline"
            onClick={() =>
              window.open(INSTAGRAM_PROFILE, '_blank', 'noopener,noreferrer')
            }
          >
            Follow on Instagram
          </BookButton>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
