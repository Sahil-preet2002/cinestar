"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export interface Frame {
    id: number
    type: 'video' | 'image' | 'text'
    src?: string
    content?: { title: string; desc: string }
    defaultPos: { x: number; y: number; w: number; h: number }
    corner?: string
    edgeHorizontal?: string
    edgeVertical?: string
    mediaSize?: number
    borderThickness?: number
    borderSize?: number
    isHovered?: boolean
}

interface FrameComponentProps {
    frame: Frame
    width: number | string
    height: number | string
    className?: string
    showFrame: boolean
    isHovered: boolean
}

function FrameComponent({
    frame,
    width,
    height,
    className = "",
    showFrame,
    isHovered,
}: FrameComponentProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (frame.type === 'video') {
            if (isHovered) {
                videoRef.current?.play()
            } else {
                videoRef.current?.pause()
            }
        }
    }, [isHovered, frame.type])

    const borderThickness = frame.borderThickness || 2;
    const borderSize = frame.borderSize || 95;
    const mediaSize = frame.mediaSize || 1;

    return (
        <div
            className={`group relative ${className}`}
            style={{
                width,
                height,
                transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1), height 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
        >
            <div className="relative w-full h-full overflow-hidden bg-[#0A0A0A] rounded-xl transition-all duration-700 ease-out z-10 group-hover:z-20 border border-white/5 group-hover:border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_30px_rgba(212,175,55,0.15)]">
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                        zIndex: 1,
                        transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                        padding: showFrame ? `${borderThickness}px` : "0",
                        width: showFrame ? `${borderSize}%` : "100%",
                        height: showFrame ? `${borderSize}%` : "100%",
                        left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
                        top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
                    }}
                >
                    <div
                        className="w-full h-full overflow-hidden relative pointer-events-auto"
                        style={{
                            transform: `scale(${mediaSize})`,
                            transformOrigin: "center",
                            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    >
                        {frame.type === 'video' && frame.src && (
                            <div className="relative w-full h-full">
                                <video
                                    className="w-full h-full object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                                    src={frame.src}
                                    loop
                                    muted
                                    playsInline
                                    ref={videoRef}
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 ease-out pointer-events-none" />
                            </div>
                        )}

                        {frame.type === 'image' && frame.src && (
                            <div className="relative w-full h-full">
                                <Image
                                    src={frame.src}
                                    alt="Event Gallery"
                                    fill
                                    className="object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 ease-out pointer-events-none" />
                            </div>
                        )}

                        {frame.type === 'text' && frame.content && (
                            <div className="w-full h-full flex flex-col justify-center items-center p-8 md:p-12 text-center bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 group-hover:border-[#D4AF37]/20 transition-colors duration-700">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C3] to-[#D4AF37] mb-6 uppercase tracking-[0.2em] transform group-hover:scale-105 transition-transform duration-500 ease-out">
                                    {frame.content.title}
                                </h3>
                                <div className="relative max-w-lg">
                                    <span className="absolute -top-6 -left-6 text-5xl text-[#D4AF37]/10 font-serif leading-none">"</span>
                                    <p className="text-white/60 font-sans text-sm md:text-base leading-[1.8] tracking-widest uppercase font-medium">
                                        {frame.content.desc}
                                    </p>
                                    <span className="absolute -bottom-8 -right-4 text-5xl text-[#D4AF37]/10 font-serif leading-none">"</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface DynamicFrameLayoutProps {
    frames: Frame[]
    className?: string
    showFrames?: boolean
    hoverSize?: number
    gapSize?: number
}

export function DynamicFrameLayout({
    frames,
    className,
    showFrames = false,
    hoverSize = 6,
    gapSize = 4
}: DynamicFrameLayoutProps) {
    const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

    const getRowSizes = () => {
        if (hovered === null) return "4fr 4fr 4fr"
        const { row } = hovered
        const nonHoveredSize = (12 - hoverSize) / 2
        return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
    }

    const getColSizes = () => {
        if (hovered === null) return "4fr 4fr 4fr"
        const { col } = hovered
        const nonHoveredSize = (12 - hoverSize) / 2
        return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
    }

    const getTransformOrigin = (x: number, y: number) => {
        const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
        const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
        return `${vertical} ${horizontal}`
    }

    return (
        <div
            className={`relative w-full h-full ${className}`}
            style={{
                display: "grid",
                gridTemplateRows: getRowSizes(),
                gridTemplateColumns: getColSizes(),
                gap: `${gapSize}px`,
                transition: "grid-template-rows 0.6s cubic-bezier(0.22, 1, 0.36, 1), grid-template-columns 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
        >
            {frames.map((frame) => {
                const row = Math.floor(frame.defaultPos.y / 4)
                const col = Math.floor(frame.defaultPos.x / 4)
                const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

                return (
                    <motion.div
                        key={frame.id}
                        className="relative"
                        style={{
                            transformOrigin,
                            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                        onMouseEnter={() => setHovered({ row, col })}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <FrameComponent
                            frame={frame}
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            showFrame={showFrames}
                            isHovered={hovered?.row === row && hovered?.col === col}
                        />
                    </motion.div>
                )
            })}
        </div>
    )
}
