"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EventArtist } from "@/lib/events-data";

export default function EventDetailClient({ event }: { event: EventArtist }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const handlePlayVideo = () => {
        setIsVideoPlaying(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <article className="w-full relative overflow-hidden font-sans border-t flex flex-col items-center">
            {/* --- Hero Banner --- */}
            <div ref={heroRef} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{ y: heroY, opacity: heroOpacity }}
                >
                    <Image
                        src={event.imgSrc}
                        alt={event.name}
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    {/* Cinematic overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050000] via-[#050000]/60 to-transparent" />
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-24 pb-16 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block px-4 py-1 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 bg-black/40 backdrop-blur-sm">
                            {event.date} • {event.location}
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-[#FFF5C3] to-[#D4AF37] drop-shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                            {event.name}
                        </h1>
                        <p className="mt-4 text-xl md:text-3xl font-serif italic text-white/80 max-w-3xl">
                            {event.tagline}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="relative w-full max-w-[1200px] mx-auto z-20 px-6 md:px-12 py-16 flex flex-col md:flex-row gap-16 items-start">

                {/* Left Col: Details */}
                <div className="flex-1 order-2 md:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold uppercase text-[#D4AF37] mb-6 tracking-widest border-b border-[#D4AF37]/20 pb-4">
                            Event Details
                        </h2>
                        <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                            {event.desc}
                        </p>

                        <div className="space-y-4 mb-12">
                            {event.highlights.map((hlt, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
                                    <span className="text-white font-bold uppercase tracking-widest text-sm">{hlt}</span>
                                </div>
                            ))}
                        </div>

                        <button className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#8C7320] text-black font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300">
                            Book Tickets Now
                        </button>
                    </motion.div>
                </div>

                {/* Right Col: Video / Decor (Order 1 on mobile to show video first if available) */}
                <div className="w-full md:w-5/12 order-1 md:order-2">
                    {event.videoUrl ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full aspect-[9/16] md:aspect-square lg:aspect-video rounded-sm overflow-hidden border-[3px] border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.2)] bg-black group"
                        >
                            {!isVideoPlaying ? (
                                <>
                                    <Image
                                        src={event.imgSrc}
                                        alt="Video Thumbnail"
                                        fill
                                        className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#800000]/20 mix-blend-overlay" />
                                    <button
                                        onClick={handlePlayVideo}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#D4AF37]/20 backdrop-blur-md border border-[#D4AF37] flex items-center justify-center hover:scale-110 hover:bg-[#D4AF37] transition-all duration-300 group/btn z-10"
                                    >
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white group-hover/btn:border-l-black border-b-[10px] border-b-transparent ml-2 transition-colors duration-300" />
                                    </button>
                                </>
                            ) : (
                                <video
                                    ref={videoRef}
                                    src={event.videoUrl}
                                    controls
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </motion.div>
                    ) : (
                        // Fallback decor if no video
                        <motion.div
                            initial={{ opacity: 0, rotate: 5 }}
                            whileInView={{ opacity: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            className="relative w-full aspect-[3/4] p-4 border border-[#D4AF37]/20 bg-white/5 backdrop-blur-sm shadow-2xl skew-y-2 transform origin-bottom-right hidden md:block"
                        >
                            <div className="relative w-full h-full overflow-hidden border border-[#D4AF37]/40">
                                <Image
                                    src={event.imgSrc}
                                    alt="Poster"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

        </article>
    );
}
