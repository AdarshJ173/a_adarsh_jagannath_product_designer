import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const cursorDotRef = useRef<HTMLSpanElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  // Track current hovered target to observe attribute changes
  const hoveredTargetRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  // Use refs for values to avoid re-renders on every mouse move
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initial Setup
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    const cursorDot = cursorDotRef.current;
    const dotsContainer = dotsContainerRef.current;

    if (!cursor || !cursorText || !cursorDot || !dotsContainer) return;

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

    // Function to update dots state
    const updateDots = (target: HTMLElement) => {
      const indexAttr = target.getAttribute('data-hero-index');
      if (indexAttr !== null) {
        setActiveDotIndex(parseInt(indexAttr, 10));
      }
    };

    // Hover Event Listeners
    const onMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      hoveredTargetRef.current = target;

      const cursorType = target.getAttribute('data-cursor-type');
      const text = target.getAttribute('data-cursor');
      const isInteractive = target.classList.contains('interactive') || target.tagName === 'A' || target.tagName === 'BUTTON';

      // Disconnect existing observer if any
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (cursorType === 'hero') {
        // Hero Mode - show TAP ME text and dot indicator
        cursorText.textContent = text || 'TAP ME';
        updateDots(target); // Initial sync

        // Observe attribute changes on the target (for click updates)
        observerRef.current = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-hero-index') {
              updateDots(target);
            }
          });
        });
        observerRef.current.observe(target, { attributes: true });

        // Animate to Hero State - minimalist approach
        gsap.to(cursor, {
          width: 24, // Smaller size
          height: 24,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(cursorText, { opacity: 1, y: -20, duration: 0.3 }); // Text above cursor
        gsap.to(cursorDot, { opacity: 0 }); // Hide main dot
        gsap.to(dotsContainer, { opacity: 1, scale: 1, duration: 0.3 }); // Show indicator dots

      } else if (text) {
        // Standard Text Hover (like Project View)
        cursorText.textContent = text;
        gsap.to(cursor, {
          width: 20,
          height: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(cursorText, { opacity: 1, y: -20, duration: 0.3 });
        gsap.to(cursorDot, { opacity: 0 });
        gsap.to(dotsContainer, { opacity: 0, scale: 0, duration: 0.2 });
      } else if (isInteractive) {
        // Standard Interactive (Button/Link) - subtle enhancement
        cursorText.textContent = '';
        gsap.to(cursor, {
          width: 16,
          height: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(cursorText, { opacity: 0, duration: 0.2 });
        gsap.to(cursorDot, { opacity: 0 });
        gsap.to(dotsContainer, { opacity: 0, scale: 0, duration: 0.2 });
      }
    };

    const onMouseLeave = () => {
      hoveredTargetRef.current = null;
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // Reset to default state - minimal dot
      gsap.to(cursor, {
        width: 8,
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(cursorText, { opacity: 0, duration: 0.2 });
      gsap.to(cursorDot, { opacity: 1, scale: 1, duration: 0.3 }); // Show main dot
      gsap.to(dotsContainer, { opacity: 0, scale: 0, duration: 0.2 });
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.3)' });
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
    const domObserver = new MutationObserver(addListeners);
    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
      domObserver.disconnect();
      if (observerRef.current) observerRef.current.disconnect();

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
      className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex flex-col items-center justify-center overflow-hidden hidden md:flex"
      style={{ willChange: 'transform, width, height' }}
    >
      {/* Main cursor dot */}
      <span
        ref={cursorDotRef}
        className="w-full h-full bg-white rounded-full"
      ></span>
      
      {/* Text label */}
      <span
        ref={cursorTextRef}
        className="text-[9px] font-medium text-black uppercase tracking-wider opacity-0 -mt-2"
      >
      </span>

      {/* Indicator dots for hero section */}
      <div
        ref={dotsContainerRef}
        className="flex space-x-1 mt-2 opacity-0"
      >
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`w-1 h-1 rounded-full transition-colors duration-200 ${activeDotIndex === idx ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};