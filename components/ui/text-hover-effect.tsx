"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
    text,
    duration,
}: {
    text: string;
    duration?: number;
    automatic?: boolean;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    useEffect(() => {
        if (svgRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);

    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox="0 0 500 140"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            className="select-none"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <linearGradient
                    id="textGradient"
                    gradientUnits="userSpaceOnUse"
                    cx="50%"
                    cy="50%"
                    r="25%"
                >
                    {hovered && (
                        <>
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="25%" stopColor="#f87171" />
                            <stop offset="50%" stopColor="#60a5fa" />
                            <stop offset="75%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#a78bfa" />
                        </>
                    )}
                </linearGradient>

                <motion.radialGradient
                    id="revealMask"
                    gradientUnits="userSpaceOnUse"
                    r="20%"
                    initial={{ cx: "50%", cy: "50%" }}
                    animate={maskPosition}
                    transition={{ duration: duration ?? 0, ease: "easeOut" }}

                // example for a smoother animation below

                //   transition={{
                //     type: "spring",
                //     stiffness: 300,
                //     damping: 50,
                //   }}
                >
                    <stop offset="0%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </motion.radialGradient>
                <mask id="textMask">
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#revealMask)"
                    />
                </mask>
            </defs>
            <text
                x="50%"
                y="52%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="3.5"
                className="fill-transparent stroke-neutral-900 font-[helvetica] text-[140px] font-bold"
                style={{ opacity: 1 }}
            >
                {text}
            </text>
            <motion.text
                x="50%"
                y="52%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="3.5"
                className="fill-transparent stroke-neutral-900 font-[helvetica] text-[140px] font-bold"
                initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                animate={{
                    strokeDashoffset: 0,
                    strokeDasharray: 1000,
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                }}
            >
                {text}
            </motion.text>
            <text
                x="50%"
                y="52%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="url(#textGradient)"
                strokeWidth="3.5"
                mask="url(#textMask)"
                className="fill-transparent font-[helvetica] text-[140px] font-bold"
            >
                {text}
            </text>
        </svg>
    );
};
