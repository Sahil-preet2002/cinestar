"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { eventArtists } from "@/lib/events-data";

export const EventsSection = () => {
    return (
        <section className="relative w-full bg-[#050000] text-[#F5F5F7] min-h-screen pb-24 font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden border-t-[4px] border-[#D4AF37]">
            {/* Grand Premiere Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-[radial-gradient(ellipse_at_top,_#D4AF3715_0%,_#80000010_40%,_transparent_70%)]" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] mix-blend-overlay" />
            </div>

            {/* Header / Title */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-block border-y-2 border-[#D4AF37] py-2 mb-8">
                        <span className="text-[#D4AF37] text-sm md:text-base font-bold tracking-[0.4em] uppercase px-8">
                            Star Cast & Upcoming Shows
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter drop-shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                        Grand <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C3] via-[#D4AF37] to-[#8C7320]">Premiere</span>
                    </h2>
                    <p className="mt-6 text-white/60 max-w-2xl mx-auto font-serif italic md:text-xl">
                        Experience the grandeur of Indian cinema and legendary live performances. Don't miss the biggest blockbuster events of the year.
                    </p>
                </motion.div>
            </div>

            {/* "Movie Poster" Grid */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {eventArtists.map((artist, index) => (
                    <motion.div
                        key={artist.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                        className="group relative"
                    >
                        <Link href={`/events/${artist.id}`} className="block w-full outline-none">
                            {/* Poster Frame */}
                            <div className="relative w-full aspect-[2/3] md:aspect-[3/4] rounded-sm overflow-hidden border-[3px] border-[#D4AF37]/30 group-hover:border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_rgba(212,175,55,0.15)] bg-[#111]">

                                {/* Inner gold rim */}
                                <div className="absolute inset-2 border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 z-20 pointer-events-none transition-colors duration-500" />

                                <Image
                                    src={artist.imgSrc}
                                    alt={artist.name}
                                    fill
                                    className="object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />

                                {/* Red cinematic gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0000] via-[#800000]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-10" />

                                {/* Content at the bottom of the poster */}
                                <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
                                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#D4AF37] uppercase tracking-tight mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {artist.name}
                                    </h3>
                                    <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                                        {artist.date} | {artist.location}
                                    </p>

                                    {/* Action Button hidden initially */}
                                    <div className="overflow-hidden mt-2">
                                        <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                            <span className="inline-block px-6 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300">
                                                Book Tickets
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* "Video Included" Badge */}
                                {artist.videoUrl && (
                                    <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-sm border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                                        <span className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                                            Video Trailer
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>


        </section>
    );
};

export default EventsSection;
