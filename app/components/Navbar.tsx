'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Facebook, Twitter } from 'lucide-react';
import { gsap } from 'gsap';
import { FlipLink } from './ui/flip-links';

const Navbar = ({ activePath }: { activePath?: string }) => {
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
  const isInitialMount = useRef(true);

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
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isMenuOpen) {
      // Creative entrance animation - scale and rotate from center
      gsap.fromTo(menuRef.current,
        {
          opacity: 0,
          pointerEvents: "none",
          x: "100%"
        },
        {
          x: "0%",
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.5,
          ease: "power3.out"
        }
      );

      // Hamburger to X animation
      gsap.to(line1Ref.current, { rotation: 45, y: 8, duration: 0.3, ease: "power2.out" });
      gsap.to(line2Ref.current, { opacity: 0, scale: 0, duration: 0.2 });
      gsap.to(line3Ref.current, { rotation: -45, y: -8, duration: 0.3, ease: "power2.out" });

      // Animate nav heading
      const heading = menuRef.current?.querySelector('.menu-heading');
      if (heading) {
        gsap.fromTo(heading,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
        );
      }

      // Animate nav links
      const navLinks = menuRef.current?.querySelectorAll('.menu-nav-link');
      if (navLinks) {
        gsap.fromTo(navLinks,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.2
          }
        );
      }

      // Animate contact section
      const contactHeading = menuRef.current?.querySelector('.contact-heading');
      const contactItems = menuRef.current?.querySelectorAll('.contact-item');
      if (contactHeading) {
        gsap.fromTo(contactHeading,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", delay: 0.3 }
        );
      }
      if (contactItems) {
        gsap.fromTo(contactItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.35
          }
        );
      }

      // Animate social icons
      const followHeading = menuRef.current?.querySelector('.follow-heading');
      const socialIcons = menuRef.current?.querySelectorAll('.social-icon-menu');
      if (followHeading) {
        gsap.fromTo(followHeading,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.4 }
        );
      }
      if (socialIcons) {
        gsap.fromTo(socialIcons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.45
          }
        );
      }

      // Animate CTA button
      const bookBtn = menuRef.current?.querySelector('.book-btn-menu');
      if (bookBtn) {
        gsap.fromTo(bookBtn,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.5 }
        );
      }
    } else {
      // Fast exit animation - slide right
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power3.in"
      });

      // Reset hamburger lines
      gsap.to(line1Ref.current, { rotation: 0, y: 0, duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 1, scale: 1, duration: 0.3 });
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
        /* Fonts are now handled globally */
        
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



      {/* Cross Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 w-full text-white px-6 md:px-12 lg:px-20 py-5 flex justify-between items-center z-[100] font-sans tracking-wide transition-all duration-500 
      
        `}
      >

        <Link href="/" className="flex-shrink-0 cursor-pointer group relative block h-14 md:h-16">
          <div
            ref={logoRef}
            className=" md:-top-5 left-0 flex flex-col items-center hover:scale-110 transition-transform duration-300"
          >
            <div className="flex items-center ">
              {/* Main logo image */}
              <div className="group/logo relative z-10 flex flex-col items-center">
                <Image
                  src="/images/logo/CineStar.png"
                  alt="CineStar Events Logo"
                  width={220}
                  height={80}
                  className="h-16 md:h-24 w-auto object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all duration-300 group-hover/logo:drop-shadow-[0_0_25px_rgba(234,179,8,0.6)]"
                  priority
                />
              </div>
            </div>



            {/* Glow background on hover */}
            {/* <div className="absolute -inset-6 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300 blur" /> */}
          </div>
        </Link>

        {/* DESKTOP NAVIGATION - Hidden on mobile */}


        {/* RIGHT SECTION - Book Tickets + Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Book Tickets Button - Hidden on mobile */}


          {/* MENU TOGGLE */}
          <button
            ref={menuButtonRef}
            className="text-white menu-button-glow z-[110] relative group cursor-pointer"
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
        </div>
      </nav>

      {/* Sidebar Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 w-full h-screen bg-gradient-to-b from-black/98 via-black/95 to-black/98 backdrop-blur-xl z-[105] border-l border-yellow-500/30 flex flex-col md:flex-row overflow-y-auto md:overflow-y-visible opacity-0 pointer-events-none translate-x-full"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-yellow-400 hover:text-yellow-300 transition-colors z-[110]"
        >
          <X size={32} />
        </button>

        {/* LEFT SECTION - Navigation */}
        <div className="w-full md:w-1/2 flex flex-col pt-32 md:pt-16 px-8 md:px-12 py-12 border-b md:border-b-0 md:border-r border-yellow-500/20">

          {/* Menu Logo/Branding */}
          <div className="menu-heading mb-16 md:mb-20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
            </div>
            <h2 className="text-white text-3xl md:text-4xl font-sans font-bold uppercase tracking-widest">
              Menu
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-8 flex-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                onClick={() => setIsMenuOpen(false)}
                className="menu-nav-link group block relative overflow-hidden cursor-pointer"
              >
                <FlipLink
                  href={link.href}
                >
                  {link.name}
                </FlipLink>
              </div>
            ))}
          </nav>

          {/* Mobile Social Links */}
          <div className="md:hidden border-t border-yellow-500/20 pt-8 mt-12">
            <h4 className="social-icon-menu text-yellow-400 text-sm uppercase tracking-widest font-bold mb-6">Follow Us</h4>
            <div className="flex items-center gap-6">
              {socialtLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="social-icon-menu text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                  >
                    <IconComponent size={28} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - Contact & Info (Hidden on mobile) */}
        <div className="hidden md:flex w-1/2 flex-col px-12 pt-16 pb-12 justify-between">

          {/* Contact Information */}
          <div>
            <h3 className="contact-heading text-white text-2xl font-sans font-bold uppercase tracking-widest mb-12">
              Contact<span className="block text-yellow-400">Information</span>
            </h3>

            <div className="space-y-10">
              {/* Phone */}
              <a href="tel:+61885569364" className="contact-item flex items-start gap-4 group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="text-yellow-400 mt-1 group-hover:scale-110 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Phone</p>
                  <p className="text-white text-lg group-hover:text-yellow-400 transition-colors">+61 8 8569 3645</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:info@cinestarevents.com.au" className="contact-item flex items-start gap-4 group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="text-yellow-400 mt-1 group-hover:scale-110 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Email</p>
                  <p className="text-white text-lg group-hover:text-yellow-400 transition-colors">info@cinestarevents.com.au</p>
                </div>
              </a>

              {/* Address */}
              <a href="https://maps.google.com" className="contact-item flex items-start gap-4 group cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="text-yellow-400 mt-1 group-hover:scale-110 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Address</p>
                  <p className="text-white text-lg group-hover:text-yellow-400 transition-colors">Sydney, Australia</p>
                </div>
              </a>
            </div>
          </div>

          {/* Follow Us & Button */}
          <div className="space-y-8">
            <div>
              <h4 className="follow-heading text-white text-xl font-sans font-bold uppercase tracking-widest mb-8">Follow Us</h4>
              <div className="flex items-center gap-10">
                {socialtLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className="social-icon-menu group text-yellow-400 hover:text-yellow-200 transition-all duration-300"
                      title={link.name}
                    >
                      <IconComponent size={36} className="group-hover:scale-125 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <button className="book-btn-menu w-full px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-sans font-bold uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/50 text-lg">
                Book an Event →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95] transition-opacity duration-300"
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
