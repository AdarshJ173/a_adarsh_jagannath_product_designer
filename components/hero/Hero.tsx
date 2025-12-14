import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

// Background images in cycle order
const BACKGROUNDS = [
  '/assets/lpg.png',
  '/assets/frontAuraR.png',
  '/assets/rpngFix.png',
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const topBgRef = useRef<HTMLDivElement>(null);
  const bottomBgRef = useRef<HTMLDivElement>(null);
  const currentBgIndexRef = useRef(0);
  const animationRef = useRef<gsap.core.Tween | null>(null);

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
      const nextImage = BACKGROUNDS[nextBgIndex];
      const currentImage = BACKGROUNDS[currentBgIndexRef.current];

      // Update bottom layer to current before animating
      bottomBg.style.backgroundImage = `url(${currentImage})`;

      // Set the top layer to the NEW image (starting hidden)
      topBg.style.backgroundImage = `url(${nextImage})`;
      topBg.style.clipPath = `circle(0% at ${xPercent}% ${yPercent}%)`;

      // Update index immediately for next click
      currentBgIndexRef.current = nextBgIndex;

      // Animate radial reveal from click position - always expand outward
      animationRef.current = gsap.to(topBg, {
        clipPath: `circle(200% at ${xPercent}% ${yPercent}%)`,
        duration: 2.5,
        ease: 'power2.out',
        onComplete: () => {
          // After animation, update the bottom layer to match
          bottomBg.style.backgroundImage = `url(${nextImage})`;
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
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20"
      style={{ cursor: 'none' }}
      onClick={handleClick}
    >
      {/* Bottom Background Layer (persistent) */}
      <div
        ref={bottomBgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${BACKGROUNDS[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          cursor: 'none',
        }}
      />

      {/* Top Background Layer (animated reveal) */}
      <div
        ref={topBgRef}
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: `url(${BACKGROUNDS[1]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          clipPath: 'circle(0% at 50% 50%)',
          cursor: 'none',
        }}
      />

      <div className="container mx-auto relative z-10" style={{ cursor: 'none' }}>
        {/* Text Content */}
        <div ref={textRef} className="max-w-3xl">
          <div className="overflow-hidden mb-2">
            <h2 className="hero-text-line text-lg md:text-xl font-medium text-accent uppercase tracking-widest" style={{ cursor: 'none' }}>
              Digital Product Designer
            </h2>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-text-line text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-text mb-6" style={{ cursor: 'none' }}>
              Crafting <span className="font-serif italic text-muted">Digital</span> <br />
              Experiences.
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="hero-text-line text-lg md:text-xl text-muted max-w-lg leading-relaxed" style={{ cursor: 'none' }}>
              I blend aesthetics with functional psychology to build products that feel inevitable. Currently reshaping fintech at Studio Warp.
            </p>
          </div>

          <div className="hero-meta mt-12 flex gap-8">
            <button className="interactive group relative px-8 py-4 bg-text text-bg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95" style={{ cursor: 'none' }}>
              <span className="relative z-10 font-medium">View Projects</span>
              <div className="absolute inset-0 bg-warm scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-custom-ease" />
            </button>
            <a href="#contact" className="interactive flex items-center gap-2 text-text font-medium hover:text-accent transition-colors" style={{ cursor: 'none' }}>
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hero-meta flex flex-col items-center gap-2 z-10" style={{ cursor: 'none' }}>
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-text to-transparent opacity-30"></div>
      </div>
    </section>
  );
};