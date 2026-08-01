
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import SneakPeekSection from '@/components/SneakPeekSection';
import VideoSection from '@/components/VideoSection';
import AuthorSection from '@/components/AuthorSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-book-dark text-book-light">
      <Navigation />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <SneakPeekSection />
        <VideoSection />
        <AuthorSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
