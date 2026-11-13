import PageLayout from '@/components/PageLayout';
import { NAV_PAGES } from '@/config/site';
import ScriptBand from '@/components/ScriptBand';
import IndusQuiz from '@/components/IndusQuiz';
import NewsSection from '@/components/NewsSection';
import VideoSection from '@/components/VideoSection';
export default function World() { return <PageLayout page={NAV_PAGES[5]}><ScriptBand /><IndusQuiz /><NewsSection /><VideoSection /></PageLayout>; }
