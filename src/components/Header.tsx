import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { OTHER_BOOK_SERIES } from '@/data/otherBooks';
import { shouldShowPurchaseButtons } from '@/lib/headerPurchase';
import PurchaseButtons from './PurchaseButtons';

const links = [
  { label: 'The story', href: '#story' },
  { label: 'Press', href: '#press' },
  { label: 'The author', href: '#author' },
  { label: 'Community', href: '#community' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const homeHref = (hash: string) => pathname === '/' ? hash : `/${hash}`;
  const showPurchase = shouldShowPurchaseButtons(pathname);

  return (
    <header className="sticky top-0 z-40 bg-stonepage border-b-2 border-lapis">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a
            href={homeHref('#top')}
            className="text-lapis font-serif text-xl md:text-2xl py-2 min-w-0"
          >
            Rituraj Verma
          </a>

          <nav className="hidden lg:flex items-center gap-3 xl:gap-4" aria-label="Main">
            {links.map((link) => (
              <a
                key={link.href}
                href={homeHref(link.href)}
                className="text-lapis hover:text-carnelian transition-colors duration-200 py-2 min-h-11 inline-flex items-center"
              >
                {link.label}
              </a>
            ))}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="min-h-11 rounded-none px-2 text-base text-lapis hover:bg-transparent hover:text-carnelian">
                  Other books <ChevronDown aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-w-[calc(100vw-2rem)] rounded-none border-2 border-lapis bg-stonepage text-lapis shadow-none">
                {OTHER_BOOK_SERIES.map(series => (
                  <DropdownMenuItem key={series.path} asChild className="min-h-11 rounded-none text-base focus:bg-lapis focus:text-stonepage">
                    <Link to={series.path}>{series.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {showPurchase && (
              <PurchaseButtons placement="header" showFollow={false} signedClassName="min-h-[44px] px-4 xl:px-6" amazonClassName="hidden xl:inline-flex">
                Order a signed copy
              </PurchaseButtons>
            )}
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            {showPurchase && (
              <PurchaseButtons placement="header" showFollow={false} signedClassName="px-2 py-2 text-base leading-tight max-w-[148px]" amazonClassName="hidden" onOrderClick={() => setIsMenuOpen(false)}>
                Order a signed copy
              </PurchaseButtons>
            )}
           <Button variant="ghost"
             className="lg:hidden rounded-none text-lapis p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-transparent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="pb-4 lg:hidden" aria-label="Mobile">
            <ul className="flex flex-col divide-y divide-lapis/15 border-t border-lapis/15">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={homeHref(link.href)}
                    className="text-lapis hover:text-carnelian transition-colors py-3 min-h-[44px] flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <p className="pt-3 font-semibold">Other books</p>
                <ul>
                  {OTHER_BOOK_SERIES.map(series => (
                    <li key={series.path}>
                      <Link to={series.path} className="pl-4 py-3 min-h-11 flex items-center text-lapis hover:text-carnelian" onClick={() => setIsMenuOpen(false)}>
                        {series.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
