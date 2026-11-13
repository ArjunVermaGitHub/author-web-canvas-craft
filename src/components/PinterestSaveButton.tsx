import React from 'react';
import {
  COVER_IMAGE_URL,
  PINTEREST_DESCRIPTION,
  SITE_URL,
} from '@/config/book';
import { buildPinterestPinUrl } from '@/lib/pinterest';
import { cn } from '@/lib/utils';

interface PinterestSaveButtonProps {
  className?: string;
}

// Opens Pinterest's pin-creation dialog with the book cover as the image and
// the site as the destination. No Pinterest script is loaded, so the button
// keeps the site's own styling; the link works the same way Pinterest's own
// bookmarklet does.
const PinterestSaveButton = ({ className }: PinterestSaveButtonProps) => {
  const pinUrl = buildPinterestPinUrl({
    url: SITE_URL,
    media: COVER_IMAGE_URL,
    description: PINTEREST_DESCRIPTION,
  });

  if (!pinUrl) return null;

  return (
    <a
      href={pinUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-pin-media={COVER_IMAGE_URL}
      data-pin-url={SITE_URL}
      data-pin-description={PINTEREST_DESCRIPTION}
      className={cn(
        'inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 font-sans font-semibold text-base rounded-none border-2 border-lapis text-lapis hover:bg-background hover:text-stonepage transition-colors duration-200 text-center',
        className,
      )}
    >
      Save on Pinterest
    </a>
  );
};

export default PinterestSaveButton;
