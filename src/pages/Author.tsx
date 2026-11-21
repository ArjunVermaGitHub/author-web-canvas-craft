import CommunitySection from '@/components/CommunitySection';
import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import AuthorSection from '@/components/AuthorSection';
import AuthorVideoSection from '@/components/AuthorVideoSection';
export default function Author() { const page = NAV_PAGES.find(page => page.path === '/author'); if (!page) return null; return <PageLayout page={page}><AuthorSection /><AuthorVideoSection /><CommunitySection /></PageLayout>; }
