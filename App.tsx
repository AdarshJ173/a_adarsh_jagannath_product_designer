import React, { useEffect, useLayoutEffect, useState } from 'react';
import { initLenis } from './lib/smoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { Projects } from './components/projects/Projects';
import { Contact } from './components/contact/Contact';
import { Cursor } from './components/ui/Cursor';

function App() {
  const [loading, setLoading] = useState(true);

  // useLayoutEffect runs BEFORE the browser paints - critical for scroll lock
  useLayoutEffect(() => {
    // Lock scroll position IMMEDIATELY before any rendering
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Initialize Smooth Scroll
    const lenis = initLenis();

    // Force scroll to top again after Lenis initializes
    // This ensures we override any scroll position Lenis might restore
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    });

    // Keep forcing scroll to top at multiple intervals
    const scrollResetTimer1 = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 100);

    const scrollResetTimer2 = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 300);

    const scrollResetTimer3 = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 500);

    // Final lock after loading animation completes
    const scrollResetTimer4 = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 1600); // After the 1500ms loading animation

    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Force scroll to top one more time after loading completes
      setTimeout(() => {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
      }, 50);
    }, 1500);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
      clearTimeout(scrollResetTimer1);
      clearTimeout(scrollResetTimer2);
      clearTimeout(scrollResetTimer3);
      clearTimeout(scrollResetTimer4);
    };
  }, []);

  return (
    <>
      <Cursor />

      {/* Preloader Overlay */}
      <div
        className={`fixed inset-0 bg-text z-[100] flex items-center justify-center transition-all duration-1000 ease-custom-ease ${loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="text-bg text-4xl font-bold tracking-tighter animate-pulse">
          AAJ<span className="text-accent">.</span>
        </div>
      </div>

      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main className="w-full">
          <Hero />
          <div id="about">
            <About />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <Contact />
        </main>
      </div>
    </>
  );
}

export default App;