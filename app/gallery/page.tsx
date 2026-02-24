import PremiumGallery from "../components/ui/gallery-premium";

export default function GalleryPage() {
    return (
        <main className="w-full min-h-screen bg-black pt-24 text-white">
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_#D4AF3710_0%,_#80000005_40%,_transparent_70%)]" />
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-8 text-center pointer-events-none">
                <div className="inline-block border-y-2 border-[#D4AF37] py-2 mb-4">
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase px-8">
                        Visual Archives
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                    Event <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C3] via-[#D4AF37] to-[#8C7320]">Gallery</span>
                </h1>
                <p className="mt-4 text-white/50 max-w-xl mx-auto font-serif italic text-sm">
                    Drag anywhere to explore our cinematic memories. Use the scroll wheel to zoom intuitively.
                </p>
            </div>
            {/* The infinite drag scroll component handles its own positioning/dragging */}
            <div className="relative z-20">
                <PremiumGallery />
            </div>
        </main>
    );
}
