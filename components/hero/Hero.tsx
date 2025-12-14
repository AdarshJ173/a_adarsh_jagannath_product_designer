import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { FlipWords } from '@/components/ui/flip-words';

// Background images in cycle order
const BACKGROUNDS = [
  '/assets/lpg_opt.webp',
  '/assets/frontAuraR_opt.webp',
  '/assets/rpngFix_opt.webp',
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const topBgRef = useRef<HTMLDivElement>(null);
  const bottomBgRef = useRef<HTMLDivElement>(null);

  // Initialize from localStorage or default to 0
  const [currentBgIndex, setCurrentBgIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hero-bg-index');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const currentBgIndexRef = useRef(currentBgIndex);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Sync ref with state
  useEffect(() => {
    currentBgIndexRef.current = currentBgIndex;
    localStorage.setItem('hero-bg-index', currentBgIndex.toString());
  }, [currentBgIndex]);

  // Preload images
  useEffect(() => {
    BACKGROUNDS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Set initial background images (Only once on mount/state init via ref to avoid React render conflicts)
  useEffect(() => {
    const bottomBg = bottomBgRef.current;
    const topBg = topBgRef.current;

    if (bottomBg && topBg) {
      // Set initial styles based on saved index
      const currentIndex = currentBgIndexRef.current;
      const nextIndex = (currentIndex + 1) % BACKGROUNDS.length;

      bottomBg.style.backgroundImage = `url(${BACKGROUNDS[currentIndex]})`;
      topBg.style.backgroundImage = `url(${BACKGROUNDS[nextIndex]})`;
    }
  }, []); // Run once on mount to set initial DOM state

  // Handle click to trigger radial reveal from click position - NO BLOCKING
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Ignore clicks on interactive elements (buttons, links, nav)
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('nav') ||
      target.closest('.interactive')
    ) {
      return;
    }

    // Get click position as percentage
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const topBg = topBgRef.current;
    const bottomBg = bottomBgRef.current;

    if (topBg && bottomBg) {
      // Kill any existing animation immediately
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Get next background index (cycle through 0 → 1 → 2 → 0 → ...)
      const nextBgIndex = (currentBgIndexRef.current + 1) % BACKGROUNDS.length;
      const nextImage = BACKGROUNDS[nextBgIndex]; // The image we are revealing
      const currentImage = BACKGROUNDS[currentBgIndexRef.current]; // The image currently visible

      // Ensure bottom layer is the current visible image
      bottomBg.style.backgroundImage = `url(${currentImage})`;

      // Prepare top layer with the NEW image (starting hidden at click pos)
      topBg.style.backgroundImage = `url(${nextImage})`;
      gsap.set(topBg, { clipPath: `circle(0% at ${xPercent}% ${yPercent}%)` });

      // Update index immediately for next click logic & dots
      setCurrentBgIndex(nextBgIndex);

      // Animate radial reveal from click position
      animationRef.current = gsap.to(topBg, {
        clipPath: `circle(200% at ${xPercent}% ${yPercent}%)`,
        duration: 1.5,
        ease: 'power2.out',
        onComplete: () => {
          // After animation, make the bottom layer the new image
          // so it persists behind the next reveal
          bottomBg.style.backgroundImage = `url(${nextImage})`;

          // Preload/Setup top layer for *next* interaction (optional, but good for logic)
          // Actually, we don't strictly need to set topBg here because handleClick sets it,
          // but keeping them consistent is fine.
          const nextNextIndex = (nextBgIndex + 1) % BACKGROUNDS.length;
          topBg.style.backgroundImage = `url(${BACKGROUNDS[nextNextIndex]})`;
          gsap.set(topBg, { clipPath: 'circle(0% at 50% 50%)' }); // Reset clip
        }
      });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial Load Animation
      const tl = gsap.timeline({ defaults: { ease: 'custom-ease' } });

      tl.fromTo('.hero-text-line',
        { y: 100, opacity: 0, rotate: 2 },
        { y: 0, opacity: 1, rotate: 0, duration: 1.2, stagger: 0.1, delay: 0.2 }
      )
        .fromTo('.hero-meta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center px-6 overflow-hidden pt-20"
      style={{ cursor: 'none', willChange: 'transform' }}
      onClick={handleClick}
      data-cursor="TAP ME"
      data-cursor-type="hero"
      data-hero-index={currentBgIndex}
      data-total-images={BACKGROUNDS.length}
    >
      {/* Bottom Background Layer (persistent) */}
      <div
        ref={bottomBgRef}
        className="absolute inset-0 z-0 bg-[65%_center] md:bg-center"
        style={{
          // backgroundImage removed here to prevent React overrides
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          cursor: 'none',
        }}
      />

      {/* Top Background Layer (animated reveal) */}
      <div
        ref={topBgRef}
        className="absolute inset-0 z-[1] bg-[65%_center] md:bg-center"
        style={{
          // backgroundImage removed here to prevent React overrides
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          clipPath: 'circle(0% at 50% 50%)',
          cursor: 'none',
        }}
      />

      <div className="container mx-auto relative z-10 flex flex-col items-center md:items-start md:justify-center h-full w-full" style={{ cursor: 'none' }}>
        {/* Text Content */}
        <div ref={textRef} className="w-full max-w-4xl md:max-w-6xl px-4 md:px-0 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="overflow-hidden mb-2 md:mb-4">
            <h2 className="hero-text-line text-sm md:text-lg lg:text-xl font-medium text-accent uppercase tracking-[0.2em] md:tracking-widest" style={{ cursor: 'none' }}>
              Software Engineer
            </h2>
          </div>

          <div className="overflow-hidden w-full">
            <h1 className="hero-text-line text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] md:leading-[0.9] tracking-tight text-text mb-6 md:mb-8 flex flex-col md:block items-center md:items-start" style={{ cursor: 'none' }}>
              <span>Visions{' '}</span>
              <span className="inline-block relative w-[4.2em] h-[1.1em] align-bottom md:align-baseline transform translate-y-[0.1em] md:translate-y-[0.25em]">
                <TextHoverEffect text="Deserve" duration={0.3} />
              </span>
              <span className="block md:inline"><br className="hidden md:block" />Execution.</span>
            </h1>
          </div>

          <div className="overflow-hidden w-full">
            <p className="hero-text-line text-base sm:text-lg md:text-xl text-muted max-w-xl md:max-w-2xl leading-relaxed mx-auto md:mx-0" style={{ cursor: 'none' }}>
              I turn complex visions into production-ready products.<br className="hidden md:block" />
              Obsessed with UX, authenticity, and building things<br className="hidden md:block" />
              that make life easier —{' '}
              <span className="relative inline-block md:inline whitespace-normal md:whitespace-nowrap mt-2 md:mt-0">
                <FlipWords
                  words={["building the future.", "on my way to Google."]}
                  duration={3500}
                  className="text-accent font-medium !inline"
                />
              </span>
            </p>
          </div>

          <div className="hero-meta mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
            <button className="interactive group relative px-8 py-4 bg-text text-bg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto" style={{ cursor: 'none' }}>
              <span className="relative z-10 font-medium">See My Work</span>
              <div className="absolute inset-0 bg-warm scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-custom-ease" />
            </button>
            <a href="#contact" className="interactive flex items-center justify-center gap-2 text-text font-medium hover:text-accent transition-colors w-full sm:w-auto" style={{ cursor: 'none' }}>
              Let's Connect
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hide on short screens or small mobiles if needed, but keep for now */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hero-meta flex flex-col items-center gap-2 z-10 hidden sm:flex" style={{ cursor: 'none' }}>
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-text to-transparent opacity-30"></div>
      </div>
    </section>
  );
};