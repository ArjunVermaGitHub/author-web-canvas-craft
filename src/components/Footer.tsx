
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-book-dark py-8 border-t border-book-medium">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-book-gold font-serif text-2xl mb-2">Rituraj</h3>
            <p className="text-book-light">Author of Mythological Fantasy</p>
          </div>
          
          <div className="flex space-x-6">
            {[['Instagram','https://www.instagram.com/raghav.kartikeya.series/'], ['Facebook','https://www.facebook.com/profile.php?id=61574944773635'], ['YouTube','https://www.youtube.com/@RaghavKartikeya']].map(([social,link]) => (
              <a 
                key={social}
                href={link} 
                target='_blank'
                rel="noopener noreferrer"
                className="text-book-light hover:text-book-gold transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-book-medium text-center space-y-2">
          <p>
            <Link
              to="/privacy"
              className="text-book-light/80 hover:text-book-gold transition-colors text-sm underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </p>
          <p className="text-book-light text-sm">
            © {new Date().getFullYear()} Rituraj. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
