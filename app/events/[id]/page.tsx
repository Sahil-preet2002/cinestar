import { getEventById } from "@/lib/events-data";
import { notFound } from "next/navigation";
import EventDetailClient from "@/app/components/EventDetailClient";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Require async segment config for Next.js 13+ dynamic parameters if needed, but standard page is fine.
export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const p = await params;
    const eventData = getEventById(p.id);

    if (!eventData) {
        notFound();
    }

    return (
        <main className="bg-[#050000] min-h-screen text-white selection:bg-[#D4AF37] selection:text-black">
            <Navbar activePath="/events" />
            <EventDetailClient event={eventData} />
            <Footer />
        </main>
    );
}
