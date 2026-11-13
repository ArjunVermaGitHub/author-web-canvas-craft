import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import AuthorSection from '@/components/AuthorSection';
import AuthorVideoSection from '@/components/AuthorVideoSection';
export default function Author() { return <PageLayout page={NAV_PAGES[6]}><AuthorSection /><AuthorVideoSection /></PageLayout>; }
