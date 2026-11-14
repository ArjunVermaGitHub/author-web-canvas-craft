import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import BuySection from '@/components/BuySection';
import SampleSection from '@/components/SampleSection';
export default function Shop() {
  const page = NAV_PAGES.find(page => page.path === '/shop');
  if (!page) return null;
  return <PageLayout page={page}><BuySection /><SampleSection /></PageLayout>;
}
