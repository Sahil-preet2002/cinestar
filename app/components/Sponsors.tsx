"use client";

import { InfiniteSlider } from "@/app/components/ui/infinite-slider";
import { Star } from "lucide-react";

const logos = [
    { src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia" },
    { src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" },
    { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" },
    { src: "https://svgl.app/library/turso-wordmark-light.svg", alt: "Turso" },
    { src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel" },
    { src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub" },
    { src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg", alt: "Claude AI" },
    { src: "https://svgl.app/library/clerk-wordmark-light.svg", alt: "Clerk" },
];

export default function Sponsors() {
    return (
        <section className="w-full bg-[#050505] py-24 relative overflow-hidden border-t border-[#D4AF37]/20">

            {/* Background Text Marquee */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <div className="w-full -rotate-6 scale-110">
                    <InfiniteSlider gap={50} duration={120} direction="horizontal">
                        {Array(4).fill(null).map((_, i) => (
                            <div key={i} className="flex gap-12 items-center">
                                <span className="text-[15vw] font-black font-sans text-white whitespace-nowrap leading-none">
                                    CINESTAR EVENT LEGACY
                                </span>
                                <Star className="w-[8vw] h-[8vw] fill-current text-white" />
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
                <span className="inline-block py-1 px-3 border border-[#D4AF37]/30 rounded-full bg-[#D4AF37]/5 backdrop-blur-sm mb-6">
                    <span className="text-[#D4AF37] text-xs font-sans tracking-[0.3em] uppercase font-bold">
                        Trusted Partners
                    </span>
                </span>

                <h2 className="text-3xl md:text-5xl font-sans font-bold text-white leading-tight">
                    POWERING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF5C3] to-[#D4AF37]">EXCELLENCE</span>
                </h2>
            </div>

            {/* Logo Marquee */}
            <div className="relative w-full max-w-[100vw] overflow-hidden">
                {/* Clean Edge Fades using Mask Image */}
                <div className="absolute inset-0 z-20 pointer-events-none [mask-image:linear-gradient(to_right,black,transparent_5%,transparent_95%,black)]"></div>

                <div className="py-10 border-y border-[#D4AF37]/10 bg-white/[0.02] backdrop-blur-[2px]">
                    <InfiniteSlider gap={60} duration={30} durationOnHover={100}>
                        {logos.map((logo, idx) => (
                            <div key={idx} className="flex items-center gap-12 group">
                                <div className="relative h-12 w-auto min-w-[120px] flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="h-full w-auto object-contain brightness-200 contrast-0 grayscale group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500"
                                    />
                                </div>
                                {/* Gold Separator */}
                                <div className="h-2 w-2 rounded-full bg-[#D4AF37] opacity-20 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_#D4AF37]"></div>
                            </div>
                        ))}
                    </InfiniteSlider>
                </div>
            </div>
        </section>
    );
}
