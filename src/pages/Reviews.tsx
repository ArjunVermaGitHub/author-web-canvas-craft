import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import ReviewsSection from '@/components/ReviewsSection';
export default function Reviews() { return <PageLayout page={NAV_PAGES[4]}><ReviewsSection /></PageLayout>; }
