import GeminiPlanner from "./components/GeminiPlanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 font-sans selection:bg-yellow-500 selection:text-black">
      {/* MAIN CONTENT AREA */}
      <main className="relative w-full flex flex-col items-center">
        
        {/* HERO SECTION */}
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden border-b border-yellow-900/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-neutral-900 to-black z-0"></div>
            
            {/* Animated Spotlight Effect */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/10 to-transparent rotate-12 transform origin-top blur-sm"></div>
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-white/10 to-transparent -rotate-12 transform origin-top blur-sm"></div>

            <div className="z-10 text-center px-4">
              <h2 className="text-yellow-500/90 text-xl md:text-2xl font-oswald tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Welcome to the
              </h2>
              <h3 className="text-white text-5xl md:text-7xl lg:text-8xl font-oswald font-bold uppercase tracking-widest drop-shadow-2xl animate-in fade-in zoom-in duration-1000 delay-100">
                Award Night
              </h3>
              <p className="mt-6 text-gray-400 max-w-lg mx-auto font-playfair italic">
                Experience the glamour, the lights, and the unforgettable moments of cinema's finest celebration.
              </p>
            </div>
        </div>

        {/* GEMINI AI PLANNER SECTION */}
        <GeminiPlanner />

      </main>
    </div>
  );
}
