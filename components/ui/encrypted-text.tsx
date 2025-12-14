"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
    text: string;
    className?: string;
    /**
     * Time in milliseconds between revealing each subsequent real character.
     * Lower is faster. Defaults to 50ms per character.
     */
    revealDelayMs?: number;
    /** Optional custom character set to use for the gibberish effect. */
    charset?: string;
    /**
     * Time in milliseconds between gibberish flips for unrevealed characters.
     * Lower is more jittery. Defaults to 50ms.
     */
    flipDelayMs?: number;
    /** CSS class for styling the encrypted/scrambled characters */
    encryptedClassName?: string;
    /** CSS class for styling the revealed characters */
    revealedClassName?: string;
    /** Whether to loop the animation continuously. Defaults to false. */
    loop?: boolean;
    /** Time in milliseconds to wait before restarting the loop. Defaults to 2000ms. */
    loopDelayMs?: number;
};

const DEFAULT_CHARSET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
    const index = Math.floor(Math.random() * charset.length);
    return charset.charAt(index);
}

function generateGibberishPreservingSpaces(
    original: string,
    charset: string,
): string {
    if (!original) return "";
    let result = "";
    for (let i = 0; i < original.length; i += 1) {
        const ch = original[i];
        result += ch === " " ? " " : generateRandomCharacter(charset);
    }
    return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
    text,
    className,
    revealDelayMs = 50,
    charset = DEFAULT_CHARSET,
    flipDelayMs = 50,
    encryptedClassName,
    revealedClassName,
    loop = false,
    loopDelayMs = 2000,
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: !loop });

    const [revealCount, setRevealCount] = useState<number>(0);
    const [cycleKey, setCycleKey] = useState<number>(0);
    const animationFrameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const lastFlipTimeRef = useRef<number>(0);
    const scrambleCharsRef = useRef<string[]>(
        text ? generateGibberishPreservingSpaces(text, charset).split("") : [],
    );

    useEffect(() => {
        if (!isInView) return;

        // Reset state for a fresh animation whenever dependencies change
        const initial = text
            ? generateGibberishPreservingSpaces(text, charset)
            : "";
        scrambleCharsRef.current = initial.split("");
        setRevealCount(0);

        let isCancelled = false;
        let loopTimeoutId: NodeJS.Timeout | null = null;
        let revealIntervalId: NodeJS.Timeout | null = null;
        let scrambleIntervalId: NodeJS.Timeout | null = null;

        const totalLength = text.length;
        let currentReveal = 0;

        // Reveal one character at a time on an interval
        const revealNextChar = () => {
            if (isCancelled) return;

            currentReveal += 1;
            setRevealCount(currentReveal);

            if (currentReveal >= totalLength) {
                // Animation complete
                if (revealIntervalId) clearInterval(revealIntervalId);
                if (scrambleIntervalId) clearInterval(scrambleIntervalId);

                if (loop) {
                    // Wait and then restart
                    loopTimeoutId = setTimeout(() => {
                        if (!isCancelled) {
                            setCycleKey(prev => prev + 1);
                        }
                    }, loopDelayMs);
                }
            }
        };

        // Scramble unrevealed characters on an interval
        const scrambleChars = () => {
            if (isCancelled) return;

            for (let index = currentReveal; index < totalLength; index += 1) {
                if (text[index] !== " ") {
                    scrambleCharsRef.current[index] = generateRandomCharacter(charset);
                } else {
                    scrambleCharsRef.current[index] = " ";
                }
            }
            // Force a re-render by updating reveal count (even if same value)
            setRevealCount(prev => prev);
        };

        // Start intervals
        revealIntervalId = setInterval(revealNextChar, Math.max(1, revealDelayMs));
        scrambleIntervalId = setInterval(scrambleChars, Math.max(30, flipDelayMs));

        return () => {
            isCancelled = true;
            if (revealIntervalId) clearInterval(revealIntervalId);
            if (scrambleIntervalId) clearInterval(scrambleIntervalId);
            if (loopTimeoutId) clearTimeout(loopTimeoutId);
        };
    }, [isInView, text, revealDelayMs, charset, flipDelayMs, loop, loopDelayMs, cycleKey]);

    if (!text) return null;

    return (
        <motion.span
            ref={ref}
            className={cn(className)}
            aria-label={text}
            role="text"
            style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                willChange: 'contents',
                transform: 'translateZ(0)', // GPU acceleration
            }}
        >
            {text.split("").map((char, index) => {
                const isRevealed = index < revealCount;
                const displayChar = isRevealed
                    ? char
                    : char === " "
                        ? " "
                        : (scrambleCharsRef.current[index] ??
                            generateRandomCharacter(charset));

                return (
                    <span
                        key={index}
                        className={cn(isRevealed ? revealedClassName : encryptedClassName)}
                    >
                        {displayChar}
                    </span>
                );
            })}
        </motion.span>
    );
};
