import { useMemo } from 'react';
import BookButton from './BookButton';
import { getBrowserAmazonStore, trackPurchaseClick } from '@/lib/purchase';

type Props = {
  placement: string;
  children: React.ReactNode;
  className?: string;
  signedClassName?: string;
  amazonClassName?: string;
  amazonVariant?: 'outline' | 'outline-ember';
  onOrderClick?: () => void;
};

export default function PurchaseButtons({ placement, children, className = '', signedClassName = '', amazonClassName = '', amazonVariant = 'outline', onOrderClick }: Props) {
  const amazon = useMemo(getBrowserAmazonStore, []);
  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <BookButton href="#buy" className={signedClassName} onClick={() => { trackPurchaseClick('OrderClick', placement); onOrderClick?.(); }}>
        {children}
      </BookButton>
      <BookButton href={amazon.url} target="_blank" rel="noopener noreferrer" variant={amazonVariant} className={amazonClassName} onClick={() => trackPurchaseClick('AmazonClick', placement, amazon.store)}>
        Buy on Amazon
      </BookButton>
    </div>
  );
}