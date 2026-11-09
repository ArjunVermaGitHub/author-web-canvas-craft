import { useMemo } from 'react';
import BookButton from './BookButton';
import { getBrowserAmazonStore, trackPurchaseClick } from '@/lib/purchase';
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/config/book';

type Props = {
  placement: string;
  children: React.ReactNode;
  className?: string;
  signedClassName?: string;
  amazonClassName?: string;
  amazonVariant?: 'outline' | 'outline-ember';
  onOrderClick?: () => void;
  showFollow?: boolean;
  followClassName?: string;
};

const FOLLOW_LINKS = [
  { label: 'Follow on Instagram', url: INSTAGRAM_URL },
  { label: 'Follow on Facebook', url: FACEBOOK_URL },
];

// Quieter than Order / Buy on Amazon: thin border, smaller text.
const followStyle =
  'min-h-11 w-full sm:w-auto px-4 py-1.5 text-sm font-semibold border hover:bg-transparent hover:text-carnelian';

export default function PurchaseButtons({ placement, children, className = '', signedClassName = '', amazonClassName = '', amazonVariant = 'outline', onOrderClick, showFollow = true, followClassName = '' }: Props) {
  const amazon = useMemo(getBrowserAmazonStore, []);
  return (
    <div className={`flex flex-col sm:flex-row sm:flex-wrap gap-2 ${className}`}>
      <BookButton href="#buy" className={signedClassName} onClick={() => { trackPurchaseClick('OrderClick', placement); onOrderClick?.(); }}>
        {children}
      </BookButton>
      <BookButton href={amazon.url} target="_blank" rel="noopener noreferrer" variant={amazonVariant} className={amazonClassName} onClick={() => trackPurchaseClick('AmazonClick', placement, amazon.store)}>
        Buy on Amazon
      </BookButton>
      {showFollow && (
        <div className={`flex flex-col sm:flex-row gap-2 sm:basis-full sm:mt-1 ${followClassName}`}>
          {FOLLOW_LINKS.map(({ label, url }) => (
            <BookButton key={url} href={url} target="_blank" rel="noopener noreferrer" variant="outline" className={followStyle}>
              {label}
              <span className="sr-only"> (opens in a new tab)</span>
            </BookButton>
          ))}
        </div>
      )}
    </div>
  );
}
