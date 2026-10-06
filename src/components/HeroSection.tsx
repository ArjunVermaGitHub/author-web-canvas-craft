import React, { useState } from 'react';
import BookButton from './BookButton';
import EmailSignupModal from './EmailSignupModal';
import BuyModal from './BuyModal';
import { BOOK_PRICE, SHIPPING_PRICE, TOTAL_PRICE } from '@/config/book';
import bookCoverAsset from '@/assets/raghav-ebook-cover.jpg.asset.json';

const HeroSection = () => {

  const [showModal, setShowModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundColor: "#2d1a0b" }}
      >
        <div className="absolute inset-0 bg-book-dark/70"></div>
      </div>
      
      <div className="container mx-auto relative z-1 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-book-gold font-serif mb-4">
            About the Book
          </h1>
          <div className="text-book-light text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8">
            <p className="mb-4">What if your dreams were ancient memories?</p>
            <p className="mb-6">What if destiny called you back to a forgotten civilization?</p>
            <div className="text-book-amber">
              <span>Mythological Fantasy</span> <span className="mx-2">|</span> 
              <span>Coming of Age</span> <span className="mx-2">|</span> 
              <span>Adventure</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <BookButton onClick={() => setShowBuyModal(true)}>
              Buy Now — ₹{TOTAL_PRICE}
            </BookButton>
            <BookButton  variant="outline"
            onClick={()=> window.open('http://drive.google.com/file/d/1quyhjYBFfm1ujANFThp5G79g2OTWCMP8/view', '_blank', 'noopener,noreferrer')}
            >Read Excerpt</BookButton>
            <BookButton
              variant="outline" 
              onClick={() => setShowModal(true)}
            >
              Join Mailing List
            </BookButton>
          </div>
          <p className="text-book-light/70 text-sm mt-4">
            ₹{BOOK_PRICE} + ₹{SHIPPING_PRICE} shipping · Pay securely with PhonePe
          </p>
        </div>
        
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
          <div className="relative w-64 md:w-80 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={bookCoverAsset.url}
              alt="Raghav Kartikeya and the Tablets of Dharma — Book Cover"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
            
      <EmailSignupModal
        open={showModal}
        onOpenChange={setShowModal}
      />
      <BuyModal
        open={showBuyModal}
        onOpenChange={setShowBuyModal}
      />
    </section>
  );
};

export default HeroSection;
