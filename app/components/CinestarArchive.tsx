"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "./CinestarArchive.module.css";
import clsx from "clsx";

gsap.registerPlugin(useGSAP);

const data = [
    {
        year: "2005",
        artists: [
            {
                name: "Sonu Nigam",
                details: "09 JULY @ 06-10PM",
                img: "https://images.unsplash.com/photo-1549834125-82d3c48159a3?q=80&w=1200",
            },
            {
                name: "Jagjit Singh",
                details: "10 JULY @ 07-11PM",
                img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200",
            },
            {
                name: "Johnny Lever",
                details: "11 JULY @ 06-09PM",
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200",
            },
        ],
    },
    {
        year: "2006",
        artists: [
            {
                name: "Pankaj Udhas",
                details: "15 AUGUST @ 07-11PM",
                img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200",
            },
        ],
    },
    {
        year: "2008",
        artists: [
            {
                name: "Sonu Nigam",
                details: "20 OCT @ 06-10PM",
                img: "https://images.unsplash.com/photo-1549834125-82d3c48159a3?q=80&w=1200",
            },
            {
                name: "Gurdas Maan",
                details: "22 SEPT @ 06-10PM",
                img: "https://images.unsplash.com/photo-1525672325444-9bc08657c96d?q=80&w=1200",
            },
        ],
    },
    {
        year: "2009",
        artists: [
            {
                name: "Jagjit Singh",
                details: "02 OCT @ 08-11PM",
                img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200",
            },
        ],
    },
    {
        year: "2011",
        artists: [
            {
                name: "Johnny Lever",
                details: "12 NOV @ 06-10PM",
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200",
            },
        ],
    },
    {
        year: "2014",
        artists: [
            {
                name: "Arijit Singh",
                details: "20 JAN @ 07-11PM",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200",
            },
        ],
    },
    {
        year: "2016",
        artists: [
            {
                name: "Sunidhi Chauhan",
                details: "05 MAY @ 06-10PM",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200",
            },
        ],
    },
    {
        year: "2017",
        artists: [
            {
                name: "Shreya Ghoshal",
                details: "18 DEC @ 08-11PM",
                img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200",
            },
        ],
    },
];

