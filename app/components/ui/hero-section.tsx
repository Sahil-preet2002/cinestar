"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor Logic
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && followerRef.current) {
        gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(followerRef.current, { x: e.clientX - 15, y: e.clientY - 15, duration: 0.3 });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.to(".image-mask", { clipPath: "inset(0 0 0 0)", duration: 2, ease: "power4.inOut" })
      .to("#main-img", { scale: 1, duration: 2 }, "-=2")
      .to(".line-inner", { translateY: 0, stagger: 0.2, duration: 1.5 }, "-=1.5")
      .to(".hero-line", { width: 60, duration: 1 }, "-=1.5")
      .to(".tagline", { opacity: 1, x: 0, duration: 1 }, "-=1.3")
      .to(".content-reveal p", { opacity: 1, y: 0, stagger: 0.2, duration: 1.2 }, "-=1")
      .to(".cta-anim, .sig-anim, .scroll-indicator", { opacity: 1, y: 0, duration: 1 }, "-=0.8")
      .to(".label-anim, .accent-anim", { opacity: 0.6, duration: 1 }, "-=1");

    // Kinetic Typography Loop
    gsap.to(".marquee-left", {
      xPercent: -50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
    gsap.to(".marquee-right", {
      xPercent: 50,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Magnetic Interaction
    const magneticElements = document.querySelectorAll('.magnetic-wrap');
    magneticElements.forEach(el => {
      const element = el as HTMLElement;
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(element, { x: x * 0.3, y: y * 0.3, duration: 0.4 });
      });
      element.addEventListener('mouseleave', () => {
        gsap.to(element, { x: 0, y: 0, duration: 0.4 });
      });
    });

    // Parallax Tilt for Portrait
    const handleParallax = (e: MouseEvent) => {
      const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(".image-mask", {
        rotationY: xVal * 5,
        rotationX: -yVal * 5,
        duration: 1.5
      });
    };

    document.addEventListener('mousemove', handleParallax);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleParallax);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap');
        
        :root {
          --primary-gold: #d4af37;
          --bg-obsidian: #050505;
        }
        
        .font-display { font-family: 'Syncopate', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }

        .bg-text-outline {
          -webkit-text-stroke: 1px rgba(212, 175, 55, 0.15);
          color: transparent;
          font-size: 15vw;
          white-space: nowrap;
          line-height: 0.8;
          pointer-events: none;
        }

        .image-mask {
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .hero-cursor {
          width: 10px;
          height: 10px;
          background: var(--primary-gold);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 10000;
          mix-blend-mode: difference;
        }
        .hero-cursor-follower {
          width: 40px;
          height: 40px;
          border: 1px solid var(--primary-gold);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease-out;
        }

        .noise {
          position: fixed;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: url('https://grainy-gradients.vercel.app/noise.svg');
          opacity: 0.08;
          pointer-events: none;
          z-index: 999;
          animation: noise-anim 0.2s infinite;
        }
        @keyframes noise-anim {
          0% { transform: translate(0,0) }
          10% { transform: translate(-1%,-1%) }
          20% { transform: translate(1%,1%) }
          30% { transform: translate(-2%,0) }
          40% { transform: translate(1%,2%) }
          50% { transform: translate(-1%,-2%) }
          60% { transform: translate(2%,1%) }
          70% { transform: translate(0,-1%) }
          80% { transform: translate(1%,0) }
          90% { transform: translate(-1%,1%) }
          100% { transform: translate(0,0) }
        }

        .line-mask {
          overflow: hidden;
          display: block;
        }
        .line-inner {
          display: block;
          transform: translateY(100%);
        }

        .magnetic-wrap {
          display: inline-block;
          position: relative;
        }
      `}</style>

      <div ref={cursorRef} className="hero-cursor"></div>
      <div ref={followerRef} className="hero-cursor-follower"></div>
      <div className="noise"></div>

      <main ref={heroRef} className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#050505] text-white font-['Inter']">

        {/* Large Kinetic Background */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-0">
          <div className="bg-text-outline font-display marquee-left">YOGESH SHARMA YOGESH SHARMA</div>
          <div className="bg-text-outline font-display marquee-right ml-[-20%]">LEGENDARY MOMENTS LEGENDARY</div>
        </div>

        <div className="container mx-auto px-6 lg:px-20 relative z-10 grid grid-cols-12 gap-4 items-center py-20 md:py-32">

          {/* PORTRAIT: Editorial Style */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative w-full max-w-lg mx-auto lg:mx-0">
              {/* Subtle Label */}
              <div className="absolute -top-10 left-0 text-[10px] tracking-[0.8em] uppercase text-[#d4af37] opacity-60 label-anim">
                Executive Director
              </div>

              <div className="image-mask shadow-2xl overflow-hidden aspect-[4/5] relative">
                <img src="/images/yogesh.jpeg"
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000 transform scale-110"
                  alt="Yogesh Sharma" id="main-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>

              {/* Floating Gold Accent */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-[#d4af37] opacity-50 accent-anim"></div>
            </div>
          </div>

          {/* CONTENT: Radical Layout */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 pl-0 lg:pl-16 mb-12 lg:mb-0">
            <div className="space-y-12">
              <header>
                <div className="line-mask">
                  <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter line-inner">
                    YOGESH
                  </h1>
                </div>
                <div className="line-mask -mt-2 md:-mt-6">
                  <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter line-inner italic text-[#d4af37]">
                    SHARMA
                  </h1>
                </div>
                <div className="mt-8 flex items-center gap-6 overflow-hidden">
                  <div className="w-12 h-[1px] bg-[#d4af37] hero-line"></div>
                  <p className="text-[11px] tracking-[0.6em] uppercase font-black text-gray-500 tagline">
                    Australia • New Zealand • Bollywood
                  </p>
                </div>
              </header>

              <div className="max-w-lg space-y-6 text-gray-400 font-light text-lg leading-relaxed content-reveal">
                <p className="opacity-0 translate-y-10">
                  Entertainment is <span className="text-white italic">serious business</span>. It is the alchemy of connecting legendary talent with the souls who admire them most.
                </p>
                <p className="opacity-0 translate-y-10">
                  For 20 years, we haven't just booked venues; we've curated <span className="text-white">cultural milestones</span>. From the heart of Bollywood to the stages of the South Pacific, the vision remains singular: Professional excellence with a personal touch.
                </p>
              </div>

              <div className="flex items-end gap-10 pt-4">
                <div className="magnetic-wrap cta-anim opacity-0">
                  <a href="#" className="group relative inline-flex items-center gap-4 px-10 py-5 border border-[#d4af37]/30 hover:border-[#d4af37] transition-colors overflow-hidden">
                    <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                    <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase font-bold group-hover:text-black transition-colors">Enter The Show</span>
                    <svg className="relative z-10 w-4 h-4 group-hover:text-black group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                </div>

                <div className="hidden md:block pb-2 opacity-0 sig-anim">
                  <div className="font-serif italic text-4xl text-white opacity-40">Yogesh Sharma</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-4 opacity-0 scroll-indicator">
          <span className="text-[8px] uppercase tracking-[1em] rotate-90 mb-8 origin-center">Scroll</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
        </div>
      </main>
    </>
  );
};