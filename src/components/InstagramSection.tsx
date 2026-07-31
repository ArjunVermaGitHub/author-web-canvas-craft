import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import BookButton from './BookButton';

const INSTAGRAM_POSTS = [
  'DbBhYApgQI6',
  'DafvBIbMFkg',
  'DbcRigmJAUc',
  'DasIMYdB1XU',
  'DaovM4MOrwu',
  'DamR6imJtr4',
  'DadbVUqsREv',
  'DadNcdBsifI',
  'Daahxlksgl8',
  'DaaapA1Mwl7',
  'DKOnJJNMI0i',
  'DKKlJDDtVPE',
  'DJmMuTkIk1c',
  'DIZGdluJ7UH',
] as const;

const INSTAGRAM_PROFILE = 'https://www.instagram.com/raghav.kartikeya.series/';

const postUrl = (postId: string) => `https://www.instagram.com/p/${postId}/`;

const InstagramSection = () => {
  return (
    <section className="book-section bg-book-medium overflow-hidden">
      <div className="container mx-auto">
        <h2 className="section-heading">Watch the Story Unfold</h2>
        <p className="text-book-light text-lg text-center max-w-2xl mx-auto mb-10">
          Watch the clips here, then open any post on Instagram to like, comment, and see live counts.
        </p>

        <div className="relative max-w-6xl mx-auto px-10 md:px-14">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {INSTAGRAM_POSTS.map((postId) => (
                <CarouselItem
                  key={postId}
                  className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="rounded-lg overflow-hidden border border-book-gold/40 bg-book-dark shadow-lg">
                    {/* Clip embed chrome (stale likes/comments); real engagement is on Instagram */}
                    <div className="overflow-hidden" style={{ height: 480 }}>
                      <iframe
                        src={`https://www.instagram.com/p/${postId}/embed`}
                        title={`Instagram post ${postId}`}
                        className="w-full border-0"
                        style={{ height: 680 }}
                        loading="lazy"
                        allow="encrypted-media; clipboard-write"
                        allowFullScreen
                      />
                    </div>
                    <a
                      href={postUrl(postId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-3 text-book-gold hover:text-book-amber transition-colors font-serif border-t border-book-gold/30"
                    >
                      Open on Instagram
                    </a>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-book-gold text-book-gold bg-book-dark/80 hover:bg-book-gold hover:text-book-dark left-0 md:-left-2 disabled:opacity-40" />
            <CarouselNext className="border-book-gold text-book-gold bg-book-dark/80 hover:bg-book-gold hover:text-book-dark right-0 md:-right-2 disabled:opacity-40" />
          </Carousel>
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

export default InstagramSection;
