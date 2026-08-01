import React from 'react';
import BookButton from './BookButton';

const VIDEOS = [
  {
    id: '1el4cdaDdFHWeobG2nMiUi8dp5RF_4V8i',
    title: 'Raghav Kartikeya and the Tablets of Dharma',
  },
  {
    id: '1wQ9LNjDf2gEaur_fgoOfsk1d7DFKjQoD',
    title: 'Raghav Kartikeya and the Tablets of Dharma — Preview',
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

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="rounded-lg overflow-hidden border border-book-gold/40 bg-book-dark shadow-lg"
            >
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://drive.google.com/file/d/${video.id}/preview`}
                  title={video.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
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
