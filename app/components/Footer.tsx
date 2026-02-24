"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const Footer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });



  // Particle Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        // Varying sizes for depth
        this.size = Math.random() * 2 + 0.5;
        // Gentle floating movement
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        // Gold shades
        const goldShades = ["#D4AF37", "#FFD700", "#F7E7CE", "#C5A028"];
        this.color = goldShades[Math.floor(Math.random() * goldShades.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;

        // Pulsate alpha
        this.alpha += (Math.random() - 0.5) * 0.02;
        if (this.alpha < 0.1) this.alpha = 0.1;
        if (this.alpha > 0.8) this.alpha = 0.8;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth * 0.15, 150); // Responsive count
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Standard clear

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles for a "constellation" effect (subtle)
      particles.forEach((a, index) => {
        for (let j = index + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 - distance / 1000})`; // Very faint gold lines
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "EVENTS", href: "/events" },
    { name: "GALLERY", href: "/gallery" },
    { name: "CONTACT", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Youtube, href: "#", color: "hover:text-red-600" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
  ];

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-[60vh] bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center pt-20 pb-10"
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Premium Gradient Overlay at bottom for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0 pointer-events-none" />

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-12 text-center"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Glow effect behind text */}
            <div className="absolute inset-0 bg-[#D4AF37] blur-[80px] opacity-20" />

            <h1 className="text-[12vw] md:text-[5rem] font-bold tracking-tighter leading-none font-sans text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C3] to-[#D4AF37] drop-shadow-2xl">
              CINESTAR
            </h1>
            <span className="text-xl md:text-2xl tracking-[0.6em] text-[#D4AF37] font-sans font-light mt-[-10px] block">
              EVENTS
            </span>
          </motion.div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-12 mt-4">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm md:text-base tracking-[0.2em] text-white/70 hover:text-[#D4AF37] transition-colors duration-300 font-sans relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <Link
            href="mailto:info@cinestarevents.com.au"
            className="text-lg md:text-xl text-white hover:text-[#D4AF37] transition-colors duration-300 font-sans flex items-center gap-2"
          >

            info@cinestarevents.com.au
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-4">
          {socialLinks.map((Social, idx) => (
            <motion.a
              key={idx}
              href={Social.href}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                "p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 group",
                Social.color
              )}
            >
              <Social.icon className="w-6 h-6 text-white/80 group-hover:text-[#D4AF37] transition-colors" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Copyright */}
      <div className="relative z-10 mt-16 text-xs text-white/30 tracking-widest uppercase font-sans">
        © {new Date().getFullYear()} Cinestar Events. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
