import GeminiPlanner from "./components/GeminiPlanner";
import Galaxy from "./components/Galaxy";
import AnimatedSections from "./components/ui/animated-sections-1";
import ScrollExpandMedia from './components/blocks/scroll-expansion-hero';
import ArtistShowcase from './components/ArtistShowcase';

export default function Home() {
  return (
    <>
      {/* SCROLL EXPANSION HERO SECTION - MAIN FEATURE */}
      <div className='min-h-screen'>
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1"
          posterSrc="https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg"
          bgImageSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS"
          title="Award Night Experience"
          date="Premium Cinema Event"
          scrollToExpand="Scroll to Expand"
          textBlend
        >
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold mb-6 text-black dark:text-white'>
              Immersive Cinema Experience
            </h2>
            <p className='text-lg mb-8 text-black dark:text-white'>
              Experience the magic of cinema like never before. Our award-winning venue combines cutting-edge technology with timeless elegance to create unforgettable moments. Join us for an evening of glamour, artistry, and pure entertainment.
            </p>
            <p className='text-lg mb-8 text-black dark:text-white'>
              Step into a world where every frame tells a story, every sound resonates with emotion, and every moment becomes an unforgettable memory. Our premium cinema experience redefines entertainment.
            </p>
          </div>
        </ScrollExpandMedia>
      </div>

      {/* GEMINI AI PLANNER SECTION */}
      <section className="w-full bg-neutral-900">
        <GeminiPlanner />
      </section>

      {/* ARTIST SHOWCASE SECTION */}
      <section className="w-full">
        <ArtistShowcase />
      </section>

      {/* ANIMATED SECTIONS */}
      <section className="w-full">
        <AnimatedSections embed />
      </section>
    </>
  );
}
