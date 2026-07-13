import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../data/content';
import { CanvasRevealEffect } from '../ui/canvas-reveal-effect';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.project-panel');

      panels.forEach((panel) => {
        const info = panel.querySelector('.project-info');
        const image = panel.querySelector('.project-image');
        const number = panel.querySelector('.project-number');

        if (number) {
          gsap.fromTo(number,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 0.75,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        if (info) {
          gsap.fromTo(info,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        if (image) {
          gsap.fromTo(image,
            { y: 100, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 65%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full text-bg bg-black">
      {/* Sticky Background Container */}
      <div className="sticky top-0 h-screen w-full z-0 pointer-events-none overflow-hidden mb-[-100vh]">
        <div className="absolute inset-0 z-0">
          <CanvasRevealEffect
            animationSpeed={1}
            containerClassName="bg-black"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
            dotSize={2}
            showGradient={false}
          />
        </div>
        {/* Center radial black gradient fade */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
      </div>

      <div
        ref={wrapperRef}
        className="flex flex-col w-full relative z-10"
      >
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="project-panel w-full min-h-screen flex flex-col md:flex-row items-center justify-center p-8 md:p-20 border-b border-white/5 relative overflow-hidden"
          >
            {/* Background Number with metallic shine effects edges */}
            <div
              className={`project-number absolute top-10 md:top-20 text-[10rem] md:text-[20rem] font-bold leading-none select-none animate-shine ${
                index % 2 === 0 ? 'left-10 md:left-20' : 'right-10 md:right-20'
              }`}
              style={{
                backgroundImage: 'linear-gradient(120deg, #3a3a3c 30%, #ffffff 45%, #ffffff 55%, #3a3a3c 70%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '2.5px rgba(255, 255, 255, 0.65)',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.25))',
              }}
            >
              0{index + 1}
            </div>

            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center z-10">

              {/* Text Info */}
              <div className={`project-info space-y-6 order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
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
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive mt-8 text-accent hover:text-white transition-colors flex items-center gap-2 group w-fit"
                    data-cursor="Open"
                  >
                    Visit Site
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-2 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                ) : project.status ? (
                  <span className="mt-8 text-white/40 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                    {project.status}
                  </span>
                ) : (
                  <button
                    className="interactive mt-8 text-accent hover:text-white transition-colors flex items-center gap-2 group w-fit"
                    data-cursor="Open"
                  >
                    View Case Study
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-2 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                )}
              </div>

              {/* Image Mockup */}
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-image order-1 relative group interactive cursor-pointer ${
                    index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                  }`}
                  data-cursor="View"
                >
                  <div className="relative rounded-xl shadow-2xl transform transition-transform duration-700 hover:scale-[1.02] p-[1px] overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,#3f3f46_45%,#e4e4e7_50%,#3f3f46_55%)] bg-[length:200%_100%] animate-shine opacity-80" />
                    <div className="relative h-full w-full bg-black rounded-[11px] overflow-hidden">
                      {project.video ? (
                        <video
                          src={project.video}
                          poster={project.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full aspect-[4/3] object-cover"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full aspect-[4/3] object-cover"
                        />
                      )}
                    </div>
                  </div>
                </a>
              ) : (
                <div
                  className={`project-image order-1 relative group interactive ${
                    index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                  }`}
                  data-cursor="View"
                >
                  <div className="relative rounded-xl shadow-2xl transform transition-transform duration-700 hover:scale-[1.02] p-[1px] overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,#3f3f46_45%,#e4e4e7_50%,#3f3f46_55%)] bg-[length:200%_100%] animate-shine opacity-80" />
                    <div className="relative h-full w-full bg-black rounded-[11px] overflow-hidden">
                      {project.video ? (
                        <video
                          src={project.video}
                          poster={project.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full aspect-[4/3] object-cover"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full aspect-[4/3] object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};