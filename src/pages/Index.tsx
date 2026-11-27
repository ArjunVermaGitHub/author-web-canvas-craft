import { lazy, Suspense, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageLayout from '@/components/PageLayout';
import HomeHero from '@/components/HomeHero';
import HomeReaderProof from '@/components/HomeReaderProof';
import HomeGift from '@/components/HomeGift';
import NearViewport from '@/components/NearViewport';
const CharacterCards = lazy(() => import('@/components/CharacterCards'));
import HomeReaderFit from '@/components/HomeReaderFit';
import HomeOrder from '@/components/HomeOrder';
import HomeFaq from '@/components/HomeFaq';
import SampleSection from '@/components/SampleSection';
const OtherBooksSection = lazy(() => import('@/components/OtherBooksSection'));
import OrderBar from '@/components/OrderBar';
import { NAV_PAGES } from '@/config/site';

const characterPlaceholder = <section id="home-characters" className="band-section" aria-busy="true"><div className="site-container"><h2 className="band-heading mb-3">Meet the characters</h2><p className="text-secondary text-lg mb-8">Tap a face. Hear them speak.</p><div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <div key={i} className="aspect-[4/5] content-panel" />)}</div></div></section>;

export default function Index() {
  const [giftName, setGiftName] = useState('');
  return <><PageLayout page={NAV_PAGES[0]} home>
    <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap" /></Helmet>
    <HomeHero /><HomeReaderProof /><NearViewport fallback={characterPlaceholder}><Suspense fallback={characterPlaceholder}><CharacterCards /></Suspense></NearViewport>
    <section className="band-section"><div className="site-container"><div className="grid md:grid-cols-3 gap-5">
      {[
        ['Rooted in a real mystery', 'The Indus Valley script has never been deciphered. Raghav is the first person who can read it.'],
        ['A hero kids recognise', 'Not a chosen prince — a sickly nine-year-old from Mumbai who has to be brave anyway.'],
        ['Gods as friends, not statues', 'His closest friend after Priya is Little Yama, the child god of death. Together they head into Pakistan to find the tablets of Dharma.'],
      ].map(([title, text]) => <article key={title} className="content-panel p-6"><h2 className="font-serif text-xl mb-4">{title}</h2><p className="text-secondary leading-relaxed">{text}</p></article>)}
    </div><p className="text-lg text-secondary mt-7">For fans of Percy Jackson and Amish — and for parents who want their kids reading Indian myth.</p></div></section>
    <HomeReaderFit /><HomeGift name={giftName} onNameChange={setGiftName} /><HomeOrder giftName={giftName} /><SampleSection conversion /><HomeFaq /><NearViewport fallback={<div className="min-h-[600px]" aria-busy="true" />}><Suspense fallback={<div className="min-h-[600px]" aria-busy="true" />}><OtherBooksSection /></Suspense></NearViewport>
  </PageLayout><OrderBar /></>;
}
