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

const Index = () => {
  return (
    <div className="min-h-screen bg-stonepage text-lapis">
      <Header />
      <main>
        <HeroSection />
        <ScriptBand />
        <StorySection />
        <BuySection />
        <SampleSection />
        <PressSection />
        <ReviewsSection />
        <AuthorSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
