"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
    {
        id: "01",
        year: "Est. 2004",
        title: "THE PIONEERS",
        desc: "At Cinestar Events, we are the pioneers of top quality Bollywood entertainment in Australia, New Zealand and Fiji Islands. Over the years, we have brought a scintillating array of artists from Bollywood to Australia – from young sensations to seasoned performers, rising stars to living legends. Each concert has been a huge success with great memories for both the artist and the public.",
        image: "https://images.unsplash.com/photo-1507676385008-e7fb562d11f8?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: "02",
        year: "MUMBAI ROOTS",
        title: "BOLLYWOOD ORIGINS",
        desc: "Our association with Bollywood started in Mumbai. Learning the ropes of the entertainment industry during 11 years involved sound recording, video production and music marketing. As owner of 'The Tune' – one of the most successful digital sound recording studios in Mumbai in the late 90s - we have been closely associated with the biggest entertainers.",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: "03",
        year: "THE VISION",
        title: "REDEFINING QUALITY",
        desc: "After coming to Australia, we saw the opportunity to provide professional quality entertainment. The concert scene was way below international standards. Thanks to training in Bollywood and a great team of professionals locally, we have redefined concert entertainment in the South Pacific Region.",
        image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: "04",
        year: "LEGACY",
        title: "TRACK RECORD",
        desc: "Today, Cinestar Events boasts of an enviable track record in hosting memorable concerts featuring superstars such as Asha Bhosle, Jagjit Singh, Sonu Nigam, Pankaj Udhas, Gurdas Mann, Johnnie Lever and many more. We will continue to bring more memorable Bollywood shows to our audience.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
        link: "Read Yogesh Sharma's Profile"
    },
    {
        id: "∞",
        year: "FUTURE",
        title: "THE STORY CONTINUES",
        desc: "We are constantly evolving, dreaming bigger, and reaching further. This is just the beginning of our legacy. Join us as we write the next chapter of entertainment history.",
        image: "https://images.unsplash.com/photo-1765990153176-582ca8808384?q=80&w=2000&auto=format&fit=crop",
    },
];

const AboutSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const mm = gsap.matchMedia();

            // Desktop: Horizontal Scroll
            mm.add("(min-width: 768px)", () => {
                const getScrollAmount = () => {
                    const totalWidth = sectionRef.current?.scrollWidth || 0;
                    const windowWidth = window.innerWidth;
                    // reduce slightly to avoid any rounding error gaps
                    return -(totalWidth - windowWidth);
                };

                const tween = gsap.to(sectionRef.current, {
                    x: getScrollAmount,
                    ease: "none",
                });

                ScrollTrigger.create({
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount())}`,
                    pin: true,
                    animation: tween,
                    scrub: 1,
                    invalidateOnRefresh: true,
                });
            });
            // Mobile: Vertical Fade
            mm.add("(max-width: 767px)", () => {
                const panels = document.querySelectorAll(".timeline-panel");
                panels.forEach(panel => {
                    gsap.fromTo(panel,
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 85%"
                            }
                        }
                    );
                });
            });

        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-[#050505] overflow-x-hidden">

            <div ref={triggerRef} className="relative h-auto md:h-screen flex flex-col md:block overflow-hidden">

                <div
                    ref={sectionRef}
                    className="flex flex-col md:flex-row h-auto md:h-full w-full md:w-fit"
                >
                    {/* Intro Panel */}
                    <div className="timeline-panel w-full md:w-[50vw] h-screen md:h-full flex-shrink-0 flex flex-col justify-center px-6 md:px-20 relative bg-[#050505] border-r border-[#D4AF37]/10 z-10">
                        <div className="inline-block border border-[#D4AF37] rounded-full px-4 py-1 mb-6 w-fit">
                            {/* <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold">Cinestar Events</span> */}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-sans text-white leading-tight mb-8">
                            AUSTRALIA <br /> DESERVES <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFF5C3]">THE BEST</span>
                        </h1>
                        <p className="text-white/60 font-sans max-w-md text-lg leading-relaxed">
                            Experience the pioneer of Bollywood entertainment in Australia, New Zealand, and Fiji.
                        </p>
                        <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-4 animate-pulse">
                            <span className="text-xs uppercase tracking-widest text-[#D4AF37]">Scroll Content</span>
                            <ArrowRight className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                    </div>

                    {/* Content Panels */}
                    {timelineData.map((item, index) => (
                        <div
                            key={item.id}
                            className="timeline-panel w-full md:w-[60vw] h-screen md:h-full flex-shrink-0 relative group border-t md:border-t-0 md:border-l border-[#D4AF37]/10 overflow-hidden bg-[#080808]"
                        >
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />
                                <div className="absolute inset-0 bg-black/40" />
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16">
                                <span className="text-[#D4AF37] text-lg font-bold font-sans mb-2 block">
                                    {item.year}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black font-sans text-white mb-6 uppercase">
                                    {item.title}
                                </h2>
                                <div className="w-20 h-[2px] bg-[#D4AF37] mb-8" />
                                <p className="text-base md:text-lg text-white/80 font-sans leading-relaxed max-w-xl">
                                    {item.desc}
                                </p>

                                {item.link && (
                                    <a href="#" className="mt-10 inline-flex items-center gap-3 text-[#D4AF37] hover:text-white transition-colors duration-300 uppercase tracking-widest text-xs font-bold border border-[#D4AF37] px-6 py-3 hover:bg-[#D4AF37]/10">
                                        {item.link} <ArrowRight className="w-4 h-4" />
                                    </a>
                                )}

                                <div className="absolute bottom-8 right-8 text-[8rem] font-black text-white/5 font-sans select-none pointer-events-none leading-none">
                                    {item.id}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default AboutSection;
