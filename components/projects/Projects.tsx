import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.project-panel');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: `+=${containerRef.current?.offsetWidth || 0 * 2}`, // Scroll distance
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen bg-text overflow-hidden text-bg">
      <div 
        ref={wrapperRef} 
        className="flex h-full w-full" 
        style={{ width: `${PROJECTS.length * 100}%` }}
      >
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id} 
            className="project-panel w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-20 border-r border-white/5 relative"
          >
            {/* Background Number */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[10rem] md:text-[20rem] font-bold opacity-[0.03] leading-none select-none">
              0{index + 1}
            </div>

            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
              
              {/* Text Info */}
              <div className="order-2 md:order-1 space-y-6">
                <div className="flex items-center gap-4">
                   <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-wider">{project.category}</span>
                   <span className="text-xs text-white/50">{project.year}</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-bold leading-tight">
                  {project.title}
                </h3>
                <p className="text-lg text-white/60 max-w-md leading-relaxed">
                  {project.description}
                </p>
                <button 
                  className="interactive mt-8 text-accent hover:text-white transition-colors flex items-center gap-2 group"
                  data-cursor="Open"
                >
                  View Case Study
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-2 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>

              {/* Image Mockup */}
              <div 
                className="order-1 md:order-2 relative group interactive"
                data-cursor="View"
              >
                <div className="overflow-hidden rounded-xl shadow-2xl transform transition-transform duration-700 hover:scale-[1.02]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-custom-ease"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};