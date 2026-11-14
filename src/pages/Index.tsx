import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/HeroSection';
import TeaserGrid from '@/components/TeaserGrid';
import OtherBooksSection from '@/components/OtherBooksSection';
import CommunitySection from '@/components/CommunitySection';
import FinalCta from '@/components/FinalCta';
import OrderBar from '@/components/OrderBar';
import { NAV_PAGES } from '@/config/site';
export default function Index() { return <><PageLayout page={NAV_PAGES[0]} home><HeroSection /><TeaserGrid /><OtherBooksSection /><CommunitySection /><FinalCta /></PageLayout><OrderBar /></>; }
