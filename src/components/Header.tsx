import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import BookButton from './BookButton';

const links = [
  { label: 'The story', href: '#story' },
  { label: 'Press', href: '#press' },
  { label: 'The author', href: '#author' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stonepage border-b-2 border-lapis">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a
            href="#top"
            className="text-lapis font-serif text-xl md:text-2xl py-2"
          >
            Rituraj Verma
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lapis hover:text-carnelian transition-colors duration-200 py-2"
              >
                {link.label}
              </a>
            ))}
            <BookButton href="#buy" className="min-h-[44px]">
              Order a signed copy
            </BookButton>
          </nav>

          <button
            className="md:hidden text-lapis p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="pb-4 md:hidden" aria-label="Mobile">
            <ul className="flex flex-col divide-y divide-lapis/15 border-t border-lapis/15">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-lapis hover:text-carnelian transition-colors py-3 min-h-[44px] flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <BookButton
                  href="#buy"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order a signed copy
                </BookButton>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
