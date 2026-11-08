import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ScriptBand from '@/components/ScriptBand';
import StorySection from '@/components/StorySection';
import BuySection from '@/components/BuySection';
import SampleSection from '@/components/SampleSection';
import PressSection from '@/components/PressSection';
import ReviewsSection from '@/components/ReviewsSection';
import AuthorSection from '@/components/AuthorSection';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import IndusQuiz from '@/components/IndusQuiz';
import InternetAbbreviations from '@/components/InternetAbbreviations';
import AuthorVideoSection from '@/components/AuthorVideoSection';
import VideoSection from '@/components/VideoSection';
import MobileOrderBar from '@/components/MobileOrderBar';

const Index = () => {
  return (
    <div className="homepage-order-space min-h-screen bg-stonepage text-lapis">
      <Header />
      <main>
        <HeroSection />
        <ScriptBand />
        <IndusQuiz />
        <InternetAbbreviations />
        <StorySection />
        <VideoSection />
        <AuthorVideoSection />
        <BuySection />
        <SampleSection />
        <PressSection />
        <ReviewsSection />
        <AuthorSection />
        <FinalCta />
      </main>
      <Footer />
      <MobileOrderBar />
    </div>
  );
};

export default Index;
