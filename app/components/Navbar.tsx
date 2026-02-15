'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { FlipLink } from './ui/flip-links';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'EVENTS', href: '/events' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'CONTACT', href: '/contact' },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "power2.out" });
      gsap.to(line1Ref.current, { rotation: 45, y: 8, duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 0, duration: 0.3 });
      gsap.to(line3Ref.current, { rotation: -45, y: -8, duration: 0.3 });
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.5, ease: "power2.out" });
      gsap.to(line1Ref.current, { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 1, duration: 0.3 });
      gsap.to(line3Ref.current, { rotation: 0, y: 0, duration: 0.3 });
    }
  }, [isMenuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Cross Navbar */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md text-white px-6 md:px-12 lg:px-20 py-5 flex justify-between items-center z-50 font-oswald tracking-wide border-b border-white/10 shadow-lg">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex-shrink-0 cursor-pointer group">
          <div className="relative flex flex-col items-center">
             <div className="flex items-center">
                <div className="flex flex-col justify-end mr-1 pb-1 space-y-0.5">
                   <StarIcon size={6} className="text-yellow-500 fill-current animate-pulse" />
                   <StarIcon size={4} className="text-yellow-600 fill-current ml-2" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">
                  <span className="bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent drop-shadow-sm">Cine</span>
                  <span className="text-white mx-1 drop-shadow-md">|</span> 
                  <span className="bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent drop-shadow-sm">Star</span>
                </h1>

                <div className="flex flex-col justify-end ml-1 pb-1 space-y-0.5">
                   <StarIcon size={6} className="text-yellow-500 fill-current" />
                   <StarIcon size={4} className="text-yellow-600 fill-current mr-2" />
                </div>
             </div>
             <span className="text-[10px] md:text-xs tracking-[0.4em] text-white uppercase font-light mt-1">Events</span>
          </div>
        </Link>

        {/* MENU TOGGLE */}
        <button 
          ref={menuButtonRef}
          className="text-white hover:text-yellow-500 transition-colors cursor-pointer z-60"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-8 h-6 flex flex-col justify-between">
            <div ref={line1Ref} className="w-full h-0.5 bg-current origin-center"></div>
            <div ref={line2Ref} className="w-full h-0.5 bg-current"></div>
            <div ref={line3Ref} className="w-full h-0.5 bg-current origin-center"></div>
          </div>
        </button>
      </nav>

      {/* Sidebar Menu */}
      <div 
        ref={menuRef}
        className="fixed top-0 right-0 w-full md:w-96 h-screen bg-black/95 backdrop-blur-md z-40 transform translate-x-full"
      >
        <div className="flex flex-col justify-center items-center h-full space-y-8 px-8">
          {navLinks.map((link) => (
            <FlipLink 
              key={link.name} 
              href={link.href}
            >
              {link.name}
            </FlipLink>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

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
