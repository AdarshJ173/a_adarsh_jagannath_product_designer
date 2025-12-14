import React, { useEffect, useState } from 'react';
import { initLenis } from './lib/smoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { Projects } from './components/projects/Projects';
import { Contact } from './components/contact/Contact';
import { Cursor } from './components/ui/Cursor';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Smooth Scroll
    const lenis = initLenis();

    // Simulate initial loading for 2s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
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
        <main className="w-full overflow-hidden">
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