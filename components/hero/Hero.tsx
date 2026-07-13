import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { FlipWords } from '@/components/ui/flip-words';
import PixelSnow from '@/components/ui/PixelSnow';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-[65%_center] md:bg-center"
        style={{
          backgroundImage: "url('/assets/hero_bg.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Pixel Snow Particle Background */}
      <PixelSnow 
        color="#121212"
        flakeSize={0.012}
        minFlakeSize={1.5}
        pixelResolution={220}
        speed={1.0}
        density={0.25}
        direction={125}
        brightness={1}
        className="z-[1] pointer-events-none"
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
              I turn complex visions into production-ready reality.<br className="hidden md:block" />
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
            <a href="#projects" className="interactive group relative px-8 py-4 bg-text text-bg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto flex items-center justify-center" style={{ cursor: 'none' }}>
              <span className="relative z-10 font-medium transition-colors duration-300 group-hover:text-text">See My Work</span>
              <div className="absolute inset-0 bg-warm scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-custom-ease" />
            </a>
            <a href="#contact" className="interactive group flex items-center justify-center gap-2 text-text font-medium hover:text-accent transition-colors w-full sm:w-auto" style={{ cursor: 'none' }}>
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