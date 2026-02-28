"use client";

import {
    GridBody,
    DraggableContainer,
    GridItem,
} from "@/app/components/ui/infinite-drag-scroll";

const images = [
    {
        id: 1,
        alt: "Rahat Fateh Ali Khan",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Rahat_Fateh_Ali_Khan.jpg",
    },
    {
        id: 2,
        alt: "Arijit Singh",
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Arijit_Singh_performance_at_Chandigarh_2025.jpg",
    },
    {
        id: 3,
        alt: "Kumar Sanu",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Kumar_Sanu_at_colors_indian_telly_awards.jpg",
    },
    {
        id: 4,
        alt: "Kapil Sharma",
        src: "https://upload.wikimedia.org/wikipedia/commons/3/33/The-great-Indian-Kapil-show-press-conference-10.jpg",
    },
    {
        id: 5,
        alt: "Salman Khan",
        src: "https://upload.wikimedia.org/wikipedia/commons/9/95/Salman_Khan_in_2023_%281%29_%28cropped%29.jpg",
    },
    {
        id: 6,
        alt: "Asha Bhosle",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ashaji.jpg/1280px-Ashaji.jpg",
    },
    // Duplicating slightly to fill out the grid nicely as requested usually by infinite scroll
    {
        id: 7,
        alt: "Rahat Fateh Ali Khan",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Rahat_Fateh_Ali_Khan.jpg",
    },
    {
        id: 8,
        alt: "Arijit Singh",
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Arijit_Singh_performance_at_Chandigarh_2025.jpg",
    },
    {
        id: 9,
        alt: "Kumar Sanu",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Kumar_Sanu_at_colors_indian_telly_awards.jpg",
    },
    {
        id: 10,
        alt: "Kapil Sharma",
        src: "https://upload.wikimedia.org/wikipedia/commons/3/33/The-great-Indian-Kapil-show-press-conference-10.jpg",
    },
    {
        id: 11,
        alt: "Salman Khan",
        src: "https://upload.wikimedia.org/wikipedia/commons/9/95/Salman_Khan_in_2023_%281%29_%28cropped%29.jpg",
    },
    {
        id: 12,
        alt: "Asha Bhosle",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ashaji.jpg/1280px-Ashaji.jpg",
    },
];

export default function PremiumGallery() {
    return (
        <DraggableContainer variant="masonry" className="w-full">
            <GridBody>
                {images.map((image, index) => (
                    <GridItem
                        key={image.id}
                        className="relative h-54 w-36 md:h-96 md:w-64"
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="pointer-events-none absolute h-full w-full object-cover"

                        />
                    </GridItem>
                ))}
            </GridBody>
        </DraggableContainer>
    );
}
