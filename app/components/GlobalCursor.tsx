'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const isTouch = window.matchMedia("(hover: none)").matches;
      if (!isTouch) {
        gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(followerRef.current, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="hidden lg:block fixed w-[10px] h-[10px] bg-[#D4AF37] rounded-full pointer-events-none z-[9999] shadow-[0_0_20px_#D4AF37]" />
      <div ref={followerRef} className="hidden lg:block fixed w-[40px] h-[40px] border border-[#D4AF37] rounded-full pointer-events-none z-[9998]" />
    </>
  );
}