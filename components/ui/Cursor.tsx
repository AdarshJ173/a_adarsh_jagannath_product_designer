import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  
  // Use refs for values to avoid re-renders on every mouse move
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Initial Setup
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    
    if (!cursor || !cursorText) return;

    // Center cursor initially
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // Animation Loop for smooth physics
    const loop = () => {
      // Linear interpolation (lerp) for smooth trailing delay
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * dt;
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * dt;

      gsap.set(cursor, {
        x: delayedMouse.current.x,
        y: delayedMouse.current.y
      });
      
      requestAnimationFrame(loop);
    };
    const rafId = requestAnimationFrame(loop);

    // Hover Event Listeners
    const onMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Check for specific cursor text (e.g., "VIEW" on projects)
      const text = target.getAttribute('data-cursor');
      const isInteractive = target.classList.contains('interactive') || target.tagName === 'A' || target.tagName === 'BUTTON';

      if (text) {
        cursorText.textContent = text;
        gsap.to(cursor, { 
          width: 100, 
          height: 100, 
          backgroundColor: '#F0F0F0', // Light surface for text contrast in difference mode
          duration: 0.4, 
          ease: 'power3.out' 
        });
        gsap.to(cursorText, { opacity: 1, scale: 1, duration: 0.3 });
      } else if (isInteractive) {
        cursorText.textContent = '';
        gsap.to(cursor, { 
          width: 60, 
          height: 60, 
          backgroundColor: '#FFFFFF',
          duration: 0.4, 
          ease: 'power3.out' 
        });
        gsap.to(cursorText, { opacity: 0, scale: 0, duration: 0.3 });
      }
    };

    const onMouseLeave = () => {
      // Reset to default dot
      gsap.to(cursor, { 
        width: 12, 
        height: 12, 
        backgroundColor: '#FFFFFF',
        duration: 0.4, 
        ease: 'power3.out' 
      });
      gsap.to(cursorText, { opacity: 0, scale: 0, duration: 0.3 });
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Attach listeners dynamically
    const addListeners = () => {
      const elements = document.querySelectorAll('a, button, .interactive, [data-cursor]');
      elements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    addListeners();
    
    // Re-attach listeners on DOM changes (simple observer)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      
      const elements = document.querySelectorAll('a, button, .interactive, [data-cursor]');
      elements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center overflow-hidden hidden md:flex"
      style={{ willChange: 'transform, width, height' }}
    >
      <span 
        ref={cursorTextRef}
        className="text-[10px] font-bold text-black uppercase tracking-widest opacity-0 scale-0"
      >
      </span>
    </div>
  );
};