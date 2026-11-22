import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageLayout from '@/components/PageLayout';
import HomeHero from '@/components/HomeHero';
import HomeReaderProof from '@/components/HomeReaderProof';
import HomeGift from '@/components/HomeGift';
import CharacterCards from '@/components/CharacterCards';
import HomeReaderFit from '@/components/HomeReaderFit';
import HomeOrder from '@/components/HomeOrder';
import HomeFaq from '@/components/HomeFaq';
import SampleSection from '@/components/SampleSection';
import OtherBooksSection from '@/components/OtherBooksSection';
import OrderBar from '@/components/OrderBar';
import { NAV_PAGES } from '@/config/site';

export default function Index() {
  const [giftName, setGiftName] = useState('');
  return <><PageLayout page={NAV_PAGES[0]} home>
    <Helmet><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap" /></Helmet>
    <HomeHero /><HomeReaderProof /><CharacterCards />
    <section className="band-section"><div className="site-container"><div className="grid md:grid-cols-3 gap-5">
      {[
        ['Rooted in a real mystery', 'The Indus Valley script has never been deciphered. Raghav is the first person who can read it.'],
        ['A hero kids recognise', 'Not a chosen prince — a sickly nine-year-old from Mumbai who has to be brave anyway.'],
        ['Gods as friends, not statues', 'His best friend is Little Yama, the child god of death. Together they head into Pakistan to find the tablets of Dharma.'],
      ].map(([title, text]) => <article key={title} className="content-panel p-6"><h2 className="font-serif text-xl mb-4">{title}</h2><p className="text-secondary leading-relaxed">{text}</p></article>)}
    </div><p className="text-lg text-secondary mt-7">For fans of Percy Jackson and Amish — and for parents who want their kids reading Indian myth.</p></div></section>
    <HomeReaderFit /><HomeGift name={giftName} onNameChange={setGiftName} /><HomeOrder giftName={giftName} /><SampleSection conversion /><HomeFaq /><OtherBooksSection />
  </PageLayout><OrderBar /></>;
}
