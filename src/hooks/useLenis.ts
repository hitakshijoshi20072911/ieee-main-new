import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * Optimized Lenis smooth scroll hook with React Strict Mode compatibility
 * Features:
 * - RequestAnimationFrame loop integration
 * - Proper cleanup on unmount
 * - Mobile fallback to native scroll
 * - Accessibility preservation
 */
export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if we're on mobile - fallback to native scroll for better performance
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    
    if (isMobile) {
      return;
    }

    // Initialize Lenis with correct API
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Integration with requestAnimationFrame
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    
    rafId.current = requestAnimationFrame(raf);

    // Cleanup function for React Strict Mode compatibility
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Expose Lenis instance for external controls if needed
  return lenisRef.current;
};
