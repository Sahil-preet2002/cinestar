'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Instagram, Facebook, Twitter } from 'lucide-react';
import { gsap } from 'gsap';
import { FlipLink } from './ui/flip-links';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'EVENTS', href: '/events' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const socialtLinks = [
    { name: 'INSTAGRAM', href: '#', icon: Instagram },
    { name: 'FACEBOOK', href: '#', icon: Facebook },
    { name: 'TWITTER', href: '#', icon: Twitter },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.6, ease: "power3.out" });
      gsap.to(line1Ref.current, { rotation: 45, y: 8, duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 0, duration: 0.3 });
      gsap.to(line3Ref.current, { rotation: -45, y: -8, duration: 0.3 });
      
      // Animate menu items
      const menuItems = menuRef.current?.querySelectorAll('a');
      if (menuItems) {
        gsap.fromTo(menuItems, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power3.out" }
        );
      }
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.6, ease: "power3.in" });
      gsap.to(line1Ref.current, { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 1, duration: 0.3 });
      gsap.to(line3Ref.current, { rotation: 0, y: 0, duration: 0.3 });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    // Logo entrance animation on mount
    gsap.fromTo(logoRef.current, 
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // Icon hover animations
  const handleIconHover = (index: number, isHovering: boolean) => {
    const el = iconRefs.current[index];
    if (el) {
      if (isHovering) {
        gsap.to(el, {
          scale: 1.3,
          rotation: 360,
          duration: 0.6,
          ease: "back.out"
        });
      } else {
        gsap.to(el, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        
        @keyframes glow-pulse {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(234, 179, 8, 0.5), 0 0 20px rgba(234, 179, 8, 0.3);
            box-shadow: 0 0 15px rgba(234, 179, 8, 0.2);
          }
          50% { 
            text-shadow: 0 0 20px rgba(234, 179, 8, 0.8), 0 0 30px rgba(234, 179, 8, 0.5);
            box-shadow: 0 0 25px rgba(234, 179, 8, 0.4);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes float-orbit {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(180deg); }
        }
        
        .glow-text {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        
        .nav-hover-line {
          position: relative;
          overflow: hidden;
        }
        
        .nav-hover-line::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #EAB308, transparent);
          box-shadow: 0 0 10px #EAB308;
          transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-hover-line:hover::after {
          width: 100%;
        }
        
        .menu-button-glow {
          transition: all 0.3s ease;
        }
        
        .menu-button-glow:hover {
          text-shadow: 0 0 10px rgba(234, 179, 8, 0.8);
        }
      `}</style>

      {/* Animated background gradient */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 z-49" />

      {/* Cross Navbar */}
      <nav 
        ref={navRef}
        className={`fixed top-0 w-full text-white px-6 md:px-12 lg:px-20 py-5 flex justify-between items-center z-50 font-oswald tracking-wide transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-xl shadow-2xl shadow-yellow-500/10 border-b border-yellow-500/20' 
            : 'bg-black/80 backdrop-blur-md border-b border-white/5'
        }`}
      >
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex-shrink-0 cursor-pointer group relative">
          <div 
            ref={logoRef}
            className="relative flex flex-col items-center hover:scale-110 transition-transform duration-300"
          >
             <div className="flex items-center relative">
                {/* Left stars */}
                <div className="flex flex-col justify-end mr-1 pb-1 space-y-0.5 animate-pulse">
                   <StarIcon size={6} className="text-yellow-500 fill-current" />
                   <StarIcon size={4} className="text-yellow-600 fill-current ml-2" />
                </div>
                
                {/* Main logo text */}
                <div className="group/logo relative">
                  <h1 className="text-4xl md:text-5xl font-bold uppercase leading-none tracking-tighter">
                    <span className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent transition-all duration-300 group-hover/logo:from-yellow-100 group-hover/logo:via-yellow-300 group-hover/logo:to-yellow-500">
                      Cine
                    </span>
                    <span className="text-yellow-400 mx-1 drop-shadow-lg group-hover/logo:text-yellow-300 transition-colors">|</span> 
                    <span className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent transition-all duration-300 group-hover/logo:from-yellow-100 group-hover/logo:via-yellow-300 group-hover/logo:to-yellow-500">
                      Star
                    </span>
                  </h1>
                </div>

                {/* Right stars */}
                <div className="flex flex-col justify-end ml-1 pb-1 space-y-0.5">
                   <StarIcon size={6} className="text-yellow-500 fill-current" />
                   <StarIcon size={4} className="text-yellow-600 fill-current mr-2" />
                </div>
             </div>

             {/* Subtitle with glow effect */}
             <span className="text-[10px] md:text-xs tracking-[0.4em] text-yellow-300 uppercase font-light mt-1 opacity-80 group-hover:opacity-100 group-hover:text-yellow-200 transition-all">
               Events
             </span>

             {/* Glow background on hover */}
             <div className="absolute -inset-6 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300 blur" />
          </div>
        </Link>

        {/* MENU TOGGLE */}
        <button 
          ref={menuButtonRef}
          className="text-white menu-button-glow z-60 relative group cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-8 h-6 flex flex-col justify-between relative">
            <div ref={line1Ref} className="w-full h-0.5 bg-yellow-400 origin-center transition-all"></div>
            <div ref={line2Ref} className="w-full h-0.5 bg-yellow-400"></div>
            <div ref={line3Ref} className="w-full h-0.5 bg-yellow-400 origin-center transition-all"></div>
          </div>
          {/* Glow effect on hover */}
          <div className="absolute -inset-4 bg-yellow-500/20 rounded opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300 blur" />
        </button>
      </nav>

      {/* Sidebar Menu */}
      <div 
        ref={menuRef}
        className="fixed top-0 right-0 w-full md:w-96 h-screen bg-gradient-to-b from-black/98 via-black/95 to-black/98 backdrop-blur-xl z-40 transform translate-x-full border-l border-yellow-500/20 flex flex-col"
      >
        {/* Menu header decoration */}
        <div className="h-24 flex items-center px-8 border-b border-yellow-500/20 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-yellow-400 text-sm tracking-widest">MENU</span>
          </div>
        </div>

        {/* Menu items - expandable */}
        <div className="flex-1 flex flex-col justify-center items-center space-y-12 px-8">
          {navLinks.map((link, index) => (
            <div key={link.name} className="nav-hover-line">
              <FlipLink 
                href={link.href}
              >
                {link.name}
              </FlipLink>
            </div>
          ))}
        </div>

        {/* Social Links at Bottom */}
        <div className="px-8 pb-16 border-t border-yellow-500/20 flex-shrink-0">
          <div className="flex flex-row justify-center items-center space-x-12 pt-8">
            {socialtLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  ref={(el) => {
                    if (el) iconRefs.current[index] = el;
                  }}
                  href={link.href}
                  className="group text-yellow-400 hover:text-yellow-200 transition-all duration-300 relative"
                  onMouseEnter={() => handleIconHover(index, true)}
                  onMouseLeave={() => handleIconHover(index, false)}
                  title={link.name}
                >
                  <IconComponent 
                    size={32} 
                    className="transition-all duration-300 group-hover:drop-shadow-lg group-hover:drop-shadow-yellow-400"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          style={{
            animation: 'fadeIn 0.3s ease-in'
          }}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
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
