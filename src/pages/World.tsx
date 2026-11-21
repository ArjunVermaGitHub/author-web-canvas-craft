import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import ScriptBand from '@/components/ScriptBand';
import IndusQuiz from '@/components/IndusQuiz';
import NewsSection from '@/components/NewsSection';
import VideoSection from '@/components/VideoSection';
export default function World() { const page = NAV_PAGES.find(page => page.path === '/world'); if (!page) return null; return <PageLayout page={page}><ScriptBand /><IndusQuiz /><NewsSection /><VideoSection /></PageLayout>; }
