'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const artists = [
    { top: "RAHAT", bottom: "FATEH ALI", tour: "The Legacy Tour", loc: "Quayside Arena, Sydney", img: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Rahat_Fateh_Ali_Khan.jpg", bgPos: "center 0%" },
    { top: "ARIJIT", bottom: "SINGH", tour: "Symphony of Soul", loc: "O2 Arena, London", img: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Arijit_Singh_performance_at_Chandigarh_2025.jpg", bgPos: "center 0%" },
    { top: "KUMAR", bottom: "SANU", tour: "90s King Live", loc: "Madison Square, NY", img: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Kumar_Sanu_at_colors_indian_telly_awards.jpg", bgPos: "center 0%" },
    { top: "KAPIL", bottom: "SHARMA", tour: "Comedy Gold", loc: "The Forum, LA", img: "https://upload.wikimedia.org/wikipedia/commons/3/33/The-great-Indian-Kapil-show-press-conference-10.jpg", bgPos: "center 5%" },
    { top: "SALMAN", bottom: "KHAN", tour: "Da-Bangg Tour", loc: "Dubai Parks, DXB", img: "https://upload.wikimedia.org/wikipedia/commons/9/95/Salman_Khan_in_2023_%281%29_%28cropped%29.jpg", bgPos: "center 10%" },
    { top: "ASHA", bottom: "BHOSLE", tour: "Eternal Voice", loc: "Esplanade, Singapore", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ashaji.jpg/1280px-Ashaji.jpg", bgPos: "center 0%" }
];

export default function ArtistShowcase() {
    const [current, setCurrent] = useState(0);
    const isAnimating = useRef(false);

    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const glow1Ref = useRef<HTMLDivElement>(null);
    const glow2Ref = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const bgContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo("#a-name-top", { y: -80, opacity: 0 }, { y: 0, opacity: 0.2, duration: 1, ease: "expo.out", delay: 0.5 });
        tl.fromTo("#a-name-bottom", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.8");
        tl.fromTo("#a-tour", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" }, "-=0.6");

        const handleMouseMove = (e: MouseEvent) => {
            const isTouch = window.matchMedia("(hover: none)").matches;
            if (!isTouch) {
                gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
                gsap.to(followerRef.current, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3 });
                gsap.to(glow1Ref.current, { x: e.clientX * 0.05, y: e.clientY * 0.05, duration: 2 });
                gsap.to(glow2Ref.current, { x: -e.clientX * 0.05, y: -e.clientY * 0.05, duration: 2 });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const activeTab = navRef.current?.querySelector('.tab-item.active') as HTMLElement;
        if (activeTab && indicatorRef.current) {
            gsap.to(indicatorRef.current, {
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth,
                duration: 0.6,
                ease: "elastic.out(1, 0.8)"
            });

            const scrollPos = activeTab.offsetLeft - (navRef.current!.offsetWidth / 2) + (activeTab.offsetWidth / 2);
            gsap.to(navRef.current!, { scrollLeft: scrollPos, duration: 0.6, ease: "power2.out" });
        }
    }, [current]);

    const switchArtist = (index: number) => {
        if (index === current || isAnimating.current) return;
        isAnimating.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating.current = false;
            }
        });

        tl.to("#a-name-top, #a-name-bottom, #a-tour", {
            y: 50,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => setCurrent(index)
        });

        tl.fromTo("#a-name-top", { y: -80, opacity: 0 }, { y: 0, opacity: 0.2, duration: 1, ease: "expo.out" });
        tl.fromTo("#a-name-bottom", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out" }, "-=0.8");
        tl.fromTo("#a-tour", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" }, "-=0.6");
    };

    const handleNavMove = (e: React.MouseEvent) => {
        if (window.matchMedia("(hover: hover)").matches) {
            const rect = navRef.current!.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(navRef.current!, { x: x * 0.05, y: y * 0.05, duration: 0.5 });
        }
    };

    const handleNavLeave = () => {
        gsap.to(navRef.current!, { x: 0, y: 0, duration: 0.5 });
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-between py-6 md:py-10 bg-[#080808] text-white relative overflow-x-hidden md:overflow-hidden select-none">

            <style dangerouslySetInnerHTML={{
                __html: `
        /* Font overrides removed */
        .artist-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          filter: brightness(0.4);
          z-index: 1;
          clip-path: circle(0% at 50% 50%);
          transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .artist-bg.active { clip-path: circle(150% at 50% 50%); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .artist-title {
          font-size: clamp(2.2rem, 11vw, 7.5rem);
          line-height: 0.9;
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        @media (hover: hover) and (pointer: fine) {

        }
      `}} />


            <div ref={bgContainerRef} className="absolute inset-0 z-0">
                {artists.map((artist, i) => (
                    <div
                        key={i}
                        className={`artist-bg ${current === i ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url(${artist.img})`,
                            backgroundPosition: artist.bgPos || "center 15%"
                        }}
                    />
                ))}
            </div>

            <div ref={glow1Ref} className="absolute w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] top-[-10%] left-[-10%] z-[2] pointer-events-none" />
            <div ref={glow2Ref} className="absolute w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,rgba(0,0,0,0)_70%)] bottom-[-10%] right-[-10%] z-[2] pointer-events-none" />

            <nav className="relative z-50 w-full px-6 md:px-12 flex-shrink-0 flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2 md:space-x-4">
                    <div className="h-px w-8 md:w-12 bg-[#D4AF37]" />
                    <span className="text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase opacity-50">CineStar Events</span>
                </div>
                <h1 className="marcellus text-lg md:text-2xl tracking-[0.2em]">PLATINUM</h1>
            </nav>

            <div ref={contentRef} className="relative z-10 text-center px-4 flex-grow flex flex-col justify-center w-full max-w-7xl py-10 md:py-0">
                <div className="overflow-hidden">
                    <h2 id="a-name-top" className="artist-title uppercase opacity-20 transition-colors duration-500">
                        {artists[current].top}
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <h2 id="a-name-bottom" className="artist-title uppercase text-white">
                        {artists[current].bottom}
                    </h2>
                </div>
                <p id="a-tour" className="marcellus text-lg md:text-3xl mt-2 md:mt-2 text-[#D4AF37] italic">
                    {artists[current].tour}
                </p>
            </div>

            <div className="relative z-50 w-full max-w-5xl px-4 md:px-6 flex-shrink-0 mt-4">
                <div
                    ref={navRef}
                    onMouseMove={handleNavMove}
                    onMouseLeave={handleNavLeave}
                    className="glass-nav flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar relative w-full mb-6 bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-full p-1"
                >
                    {artists.map((artist, i) => (
                        <div
                            key={i}
                            onClick={() => switchArtist(i)}
                            className={`tab-item relative z-[2] px-[18px] py-[10px] md:px-[24px] md:py-[12px] text-[0.65rem] md:text-[0.75rem] font-bold tracking-[1.5px] uppercase cursor-pointer transition-colors duration-500 whitespace-nowrap ${current === i ? 'active text-[#080808]' : 'text-white/50'}`}
                        >
                            {artist.top === "RAHAT" ? "RFAK" : `${artist.top} ${artist.bottom}`}
                        </div>
                    ))}
                    <div ref={indicatorRef} id="tab-indicator" className="absolute top-[4px] left-[4px] h-[calc(100%-8px)] bg-[#D4AF37] rounded-full z-[1] pointer-events-none" />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center md:items-end space-y-4 md:space-y-0 pb-4">
                    <div className="text-center md:text-left">
                        <p className="text-[9px] md:text-[10px] tracking-widest opacity-40 uppercase mb-1">Location</p>
                        <p className="text-xs md:text-sm font-bold">{artists[current].loc}</p>
                    </div>

                    <div className="flex space-x-6 md:space-x-8">
                        <button className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] border-b border-[#D4AF37] pb-1 transition-all hover:text-[#D4AF37]">Gallery</button>
                        {/* <button className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] border-b border-white/20 pb-1 transition-all hover:border-white">About Tour</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}