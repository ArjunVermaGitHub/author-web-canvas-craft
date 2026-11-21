import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import PressSection from '@/components/PressSection';
export default function Media() { const page = NAV_PAGES.find(page => page.path === '/media'); if (!page) return null; return <PageLayout page={page}><PressSection /></PageLayout>; }
