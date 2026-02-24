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
            className={`relative ${className}`}
            style={{
                width,
                height,
                transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
            }}
        >
            <div className="relative w-full h-full overflow-hidden bg-[#000] border border-[#050505] group-hover:border-[#D4AF37] transition-colors duration-500">
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        zIndex: 1,
                        transition: "all 0.3s ease-in-out",
                        padding: showFrame ? `${borderThickness}px` : "0",
                        width: showFrame ? `${borderSize}%` : "100%",
                        height: showFrame ? `${borderSize}%` : "100%",
                        left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
                        top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
                    }}
                >
                    <div
                        className="w-full h-full overflow-hidden relative"
                        style={{
                            transform: `scale(${mediaSize})`,
                            transformOrigin: "center",
                            transition: "transform 0.3s ease-in-out",
                        }}
                    >
                        {frame.type === 'video' && frame.src && (
                            <video
                                className="w-full h-full object-cover"
                                src={frame.src}
                                loop
                                muted
                                playsInline
                                ref={videoRef}
                            />
                        )}

                        {frame.type === 'image' && frame.src && (
                            <div className="relative w-full h-full">
                                <Image
                                    src={frame.src}
                                    alt="Event Gallery"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                        )}

                        {frame.type === 'text' && frame.content && (
                            <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center bg-[#111] border border-[#D4AF37]/10">
                                <h3 className="text-xl md:text-2xl font-bold font-sans text-[#D4AF37] mb-4 uppercase tracking-wider">
                                    {frame.content.title}
                                </h3>
                                <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed">
                                    {frame.content.desc}
                                </p>
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
                transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
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
                            transition: "transform 0.4s ease",
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
