import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { VideoBackground } from './VideoBackground';

interface CinematicHeaderProps {
  title: string;
  tagline?: string;
  videoSrc?: string;
  fallbackImage?: string;
  floatingElement?: 'planet' | 'nebula' | 'star';
  className?: string;
  children?: React.ReactNode;
}

/**
 * Reusable cinematic page header with video background and scroll transformations
 * Features hero-to-compact header transition with smooth animations
 */
export const CinematicHeader = ({ 
  title, 
  tagline, 
  videoSrc, 
  fallbackImage,
  floatingElement = 'planet',
  className = '',
  children 
}: CinematicHeaderProps) => {
  const [isCompact, setIsCompact] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Scroll transformation values
  const headerHeight = useTransform(scrollY, [0, 300], [400, 80]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.7]);
  const titleY = useTransform(scrollY, [0, 300], [0, -20]);
  const taglineOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const videoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const floatingY = useTransform(scrollY, [0, 1000], [0, -50]);

  // Intersection Observer for compact mode
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCompact(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  // Floating element component
  const FloatingElement = () => {
    const variants = {
      planet: {
        initial: { scale: 0.8, rotate: 0 },
        animate: { 
          scale: [0.8, 1, 0.8], 
          rotate: [0, 180, 360],
          y: [0, -10, 0]
        },
      },
      nebula: {
        initial: { scale: 0.9, opacity: 0.6 },
        animate: { 
          scale: [0.9, 1.1, 0.9], 
          opacity: [0.6, 0.8, 0.6],
          rotate: [0, -90, 0]
        },
      },
      star: {
        initial: { scale: 0.7, opacity: 0.8 },
        animate: { 
          scale: [0.7, 1, 0.7], 
          opacity: [0.8, 1, 0.8],
          rotate: [0, 360, 0]
        },
      },
    };

    const elementStyles = {
      planet: "w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl",
      nebula: "w-40 h-40 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-60 blur-xl",
      star: "w-24 h-24",
    };

    return (
      <motion.div
        className={`absolute ${elementStyles[floatingElement]} right-8 top-1/2 -translate-y-1/2`}
        variants={variants[floatingElement]}
        initial="initial"
        animate="animate"
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ y: floatingY }}
      >
        {floatingElement === 'star' && (
          <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400">
            <path fill="currentColor" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )}
      </motion.div>
    );
  };

  return (
    <>
      {/* Hero Header */}
      <motion.header
        ref={headerRef}
        className={`relative w-full overflow-hidden ${className}`}
        style={{ height: headerHeight }}
      >
        <VideoBackground 
          videoSrc={videoSrc}
          fallbackImage={fallbackImage}
          overlayOpacity={0.6}
        >
          <div className="content-container h-full flex items-center justify-center relative">
            {/* Floating Element */}
            <FloatingElement />

            {/* Content */}
            <motion.div 
              className="text-center z-10 max-w-4xl mx-auto px-4"
              style={{ scale: titleScale, y: titleY }}
            >
              <motion.h1 
                className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text-animated"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {title}
              </motion.h1>
              
              {tagline && (
                <motion.p 
                  className="font-sub text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8"
                  style={{ opacity: taglineOpacity }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  {tagline}
                </motion.p>
              )}

              {children && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  {children}
                </motion.div>
              )}
            </motion.div>
          </div>
        </VideoBackground>
      </motion.header>

      {/* Compact Header */}
      <AnimatePresence>
        {isCompact && (
          <motion.header
            className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/20"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="content-container py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.h2 
                    className="font-heading text-xl md:text-2xl font-bold gradient-text-animated"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {title}
                  </motion.h2>
                  {tagline && (
                    <motion.p 
                      className="hidden md:block text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    >
                      {tagline}
                    </motion.p>
                  )}
                </div>
                
                {/* Navigation placeholder */}
                <nav className="flex items-center gap-6">
                  <motion.a 
                    href="#"
                    className="link-text"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Home
                  </motion.a>
                  <motion.a 
                    href="#"
                    className="link-text"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    About
                  </motion.a>
                  <motion.a 
                    href="#"
                    className="link-text"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact
                  </motion.a>
                </nav>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content jump when header becomes fixed */}
      {isCompact && <div style={{ height: 80 }} />}
    </>
  );
};
