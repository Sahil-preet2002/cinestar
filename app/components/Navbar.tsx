'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('HOME');

  const navLinks = [
    { name: 'HOME', hasStar: true },
    { name: 'ABOUT', hasStar: false },
    { name: 'EVENTS', hasStar: false },
    { name: 'GALLERY', hasDropdown: true },
    { name: 'CONTACT', hasStar: false },
  ];

  return (
    <>
      {/* Font & Animation Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shine {
          background-size: 200% auto;
          animation: shine 4s linear infinite;
        }
      `}</style>

      {/* Navbar Container */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md text-white px-6 md:px-12 lg:px-20 py-5 flex justify-between items-center z-50 font-oswald tracking-wide border-b border-white/10 shadow-lg">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex-shrink-0 cursor-pointer group" onClick={() => setActiveLink('HOME')}>
          <div className="relative flex flex-col items-center">
             <div className="flex items-center">
                {/* Left Stars */}
                <div className="flex flex-col justify-end mr-1 pb-1 space-y-0.5">
                   <StarIcon size={6} className="text-yellow-500 fill-current animate-pulse" />
                   <StarIcon size={4} className="text-yellow-600 fill-current ml-2" />
                </div>
                
                {/* Main Text */}
                <h1 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">
                  <span className="bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent drop-shadow-sm">Cine</span>
                  <span className="text-white mx-1 drop-shadow-md">|</span> 
                  <span className="bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent drop-shadow-sm">Star</span>
                </h1>

                {/* Right Stars */}
                <div className="flex flex-col justify-end ml-1 pb-1 space-y-0.5">
                   <StarIcon size={6} className="text-yellow-500 fill-current" />
                   <StarIcon size={4} className="text-yellow-600 fill-current mr-2" />
                </div>
             </div>
             <span className="text-[10px] md:text-xs tracking-[0.4em] text-white uppercase font-light mt-1">Events</span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <ul className="hidden md:flex items-end space-x-8 lg:space-x-12 pt-4">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group flex flex-col items-center">
              
              {/* Gold Star for Active/Hover State */}
              <div className={`absolute -top-6 transition-all duration-300 ${activeLink === link.name ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-0 group-hover:opacity-100 group-hover:scale-100'}`}>
                <StarIcon size={16} className="text-yellow-500 fill-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
              </div>

              {/* Link Text */}
              <Link 
                href={link.name === 'HOME' ? '/' : `/${link.name.toLowerCase()}`}
                onClick={() => setActiveLink(link.name)}
                className={`flex items-center text-lg font-medium transition-colors duration-300 ${
                  activeLink === link.name ? 'text-white' : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown className="ml-1 w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden text-white hover:text-yellow-500 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-gray-800 md:hidden flex flex-col items-center py-6 space-y-6 animate-in slide-in-from-top-5 duration-300 shadow-2xl z-50">
             {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.name === 'HOME' ? '/' : `/${link.name.toLowerCase()}`}
                  onClick={() => {
                    setActiveLink(link.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-xl font-medium tracking-wider ${activeLink === link.name ? 'text-yellow-500' : 'text-white'}`}
                >
                  {link.name}
                </Link>
             ))}
          </div>
        )}
      </nav>
    </>
  );
};

// --- HELPER ICONS ---
const StarIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className}
    stroke="currentColor"
    strokeWidth="0"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default Navbar;
