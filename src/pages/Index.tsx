import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ScriptBand from '@/components/ScriptBand';
import StorySection from '@/components/StorySection';
import WikiSection from '@/components/WikiSection';
import BuySection from '@/components/BuySection';
import SampleSection from '@/components/SampleSection';
import PressSection from '@/components/PressSection';
import ReviewsSection from '@/components/ReviewsSection';
import CommunitySection from '@/components/CommunitySection';
import AuthorSection from '@/components/AuthorSection';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import IndusQuiz from '@/components/IndusQuiz';
import NewsSection from '@/components/NewsSection';
import AuthorVideoSection from '@/components/AuthorVideoSection';
import VideoSection from '@/components/VideoSection';
import OrderBar from '@/components/OrderBar';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <div className="homepage-order-space min-h-screen bg-stonepage text-lapis">
      <Helmet>
        <link rel="canonical" href="https://riturajverma.com/" />
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <ScriptBand />
        <IndusQuiz />
        <NewsSection />
        <StorySection />
        <WikiSection />
        <VideoSection />
        <AuthorVideoSection />
        <BuySection />
        <SampleSection />
        <PressSection />
        <ReviewsSection />
        <CommunitySection />
        <AuthorSection />
        <FinalCta />
      </main>
      <Footer />
      <OrderBar />
    </div>
  );
};

export default Index;
