import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import WikiSection from '@/components/WikiSection';
export default function Wiki() { return <PageLayout page={NAV_PAGES[2]}><WikiSection /></PageLayout>; }
