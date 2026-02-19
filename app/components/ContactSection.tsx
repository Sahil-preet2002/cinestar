"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    MapPin,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Twitter,
    Send,
    ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        country: "",
        message: "",
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.fromTo(
                titleRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Info Section Animation
            gsap.fromTo(
                ".contact-info-item",
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: infoRef.current,
                        start: "top 85%",
                    },
                }
            );

            // Form Animation
            gsap.fromTo(
                ".form-input-group",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 80%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        console.log(formData);
        alert("Message sent! We will get back to you shortly.");
    };

    return (
        <div
            ref={sectionRef}
            className="min-h-screen bg-[#050505] text-white py-20 px-6 md:px-20 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto pt-20">
                {/* Header */}
                <div className="mb-20 text-center md:text-left">
                    <div className="inline-block border border-[#D4AF37] rounded-full px-4 py-1 mb-6">
                        <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold">
                            Get in Touch
                        </span>
                    </div>
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-black font-[family-name:var(--font-syncopate)] leading-tight uppercase"
                    >
                        Let's Create <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF5C3] to-[#D4AF37]">
                            Magic
                        </span>
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                    {/* Left: Contact Info */}
                    <div ref={infoRef} className="lg:w-1/3 space-y-12">
                        <div className="space-y-8">
                            <p className="text-white/60 font-[family-name:var(--font-space-grotesk)] text-lg leading-relaxed">
                                Have a project in mind or want to book an event? We're here to turn
                                your vision into a spectacular reality. Reach out to us today.
                            </p>

                            <div className="contact-info-item flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold mb-2">
                                        Phone
                                    </h3>
                                    <a
                                        href="tel:+61885569364"
                                        className="text-xl font-[family-name:var(--font-space-grotesk)] hover:text-[#D4AF37] transition-colors"
                                    >
                                        +61 8 8569 3645
                                    </a>
                                </div>
                            </div>

                            <div className="contact-info-item flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold mb-2">
                                        Email
                                    </h3>
                                    <a
                                        href="mailto:info@cinestarevents.com.au"
                                        className="text-xl font-[family-name:var(--font-space-grotesk)] hover:text-[#D4AF37] transition-colors"
                                    >
                                        info@cinestarevents.com.au
                                    </a>
                                </div>
                            </div>

                            <div className="contact-info-item flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold mb-2">
                                        Location
                                    </h3>
                                    <p className="text-xl font-[family-name:var(--font-space-grotesk)]">
                                        Sydney, Australia
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-info-item pt-8 border-t border-[#D4AF37]/10">
                            <h3 className="text-white uppercase tracking-widest text-xs font-bold mb-6">
                                Follow Us
                            </h3>
                            <div className="flex gap-6">
                                {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                                    <a
                                        key={idx}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                                    >
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:w-2/3">
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-input-group space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#D4AF37] outline-none transition-colors font-[family-name:var(--font-space-grotesk)] placeholder-white/20"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="form-input-group space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#D4AF37] outline-none transition-colors font-[family-name:var(--font-space-grotesk)] placeholder-white/20"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="form-input-group space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                                        Mobile
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#D4AF37] outline-none transition-colors font-[family-name:var(--font-space-grotesk)] placeholder-white/20"
                                        placeholder="+61 ..."
                                    />
                                </div>
                                <div className="form-input-group space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#D4AF37] outline-none transition-colors font-[family-name:var(--font-space-grotesk)] placeholder-white/20"
                                        placeholder="Australia"
                                    />
                                </div>
                            </div>

                            <div className="form-input-group space-y-2">
                                <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#D4AF37] outline-none transition-colors font-[family-name:var(--font-space-grotesk)] placeholder-white/20 resize-none"
                                    placeholder="Tell us about your project..."
                                    required
                                />
                            </div>

                            <div className="form-input-group pt-8">
                                <button
                                    type="submit"
                                    className="group relative px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:pr-14"
                                >
                                    <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-2">
                                        Send Message
                                    </span>
                                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                                    <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:text-black transition-all duration-300 z-10" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
