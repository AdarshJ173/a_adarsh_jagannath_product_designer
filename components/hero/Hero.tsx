import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-20"
      style={{
        backgroundImage: 'url(/assets/lpg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-bg/60" />
      
      <div className="container mx-auto relative z-10">
        
        {/* Text Content */}
        <div ref={textRef} className="max-w-3xl">
          <div className="overflow-hidden mb-2">
            <h2 className="hero-text-line text-lg md:text-xl font-medium text-accent uppercase tracking-widest">
              Digital Product Designer
            </h2>
          </div>
          
          <div className="overflow-hidden">
            <h1 className="hero-text-line text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-text mb-6">
              Crafting <span className="font-serif italic text-muted">Digital</span> <br />
              Experiences.
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="hero-text-line text-lg md:text-xl text-muted max-w-lg leading-relaxed">
              I blend aesthetics with functional psychology to build products that feel inevitable. Currently reshaping fintech at Studio Warp.
            </p>
          </div>

          <div className="hero-meta mt-12 flex gap-8">
            <button className="interactive group relative px-8 py-4 bg-text text-bg rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 font-medium">View Projects</span>
              <div className="absolute inset-0 bg-warm scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-custom-ease" />
            </button>
            <a href="#contact" className="interactive flex items-center gap-2 text-text font-medium hover:text-accent transition-colors">
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hero-meta flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-text to-transparent opacity-30"></div>
      </div>
    </section>
  );
};