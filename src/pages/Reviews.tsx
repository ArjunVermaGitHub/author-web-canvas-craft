import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import ReviewsSection from '@/components/ReviewsSection';
export default function Reviews() { const page = NAV_PAGES.find(page => page.path === '/reviews'); if (!page) return null; return <PageLayout page={page}><ReviewsSection /></PageLayout>; }
