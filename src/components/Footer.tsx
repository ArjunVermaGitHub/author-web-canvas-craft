import React from 'react';
import { Link } from 'react-router-dom';
import VisitorCounter from './VisitorCounter';

const Footer = () => {
  return (
    <footer className="bg-lapis text-stonepage border-t-2 border-carnelian">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="font-serif text-xl text-ember mb-1">Rituraj Verma</p>
            <p className="text-stonepage/70 text-base">
              Author of the Raghav Kartikeya series
            </p>
          </div>
          <Link
            to="/privacy"
            className="text-stonepage/90 hover:text-ember transition-colors underline underline-offset-4 min-h-[44px] flex items-center"
          >
            Privacy policy
          </Link>
        </div>
        <VisitorCounter />
        <p className="text-stonepage/60 text-base mt-6">
          As an Amazon Associate I earn from qualifying purchases.
        </p>
        <p className="text-stonepage/60 text-base mt-10 pt-6 border-t border-stonepage/20">
          © 2026 Rituraj Verma. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
