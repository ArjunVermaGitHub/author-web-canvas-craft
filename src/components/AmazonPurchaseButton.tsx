import BookButton from './BookButton';
import { getBrowserAmazonStore, trackPurchaseClick } from '@/lib/purchase';
import { getCampaignTrackingData } from '@/lib/campaign.js';

export default function AmazonPurchaseButton({ placement, children = 'Buy on Amazon', className }: { placement: string; children?: React.ReactNode; className?: string }) {
  const { store, url } = getBrowserAmazonStore();
  return <BookButton href={url} target="_blank" rel="noopener noreferrer sponsored" className={className}
    onClick={() => trackPurchaseClick('AmazonClick', placement, store, undefined, { utm_content: getCampaignTrackingData().utm_content })}>{children}</BookButton>;
}