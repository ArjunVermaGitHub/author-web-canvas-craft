import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import BuySection from '@/components/BuySection';
import SampleSection from '@/components/SampleSection';
export default function Shop() { return <PageLayout page={NAV_PAGES[8]}><BuySection /><SampleSection /></PageLayout>; }
