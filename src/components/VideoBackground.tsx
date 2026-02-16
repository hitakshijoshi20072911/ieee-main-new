import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImage?: string;
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Video background component with fallback infrastructure
 * Prepares the layout for future video integration
 */
export const VideoBackground = ({ 
  videoSrc, 
  fallbackImage,
  overlayOpacity = 0.7,
  className = '',
  children 
}: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoad = () => setIsVideoLoaded(true);
    const handleError = () => {
      setHasError(true);
      setIsVideoLoaded(false);
    };

    video.addEventListener('loadeddata', handleLoad);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoad);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Video Layer */}
      {videoSrc && !hasError && (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}

      {/* Fallback Image Layer */}
      {(!videoSrc || hasError) && fallbackImage && (
        <motion.img
          src={fallbackImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}

      {/* Overlay Gradient Layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            hsl(225 50% 3% / ${overlayOpacity}) 100%
          )`
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 pointer-events-auto">
        {children}
      </div>

      {/* Loading State */}
      {videoSrc && !isVideoLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <div className="w-4 h-4 border-2 border-primary/30 border-t-transparent border-r-transparent border-b-transparent animate-spin" />
              <span className="caption-text">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
