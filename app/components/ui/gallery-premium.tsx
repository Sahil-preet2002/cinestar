"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import clsx from "clsx";

const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=1200",
        title: "Star Night 2024",
        year: "2024",
    },
    {
        src: "https://images.unsplash.com/photo-1514525253361-bee8a19740c1?auto=format&fit=crop&q=80&w=1200",
        title: "Live in Sydney",
        year: "2023",
    },
    {
        src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200",
        title: "Awards Gala",
        year: "2023",
    },
    {
        src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=1200",
        title: "Music Festival",
        year: "2022",
    },
    {
        src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
        title: "The Grand Stage",
        year: "2022",
    },
    {
        src: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1200",
        title: "VIP Lounge",
        year: "2021",
    },
    {
        src: "https://images.unsplash.com/photo-1506157786151-b8491531f436?auto=format&fit=crop&q=80&w=1200",
        title: "Backstage Pass",
        year: "2021",
    },
    {
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200",
        title: "Fan Meet",
        year: "2020",
    },
    {
        src: "https://images.unsplash.com/photo-1459749411177-287ce35e8b7f?auto=format&fit=crop&q=80&w=1200",
        title: "Red Carpet",
        year: "2019",
    },
];

export const PremiumGallery = () => {
    const gridRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: gridRef,
        offset: ["start end", "end start"],
    });

    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const third = Math.ceil(galleryImages.length / 3);
    const firstPart = galleryImages.slice(0, third);
    const secondPart = galleryImages.slice(third, 2 * third);
    const thirdPart = galleryImages.slice(2 * third);

    return (
        <div
            className="w-full bg-[#050505] relative z-20 py-20 overflow-hidden"
            ref={gridRef}
        >
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                >
                    <span className="text-[#D4AF37] tracking-[0.4em] uppercase text-sm font-sans mb-4">
                        Visual Legacy
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-white">
                        CAPTURING MOMENTS
                    </h2>
                    <div className="w-24 h-[1px] bg-[#D4AF37] mt-8 opacity-60"></div>
                </motion.div>
            </div>

            {/* Parallax Grid */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-7xl mx-auto gap-6 md:gap-10 px-6 md:px-10"
            >
                {/* Column 1 */}
                <div className="grid gap-10">
                    {firstPart.map((el, idx) => (
                        <GalleryCard key={"g1-" + idx} item={el} idx={idx} translate={translateFirst} />
                    ))}
                </div>

                {/* Column 2 */}
                <div className="grid gap-10">
                    {secondPart.map((el, idx) => (
                        <GalleryCard key={"g2-" + idx} item={el} idx={idx} translate={translateSecond} />
                    ))}
                </div>

                {/* Column 3 */}
                <div className="grid gap-10">
                    {thirdPart.map((el, idx) => (
                        <GalleryCard key={"g3-" + idx} item={el} idx={idx} translate={translateThird} />
                    ))}
                </div>
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/4 left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37] opacity-[0.03] blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37] opacity-[0.03] blur-[120px] pointer-events-none"></div>
        </div>
    );
};

const GalleryCard = ({ item, idx, translate }: { item: any, idx: number, translate: any }) => {
    return (
        <motion.div
            style={{ y: translate }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer"
        >
            <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
            />

            {/* Border Reveal */}
            <div className="absolute inset-0 border border-[#D4AF37] opacity-0 scale-95 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 pointer-events-none"></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-[#D4AF37] text-xs font-sans tracking-widest uppercase mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.year}
                </span>
                <h3 className="text-white text-xl font-sans font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                </h3>
            </div>
        </motion.div>
    );
}

export default PremiumGallery;