export default function CinestarArchive() {
    const [currentYearIndex, setCurrentYearIndex] = useState(0);
    const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);

    // Helper to get current artist data
    const currentYearData = data[currentYearIndex];
    const currentArtist = currentYearData.artists[currentArtistIndex];

    const animateIn = () => {
        if (!slideRef.current) return;
        const title = slideRef.current.querySelector(`.${styles.artistTitle} span`);
        const meta = slideRef.current.querySelector(`.${styles.eventMeta} span`);
        const bgText = slideRef.current.querySelector(`.${styles.slideBgText}`);

        // Initial state set by CSS or previous animation, but let's ensure
        gsap.set([title, meta], { translateY: "100%" });
        gsap.set(bgText, { opacity: 0, scale: 0.8 });

        gsap.to(bgText, {
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: "power4.out",
        });
        gsap.to(title, {
            translateY: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.5,
        });
        gsap.to(meta, {
            translateY: 0,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.7,
        });
    };

    const animateOut = (callback: () => void) => {
        if (!slideRef.current) {
            callback();
            return;
        }
        const title = slideRef.current.querySelector(`.${styles.artistTitle} span`);
        const meta = slideRef.current.querySelector(`.${styles.eventMeta} span`);
        const bgText = slideRef.current.querySelector(`.${styles.slideBgText}`);

        const tl = gsap.timeline({
            onComplete: () => {
                // Reset styles for next enter
                gsap.set(slideRef.current, { opacity: 0 }); // Hide container
                callback();
            },
        });

        tl.to(title, { translateY: "100%", duration: 0.6, ease: "power4.in" });
        tl.to(
            meta,
            { translateY: "100%", duration: 0.6, ease: "power4.in", delay: 0.1 },
            "-=0.5"
        );
        tl.to(
            bgText,
            { opacity: 0, scale: 1.2, duration: 0.8, ease: "power4.in" },
            "-=0.4"
        );
        tl.to(slideRef.current, { opacity: 0, duration: 0.5 });
    };

    // Run animateIn when the component mounts or indices change (after state update)
    // But we need to handle the "transition" phase manually to match the original logic
    // which had explicit "animateOut -> change state -> animateIn" flow.

    // We'll use a specific flow: 
    // 1. User Interaction triggers `goToYear` or `switchArtist`
    // 2. set `isAnimating(true)`
    // 3. `animateOut()`
    // 4. `setState` (indexes)
    // 5. Effect detects change -> `animateIn()` -> `isAnimating(false)`

    // However, React renders based on state. 
    // To keep the DOM present during animateOut, we can't simple switch state immediately.
    // Actually, the original code used a single container and replaced content. 
    // React way: We wait for animateOut to finish, THEN update state. 
    // But updating state will re-render the DOM with new content.
    // Then we animateIn.

    const goToYear = (index: number) => {
        if (index === currentYearIndex || isAnimating) return;
        setIsAnimating(true);
        animateOut(() => {
            setCurrentYearIndex(index);
            setCurrentArtistIndex(0);
            // setIsAnimating(false) happens after animateIn
        });
    };

    const switchArtistWithinYear = (idx: number) => {
        if (idx === currentArtistIndex || isAnimating) return;
        setIsAnimating(true);
        animateOut(() => {
            setCurrentArtistIndex(idx);
        });
    };

    // Trigger animateIn when content changes
    useEffect(() => {
        // We need to wait for the DOM to update with new content
        // RequestAnimationFrame or simple timeout might be safer, 
        // but GSAP usually handles immediate calls fine if elements exist.

        // Make sure slide is visible for animation
        if (slideRef.current) {
            gsap.set(slideRef.current, { opacity: 1, visibility: 'visible' });
        }

        animateIn();

        // We can say animation is done after some time, or just allow new interaction immediately?
        // Original code: isAnimating = false inside duplicate, but here animateIn is async visually.
        // We should unlock immediately or after some delay. 
        // The original code `renderYear` called `animateIn`. 
        // `goToYear` in original: animateOut -> callback -> update variables -> renderYear -> isAnimating = false
        // So isAnimating is false *immediately* after renderYear is called, which starts animateIn.
        setIsAnimating(false);

    }, [currentYearIndex, currentArtistIndex]);


    // Mouse Interactions
    useGSAP(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                });
            }

            if (!isAnimating && containerRef.current) {
                const imgContainer = containerRef.current.querySelector(
                    `.${styles.imageContainer}`
                );
                if (imgContainer) {
                    const xPos = (e.clientX - window.innerWidth / 2) / 100;
                    const yPos = (e.clientY - window.innerHeight / 2) / 100;
                    gsap.to(imgContainer, {
                        rotateY: xPos,
                        rotateX: -yPos,
                        duration: 1.5,
                    });
                }
            }
        };

        const handleWheel = (e: WheelEvent) => {
            // Need to access current state inside event listener or use refs
            // Since useGSAP handles cleanup, we can add listener to window
            // But we need safe way to read isAnimating and currentYearIndex
            // We will attach these to the container or window in a separate useEffect or
            // use a ref for state values if we want them inside a closure-less handler.
            // For simplicity, let's just use React onWheel on the container.
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isAnimating]); // Re-bind if isAnimating changes? No, use refs for mutable state checks if needed often.
    // Actually, checking "if (!isAnimating)" inside the event handler relies on the closure.
    // If isAnimating changes, we might want to ensure the handler sees the latest value.
    // A ref for `isAnimating` is better.

    const isAnimatingRef = useRef(isAnimating);
    useEffect(() => { isAnimatingRef.current = isAnimating; }, [isAnimating]);

    const stateRef = useRef({ year: currentYearIndex, total: data.length });
    useEffect(() => { stateRef.current = { year: currentYearIndex, total: data.length }; }, [currentYearIndex]);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const { year, total } = stateRef.current;
            if (isAnimatingRef.current) return;

            if (e.deltaY > 50 && year < total - 1) {
                goToYear(year + 1);
            } else if (e.deltaY < -50 && year > 0) {
                goToYear(year - 1);
            }
        };

        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, []); // Bind once, use refs. 
    // Wait, `goToYear` is stable? No, it depends on closure, but we are defining it in render.
    // We need `goToYear` to be accessible. 
    // Let's rely on the fact that `goToYear` closes over `currentIndex`? No, it receives `index`.
    // But `goToYear` calls `setIsAnimating` and `setCurrent...`.
    // If we call `goToYear` from the event listener, we need the *latest* version of it or 
    // it needs to access refs. 
    // Let's rewrite `goToYear` to use functional updates or refs for current index checks?
    // Actually the check `if (index === currentYearIndex)` inside `goToYear` 
    // needs the valid `currentYearIndex`.

    // To avoid complexity, I'll attach the wheel listener to the div and ensure the div has focus?
    // No, wheel should work globally. 
    // I will just use a useEffect that updates the listener when relevant state changes? 
    // Or just use the ref strategy which is cleaner for event listeners.
    // `goToYear` changes on every render.

    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            if (isAnimatingRef.current) return;
            const { year, total } = stateRef.current;
            if (e.deltaY > 50 && year < total - 1) {
                // We need to call the function that triggers the state change.
                // Since we are inside useEffect with empty deps, we need a stable reference or call a ref.
                goToYearRef.current(year + 1);
            } else if (e.deltaY < -50 && year > 0) {
                goToYearRef.current(year - 1);
            }
        };
        window.addEventListener("wheel", onWheel);
        return () => window.removeEventListener("wheel", onWheel);
    }, []);

    const goToYearRef = useRef(goToYear);
    useEffect(() => { goToYearRef.current = goToYear; }, [goToYear]);


    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.noise}></div>
            <div className={styles.cursor} ref={cursorRef} id="cursor"></div>

            <div className={styles.mainHeading}>
                <h1 className={styles.syncopate}>Cinestar Through The Years</h1>
                <div className={styles.line}></div>
            </div>

            <div className={styles.artistTabsContainer} id="artistTabs">
                {currentYearData.artists.map((artist, idx) => (
                    <button
                        key={idx}
                        className={clsx(
                            styles.artistTabBtn,
                            idx === currentArtistIndex && styles.artistTabBtnActive
                        )}
                        onClick={() => switchArtistWithinYear(idx)}
                    >
                        {artist.name}
                    </button>
                ))}
            </div>

            <div className={styles.timelineContainer} id="timeline">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={clsx(
                            styles.timelineItem,
                            index === currentYearIndex && styles.timelineItemActive
                        )}
                        onClick={() => goToYear(index)}
                    >
                        <div className={styles.timelineDot}></div>
                        <div className={styles.timelineYear}>{item.year}</div>
                    </div>
                ))}
            </div>

            <div className={styles.sliderWrap} id="slider">
                <div
                    className={clsx(styles.slide, styles.slideActive)}
                    ref={slideRef}
                >
                    <div className={clsx(styles.slideBgText, styles.syncopate)}>
                        {currentYearData.year}
                    </div>
                    <div className={styles.imageContainer}>
                        <div className={styles.imageInner}>
                            <img
                                src={currentArtist.img}
                                alt={currentArtist.name}
                            // Using standard img tag for ease of porting styles/behavior exactly
                            // Next.js Image component would require width/height or layout fill
                            // which might conflict with the CSS scaling/transforms if not careful.
                            // Given "same to same" request, standard img is safer for exact CSS match.
                            />
                        </div>
                    </div>
                    <div className={styles.infoPanel}>
                        <h2 className={clsx(styles.artistTitle, styles.syncopate)}>
                            <span>{currentArtist.name}</span>
                        </h2>
                        <p className={styles.eventMeta}>
                            <span>{currentArtist.details}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-10 left-10 z-[100] flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#D4AF37] opacity-50"></div>
                <p className="cormorant text-2xl italic text-[#D4AF37] opacity-80 font-sans">
                    Legacy of Excellence
                </p>
            </div>
        </div>
    );
}
