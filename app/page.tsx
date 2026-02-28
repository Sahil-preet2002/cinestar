
import AnimatedSections from "./components/ui/animated-sections-1";
import HeroScrollVideo from "./components/ui/scroll-animated-video";
import ArtistShowcase from './components/ArtistShowcase';
import { HeroSection } from './components/ui/hero-section';
import CinestarArchive from "./components/CinestarArchive";
import Sponsors from "./components/Sponsors";

export default function Home() {
  return (
    <>
      {/* HERO SECTION - YOGESH SHARMA */}
      <section className="w-full">
        <AnimatedSections embed />
      </section>

      {/* SCROLL EXPANSION HERO SECTION - MAIN FEATURE */}
      <HeroScrollVideo
        title="Over 120 superhit Bollywood shows"
        subtitle="in Australia"
        meta="2004 - 2024"
        media="https://player.vimeo.com/video/1051814348"
        overlay={{
          caption: "CINESTAR • EVENTS",
          heading: "Pioneering Bollywood Entertainment",
          paragraphs: [
            "Welcome to Cinestar Events – the name which pioneers Bollywood entertainment in Australia, New Zealand, Malaysia and the Fiji Islands.",
            "Starting two decades ago in 2004, Cinestar Events has consistently raised the bar in live entertainment from Bollywood. We have worked with legends as well as new talent – bringing actors, singers, dancers – and organised over 120 super successful shows across the region.",
          ],
        }}
        themeMode="dark"
        style={{
          //@ts-ignore
          "--bg": "#050505",
          "--text": "#ffffff",
          "--accent": "#D4AF37",
          "--muted": "rgba(255, 255, 255, 0.6)",
        }}
      />
      <CinestarArchive />
      <section className="w-full">
        <HeroSection />
      </section>


      {/* ARTIST SHOWCASE SECTION */}
      <section className="w-full">
        <ArtistShowcase />
      </section>

      {/* ANIMATED SECTIONS */}


      <Sponsors />
    </>
  );
}
