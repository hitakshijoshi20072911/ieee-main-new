import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundVideoProps {
  src: string;
  poster?: string;
  overlayOpacity?: number;
  overlayGradient?: string;
  className?: string;
  children?: React.ReactNode;
  lazy?: boolean;
  pauseOnInactive?: boolean;
}

/**
 * Reusable background video component with performance optimizations
 * Features lazy loading, pause on inactive tab, and overlay support
 */
export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src,
  poster,
  overlayOpacity = 0.7,
  overlayGradient = 'linear-gradient(to bottom, rgba(5, 7, 13, 0.8), rgba(5, 7, 13, 0.9))',
  className = '',
  children,
  lazy = true,
  pauseOnInactive = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [isTabActive, setIsTabActive] = useState(true);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const videoElement = videoRef.current;
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [lazy]);

  // Tab visibility handling for performance
  useEffect(() => {
    if (!pauseOnInactive) return;

    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pauseOnInactive]);

  // Video playback control
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const shouldPlay = isInView && isTabActive;
    
    if (shouldPlay && !video.paused) {
      // Video is already playing
      return;
    }

    if (shouldPlay) {
      video.play().catch(error => {
        console.warn('Video autoplay failed:', error);
      });
    } else {
      video.pause();
    }
  }, [isInView, isTabActive]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      <motion.video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={!lazy}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
        onLoadedData={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Overlay for readability */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: overlayGradient,
          opacity: overlayOpacity
        }}
      />

      {/* Content */}
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}

      {/* Loading fallback */}
      {!isLoaded && (
        <div className="absolute inset-0 w-full h-full bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default BackgroundVideo;
