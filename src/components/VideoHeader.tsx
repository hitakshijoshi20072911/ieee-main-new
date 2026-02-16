import { motion } from 'framer-motion';
import BackgroundVideo from './BackgroundVideo';
import { AnimatedHeading } from './AnimatedHeading';
import { scaleFadeVariants } from '@/hooks/useMotionAnimations';

interface VideoHeaderProps {
  title: string;
  tagline?: string;
  videoSrc: string;
  poster?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Shared header component with video background for Events, Recruitment, Gallery, Mentorship, and Profile pages
 */
export const VideoHeader: React.FC<VideoHeaderProps> = ({
  title,
  tagline,
  videoSrc,
  poster,
  className = '',
  children
}) => {
  return (
    <section className={`relative min-h-[60vh] overflow-hidden ${className}`}>
      <BackgroundVideo
        src={videoSrc}
        poster={poster}
        overlayOpacity={0.8}
        overlayGradient="linear-gradient(to bottom, rgba(5, 7, 13, 0.7), rgba(5, 7, 13, 0.9))"
        className="min-h-[60vh]"
      >
        <div className="content-container section-spacing h-full flex items-center justify-center text-center">
          <motion.div
            variants={scaleFadeVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <AnimatedHeading
              variant="h1"
              glow={true}
              className="mb-4"
            >
              {title}
            </AnimatedHeading>
            {tagline && (
              <AnimatedHeading
                variant="h2"
                glow={true}
                className="text-muted-foreground/80"
              >
                {tagline}
              </AnimatedHeading>
            )}
            {children}
          </motion.div>
        </div>
      </BackgroundVideo>
    </section>
  );
};

export default VideoHeader;
