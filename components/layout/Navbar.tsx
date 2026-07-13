import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isProjectsSection, setIsProjectsSection] = useState(false);
  const [isContactSection, setIsContactSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu and handle body scroll lock
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

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

      // Check if we are in the Projects section
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        // Check if projects section overlaps with the navbar area (top part of screen)
        // Using 100px threshold to ensure smooth transition
        setIsProjectsSection(rect.top <= 100 && rect.bottom >= 100);
      }

      // Check if we are in the Contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        setIsContactSection(rect.top <= 100 && rect.bottom >= 100);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollProgress > 0.1;

  // dynamic styles overrides for projects section


  return (
    <>
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
          <a href="#" className={`group flex items-center text-xl font-bold tracking-tight cursor-pointer select-none transition-colors duration-300 ${isProjectsSection ? 'text-white' : 'text-text'}`}>
            <span>A</span>
            {/* Hidden Dot and 'darsh' reveal */}
            <span className="max-w-0 overflow-hidden group-hover:max-w-[0.6em] group-hover:opacity-100 opacity-0 transition-all duration-700 ease-custom-ease text-accent">.</span>
            <span>A</span>
            <span className="max-w-0 overflow-hidden group-hover:max-w-[3.2em] group-hover:opacity-100 opacity-0 transition-all duration-700 ease-custom-ease whitespace-nowrap">darsh</span>

            {/* Spacer for 'J' */}
            <span className="group-hover:ml-[0.3em] transition-all duration-700 ease-custom-ease">J</span>

            {/* 'agannath' reveal */}
            <span className="max-w-0 overflow-hidden group-hover:max-w-[5.5em] group-hover:opacity-100 opacity-0 transition-all duration-700 ease-custom-ease whitespace-nowrap">agannath</span>

            <span className={`transition-colors duration-500 ${isProjectsSection ? 'text-white' : 'text-accent group-hover:text-text'}`}>.</span>
          </a>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2">
            {['About', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`interactive text-sm font-medium transition-colors relative group ${isProjectsSection
                  ? 'text-white/80 hover:text-white'
                  : 'text-text/70 hover:text-text'
                  }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isProjectsSection ? 'bg-white' : 'bg-accent'}`}></span>
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/13a_HcGdcmYuMtErUUrvzEjTMp4vEDF6z/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="interactive px-5 py-2 bg-text text-bg text-sm rounded-full hover:bg-accent hover:text-text transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Empty spacer to maintain layout */}
          <div className="hidden md:block flex-1"></div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden ml-auto relative z-50 p-2 -mr-2 transition-colors duration-300 ${isMobileMenuOpen ? 'text-text' : (isProjectsSection ? 'text-white' : 'text-text')}`}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${isMobileMenuOpen ? 'rotate-45 translate-x-1' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${isMobileMenuOpen ? '-rotate-45 translate-x-1' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Move OUTSIDE nav to avoid backdrop-filter/transform containing block issues */}
      <div
        className={`fixed inset-0 bg-bg/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-custom-ease md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center gap-8">
          {['About', 'Projects', 'Contact'].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl font-light tracking-tight text-text hover:text-accent transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              {item}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/13a_HcGdcmYuMtErUUrvzEjTMp4vEDF6z/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 px-8 py-3 bg-text text-bg text-lg rounded-full hover:bg-accent hover:text-text transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
};