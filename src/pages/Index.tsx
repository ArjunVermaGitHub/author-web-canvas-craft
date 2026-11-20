import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/HeroSection';
import SocialProofStrip from '@/components/SocialProofStrip';
import Book2ProgressSection from '@/components/Book2ProgressSection';
import TeaserGrid from '@/components/TeaserGrid';
import OtherBooksSection from '@/components/OtherBooksSection';
import CommunitySection from '@/components/CommunitySection';
import FinalCta from '@/components/FinalCta';
import OrderBar from '@/components/OrderBar';
import { NAV_PAGES } from '@/config/site';
export default function Index() { return <><PageLayout page={NAV_PAGES[0]} home><HeroSection /><SocialProofStrip /><Book2ProgressSection /><TeaserGrid /><OtherBooksSection /><CommunitySection /><FinalCta /></PageLayout><OrderBar /></>; }
