import React, { useRef, useEffect } from 'react';
import { EXPERIENCE, SKILLS } from '../../data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bento-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-surface relative">
      <div className="container mx-auto">
        <div className="mb-16 md:mb-24 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-text">Beyond the Pixel</h2>
          <p className="text-xl text-muted leading-relaxed">
            I don't just design interfaces; I design business solutions. My process is deeply rooted in user research, iterative prototyping, and aesthetic refinement.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          
          {/* Card 1: Main Stats/Bio - Large Vertical */}
          <div className="bento-item md:col-span-1 md:row-span-2 bg-bg p-8 rounded-3xl shadow-sm border border-white/50 flex flex-col justify-between group hover:border-accent/30 transition-colors">
            <div>
              <div className="w-12 h-12 bg-text text-bg rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Philosophy</h3>
              <p className="text-muted leading-relaxed">
                Minimalism isn't about removing things you love. It's about removing the things that distract you from the things you love. I believe in calm technology.
              </p>
            </div>
            <div className="mt-8">
               <div className="text-5xl font-serif italic text-accent opacity-50">2025</div>
               <div className="text-sm uppercase tracking-widest text-text mt-2">Vision Ready</div>
            </div>
          </div>

          {/* Card 2: Experience - Horizontal */}
          <div className="bento-item md:col-span-2 bg-bg p-8 rounded-3xl shadow-sm border border-white/50 hover:border-accent/30 transition-colors">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
               Experience
             </h3>
             <div className="grid md:grid-cols-2 gap-8">
               {EXPERIENCE.map((exp, idx) => (
                 <div key={idx} className="relative pl-6 border-l border-muted/30">
                   <h4 className="text-lg font-bold text-text">{exp.role}</h4>
                   <p className="text-sm font-medium text-accent mb-2">{exp.company} • {exp.period}</p>
                   <p className="text-sm text-muted">{exp.desc}</p>
                 </div>
               ))}
             </div>
          </div>

          {/* Card 3: Skills - Small Box */}
          <div className="bento-item bg-bg p-8 rounded-3xl shadow-sm border border-white/50 hover:border-accent/30 transition-colors flex flex-col justify-center">
             <h3 className="text-xl font-bold mb-6">Toolbox</h3>
             <div className="flex flex-wrap gap-3">
               {SKILLS.map((skill, idx) => (
                 <span key={idx} className="px-3 py-1 bg-surface text-xs font-medium text-text rounded-full border border-muted/20">
                   {skill}
                 </span>
               ))}
             </div>
          </div>

          {/* Card 4: Services/CTA - Small Box with Image */}
          <div className="bento-item bg-text text-bg p-8 rounded-3xl shadow-sm overflow-hidden relative group interactive cursor-pointer">
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
              <h3 className="text-3xl font-serif italic mb-2">Let's work</h3>
              <p className="text-white/60 text-sm">Open for select projects</p>
            </div>
            <div className="absolute inset-0 bg-accent/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-700 ease-custom-ease opacity-30 blur-2xl -translate-x-1/2 translate-y-1/2"></div>
          </div>

        </div>
      </div>
    </section>
  );
};