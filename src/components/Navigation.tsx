
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-book-dark/80 backdrop-blur-sm fixed w-full z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-book-gold font-serif text-2xl">Rituraj</div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-book-light"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {/* {["Home", "About", "Books", "Events", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-book-light hover:text-book-gold transition-colors duration-300"
              >
                {item}
              </a>
            ))} */}
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden animate-fade-in">
            <ul className="flex flex-col space-y-4">
              {/* {["Home", "About", "Books", "Events", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-book-light hover:text-book-gold transition-colors duration-300 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))} */}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
