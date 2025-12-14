import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is full viewport height
      const heroHeight = window.innerHeight;
      // Start fading in navbar background only when approaching the END of hero section
      // fadeStart: 80% of hero height, fadeEnd: 100% of hero height
      const fadeStart = heroHeight * 0.8;
      const fadeEnd = heroHeight;

      let progress = 0;
      if (window.scrollY > fadeStart) {
        // Calculate progress from 0 to 1 as we scroll from fadeStart to fadeEnd
        progress = Math.min(1, (window.scrollY - fadeStart) / (fadeEnd - fadeStart));
      }
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollProgress > 0.1;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}
      style={{
        // Translucent liquid glass effect - light frosted glass with subtle tint
        backgroundColor: scrollProgress > 0
          ? `rgba(255, 255, 255, ${scrollProgress * 0.08})`
          : 'transparent',
        backdropFilter: scrollProgress > 0 ? `blur(${scrollProgress * 16}px) saturate(${1 + scrollProgress * 0.5})` : 'none',
        WebkitBackdropFilter: scrollProgress > 0 ? `blur(${scrollProgress * 16}px) saturate(${1 + scrollProgress * 0.5})` : 'none',
        borderBottom: scrollProgress > 0.3
          ? `1px solid rgba(255, 255, 255, ${scrollProgress * 0.1})`
          : 'none',
        boxShadow: scrollProgress > 0.5
          ? `0 4px 30px rgba(0, 0, 0, ${scrollProgress * 0.05})`
          : 'none',
      }}
    >
      <div className="container mx-auto px-6 flex items-center relative">
        {/* Animated Logo: AAJ -> A.Adarsh Jagannath - stays on left */}
        <a href="#" className="group flex items-center text-xl font-bold tracking-tight text-text cursor-pointer select-none">
          <span>A</span>
          {/* Hidden Dot and 'darsh' reveal */}
          <span className="max-w-0 overflow-hidden group-hover:max-w-[0.6em] group-hover:opacity-100 opacity-0 transition-all duration-700 ease-custom-ease text-accent">.</span>
          <span>A</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[3.2em] group-hover:opacity-100 opacity-0 transition-all duration-700 ease-custom-ease whitespace-nowrap">darsh</span>

          {/* Spacer for 'J' */}
          <span className="group-hover:ml-[0.3em] transition-all duration-700 ease-custom-ease">J</span>

          {/* 'agannath' reveal */}
          <span className="max-w-0 overflow-hidden group-hover:max-w-[5.5em] group-hover:opacity-100 opacity-0 transition-all duration-700 ease-custom-ease whitespace-nowrap">agannath</span>

          <span className="text-accent group-hover:text-text transition-colors duration-500">.</span>
        </a>

        {/* Centered Navigation Links */}
        <div className="hidden md:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2">
          {['About', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="interactive text-sm font-medium text-text/70 hover:text-text transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button className="interactive px-5 py-2 bg-text text-bg text-sm rounded-full hover:bg-accent transition-colors">
            Let's Talk
          </button>
        </div>

        {/* Empty spacer to maintain layout */}
        <div className="hidden md:block flex-1"></div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </div>
      </div>
    </nav>
  );
};