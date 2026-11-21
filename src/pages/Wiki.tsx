import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import WikiSection from '@/components/WikiSection';
export default function Wiki() { const page = NAV_PAGES.find(page => page.path === '/wiki'); if (!page) return null; return <PageLayout page={page}><WikiSection /></PageLayout>; }
