export interface EventArtist {
    id: string;
    name: string;
    tagline: string;
    desc: string;
    imgSrc: string;
    date: string;
    location: string;
    videoUrl?: string; // Optional video
    highlights: string[];
}

export const eventArtists: EventArtist[] = [
    {
        id: "sonu-nigam",
        name: "Sonu Nigam",
        tagline: "The Legend of Indian Playback",
        desc: "A transcendent evening of melodies that span decades. Experience the voice that defined a generation in an intimate, awe-inspiring auditory journey. Offering a heady mix of soulful and masti, phenomenal singing and loads of entertainment, Sonu Nigam is truly a darling of music lovers.",
        imgSrc: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=1200",
        date: "OCT 2024",
        location: "SYDNEY, NSW",
        videoUrl: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4", // Sonu has a video
        highlights: ["MULTIPLE SELLOUTS", "AUSTRALIA & NZ", "STANDING OVATIONS"],
    },
    {
        id: "kapil-sharma",
        name: "Kapil Sharma",
        tagline: "The Uncrowned King of Comedy",
        desc: "Laughter echoes through stadiums as the master of wit returns. A night of unadulterated joy, sharp observations, and global comedic excellence. The ultimate king of comedy brought a riot of laughter to the arenas, leaving audiences in splits with his impeccable timing and incredible stage presence.",
        imgSrc: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=1200",
        date: "NOV 2024",
        location: "MELBOURNE, VIC",
        videoUrl: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4", // Kapil has a video
        highlights: ["100% SOLD OUT", "LAUGH RIOT", "GLOBAL ICON"],
    },
    {
        id: "shreya-ghoshal",
        name: "Shreya Ghoshal",
        tagline: "The Queen of Melody",
        desc: "Ethereal vocals meet orchestral grandeur. Allow her timeless voice to transport you through cinematic history and modern masterpieces. With a voice that feels like magic, Shreya captivated the audience with every note.",
        imgSrc: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200",
        date: "DEC 2024",
        location: "BRISBANE, QLD",
        // No videoUrl for Shreya to test conditional rendering
        highlights: ["MESMERIZING", "SOULFUL NIGHT", "UNFORGETTABLE"],
    },
    {
        id: "dabangg-tour",
        name: "Dabangg Tour",
        tagline: "The Ultimate Bollywood Spectacle",
        desc: "A massive ensemble of stars, high-octane choreography, and jaw-dropping production. The biggest stage show to ever leave the subcontinent. Featuring a constellation of superstars, mind-blowing choreography, and jaw-dropping production values.",
        imgSrc: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
        date: "FEB 2025",
        location: "AUCKLAND, NZ",
        videoUrl: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4", // Has a video
        highlights: ["ALL STAR CAST", "ARENA SPECTACLE", "BOLLYWOOD MAGIC"],
    }
];

export const getEventById = (id: string) => {
    return eventArtists.find(artist => artist.id === id);
};
