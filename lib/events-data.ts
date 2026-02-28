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
        id: "rabat-fateh-ali-khan",
        name: "Ustad Rahat Fateh Ali Khan",
        tagline: "The Voice of Sufi Soul",
        desc: "Experience the mesmerizing and powerful voice of the Sufi maestro. A transcendent evening of melodies that span decades, carrying the legacy of Qawwali to the modern stage.",
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Rahat_Fateh_Ali_Khan.jpg",
        date: "SEP 2024",
        location: "SYDNEY, NSW",
        videoUrl: "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
        highlights: ["SUFI NIGHT", "LIVE QAWWALI", "MESMERIZING"],
    },
    {
        id: "shreya-ghoshal",
        name: "Shreya Ghoshal",
        tagline: "The Queen of Melody",
        desc: "Ethereal vocals meet orchestral grandeur. Allow her timeless voice to transport you through cinematic history and modern masterpieces. With a voice that feels like magic, Shreya captivated the audience with every note.",
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Shreya_Ghoshal_Behindwoods_Gold_Icons_Awards_2023_%28cropped%29.jpg",
        date: "DEC 2024",
        location: "BRISBANE, QLD",
        highlights: ["MESMERIZING", "SOULFUL NIGHT", "UNFORGETTABLE"],
    },
    {
        id: "jagjit-singh",
        name: "Jagjit Singh Tribute",
        tagline: "The Ghazal King Honored",
        desc: "A heartfelt tribute to the legendary Ghazal Maestro. Relive the soulful ghazals that defined an era of music, bringing peace and deep emotion to every listener.",
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Jagjit_Singh_%28Ghazal_Maestro%29.jpg/1280px-Jagjit_Singh_%28Ghazal_Maestro%29.jpg",
        date: "AUG 2024",
        location: "PERTH, WA",
        highlights: ["GHAZAL NIGHT", "TIMELESS CLASSICS", "SOULFUL"],
    },
    {
        id: "adnan-sami",
        name: "Adnan Sami",
        tagline: "The Sultan of Music",
        desc: "The fastest keyboard player in the world and the voice behind countless romantic anthems returns for a night of pure musical magic. Lift your spirits with his unmatched energy and emotional delivery.",
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Adnan_Sami_in_2016.jpg",
        date: "MAR 2025",
        location: "ADELAIDE, SA",
        videoUrl: "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
        highlights: ["PIANO MAESTRO", "ROMANTIC HITS", "UPBEAT EVENING"],
    },
    {
        id: "sonu-nigam",
        name: "Sonu Nigam",
        tagline: "The Legend of Indian Playback",
        desc: "A transcendent evening of melodies that span decades. Experience the voice that defined a generation in an intimate, awe-inspiring auditory journey. Offering a heady mix of soulful and masti, phenomenal singing and loads of entertainment.",
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/7/76/Sonu_Nigam123.jpg",
        date: "OCT 2024",
        location: "SYDNEY, NSW",
        highlights: ["MULTIPLE SELLOUTS", "AUSTRALIA & NZ", "STANDING OVATIONS"],
    },
    {
        id: "mika-singh",
        name: "Mika Singh",
        tagline: "The King of Bollywood Pop",
        desc: "Get ready for a high-energy powerhouse performance! The undisputed king of Punjabi pop and Bollywood dance numbers is here to make you groove all night long.",
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Mika_Singh_2025.jpg/1280px-Mika_Singh_2025.jpg",
        date: "JAN 2025",
        location: "MELBOURNE, VIC",
        highlights: ["HIGH ENERGY", "PUNJABI POP", "DANCE ANTHEMS"],
    }
];

export const getEventById = (id: string) => {
    return eventArtists.find(artist => artist.id === id);
};
