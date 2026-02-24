"use client";

import React, { useState } from "react";
import { DynamicFrameLayout, Frame } from "./ui/dynamic-frame-layout";
import { motion, AnimatePresence } from "framer-motion";

// --- Data for SONU NIGAM (Specific Content) ---
const sonuFrames: Frame[] = [
    {
        id: 1,
        type: 'text',
        content: {
            title: "SONU NIGAM",
            desc: "Cinestar Events has a long and rich association with the multi-talented Sonu Nigam – a singer par excellence and a great human being. We have brought Sonu Nigam to Australia, New Zealand and Fiji on two occasions – each concert was a sellout show at every venue."
        },
        defaultPos: { x: 0, y: 0, w: 8, h: 4 }, // Wide text block
    },
    {
        id: 2,
        type: 'image',
        src: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=1000", // Placeholder for Green singing shot
        defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    },
    {
        id: 3,
        type: 'image',
        src: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000", // Red background vibe
        defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    },
    {
        id: 4,
        type: 'text',
        content: {
            title: "THE LEGEND",
            desc: "Offering a heady mix of soulful and masti, phenomenal singing and loads of entertainment, Sonu Nigam is truly a darling of music lovers in Australia and New Zealand. His singing abilities are second to none and his natural flair for connecting with people makes him a one-man entertainment show!"
        },
        defaultPos: { x: 4, y: 4, w: 8, h: 4 },
    },
    {
        id: 5,
        type: 'text',
        content: {
            title: "HE CONQUERED HEARTS",
            desc: "\"He Came, He Dazzled, He Conquered Hearts\""
        },
        defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    },
    {
        id: 6,
        type: 'image',
        src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000", // Blue light singing
        defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    },
    {
        id: 7,
        type: 'video',
        src: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
        defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    },
];

// --- Generic Data Generator for other Artists ---
const generateGenericFrames = (artistName: string): Frame[] => [
    {
        id: 101,
        type: 'image',
        src: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1000",
        defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    },
    {
        id: 102,
        type: 'text',
        content: {
            title: artistName,
            desc: `Experience the magical performance of ${artistName} live in concert. A night of unforgettable melodies and entertainment.`
        },
        defaultPos: { x: 4, y: 0, w: 8, h: 4 },
    },
    {
        id: 103,
        type: 'video',
        src: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
        defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    },
    {
        id: 104,
        type: 'image',
        src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=1000",
        defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    },
    {
        id: 105,
        type: 'image',
        src: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1000",
        defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    },
    {
        id: 106,
        type: 'text',
        content: { title: "Sold Out", desc: "Multiple cities, thousands of fans." },
        defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    },
    {
        id: 107,
        type: 'image',
        src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=1000",
        defaultPos: { x: 4, y: 8, w: 8, h: 4 },
    },
];

const Tabs = [
    "Sonu Nigam",
    "Kapil Sharma",
    "Dabangg Tour",
    "Shreya Ghosal",
    "Jagjit Singh",
    "Adnan Sami",
    "Asha Bhosle",
    "Rahat Fateh Ali Khan",
    "Mika Singh"
];

const EventsSection = () => {
    const [activeTab, setActiveTab] = useState("Sonu Nigam");

    const getActiveFrames = () => {
        if (activeTab === "Sonu Nigam") {
            return sonuFrames;
        }
        return generateGenericFrames(activeTab);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white py-24 px-4 md:px-12 flex flex-col items-center">
            {/* Header with Floating Tabs */}
            <div className="w-full max-w-7xl mb-12 flex flex-col items-center z-10">
                <div className="text-center mb-8">
                    <div className="inline-block border border-[#D4AF37] rounded-full px-4 py-1 mb-6">
                        <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold">
                            Hall of Fame
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black font-sans uppercase">
                        Star <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFF5C3]">Performers</span>
                    </h1>
                </div>

                {/* Glassmorphism Floating Tabs */}
                <div className="relative w-full overflow-x-auto no-scrollbar pb-4 md:pb-0">
                    <div className="flex justify-start md:justify-center items-center gap-2 md:gap-4 px-4 min-w-max">
                        {Tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab
                                        ? "text-black"
                                        : "text-white/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                                    }`}
                            >
                                <span className="relative z-10">{tab}</span>
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTabPill"
                                        className="absolute inset-0 bg-[#D4AF37] rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="w-full max-w-[1600px] mb-20 relative px-2 md:px-0">
                <div className="w-full aspect-square md:aspect-[16/9] lg:aspect-[2.35/1] relative">
                    <div className="w-full h-full border border-[#D4AF37]/10 p-2 md:p-4 rounded-sm bg-[#080808]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="w-full h-full absolute inset-0 p-2 md:p-4"
                            >
                                <DynamicFrameLayout
                                    frames={getActiveFrames()}
                                    className="w-full h-full"
                                    hoverSize={6}
                                    gapSize={8}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsSection;
