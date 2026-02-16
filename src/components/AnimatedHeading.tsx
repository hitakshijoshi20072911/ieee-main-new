import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedHeadingProps {
  children: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subheading?: string;
  className?: string;
  typewriter?: boolean;
  glow?: boolean;
  delay?: number;
  duration?: number;
  triggerOnce?: boolean;
  stagger?: number;
}

/**
 * Animated heading component with typewriter effect and silver glow
 * Features viewport-triggered animations and performance optimization
 */
export const AnimatedHeading = ({ 
  children, 
  variant = 'h1', 
  subheading,
  className = '',
  typewriter = false,
  glow = true,
  delay = 0,
  duration = 50,
  triggerOnce = true,
  stagger = 0
}: AnimatedHeadingProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce });

  // Typewriter effect
  const typewriterEffect = useCallback(() => {
    if (!typewriter || !children) return;

    setIsTyping(true);
    setIsComplete(false);
    setDisplayText('');

    let currentIndex = 0;
    const text = children.toString();

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextChar, duration);
      } else {
        setIsTyping(false);
        setIsComplete(true);
      }
    };

    setTimeout(typeNextChar, delay);
  }, [children, typewriter, delay, duration]);

  // Handle viewport entry
  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      if (typewriter) {
        typewriterEffect();
      }
    }
  }, [isInView, isVisible, typewriter, typewriterEffect]);

  // Reset when children change
  useEffect(() => {
    if (isVisible && typewriter) {
      setDisplayText('');
      setIsComplete(false);
      typewriterEffect();
    }
  }, [children, isVisible, typewriter, typewriterEffect]);

  // Heading variants
  const headingClasses = {
    h1: 'font-heading text-4xl md:text-5xl lg:text-6xl',
    h2: 'font-heading text-3xl md:text-4xl lg:text-5xl',
    h3: 'font-heading text-2xl md:text-3xl lg:text-4xl',
    h4: 'font-heading text-xl md:text-2xl lg:text-3xl',
    h5: 'font-heading text-lg md:text-xl lg:text-2xl',
    h6: 'font-heading text-base md:text-lg lg:text-xl',
  };

  const HeadingTag = variant;

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: "easeOut"
        }}
      >
        <motion.div
          className={`${headingClasses[variant]} ${glow ? 'text-silver' : ''} font-bold`}
          style={{
            textShadow: glow ? '0 0 20px rgba(192, 192, 192, 0.5)' : undefined
          }}
        >
          {typewriter ? (
            <>
              {displayText}
              {isTyping && (
                <motion.span
                  className="inline-block w-0.5 h-full bg-current ml-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </>
          ) : (
            children
          )}
        </motion.div>
      </motion.div>

      {/* Subheading */}
      {subheading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            delay: delay + 0.2,
            ease: "easeOut"
          }}
          className="mt-2"
        >
          <motion.p
            className="font-sub text-lg md:text-xl text-muted-foreground"
            style={{
              textShadow: glow ? '0 0 10px rgba(192, 192, 192, 0.3)' : undefined
            }}
          >
            {subheading}
          </motion.p>
        </motion.div>
      )}

      {/* Decorative elements */}
      {glow && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Top glow */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: delay + 0.5 }}
          />
          
          {/* Bottom glow */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: delay + 0.7 }}
          />
        </motion.div>
      )}
    </div>
  );
};

/**
 * Simple animated heading without typewriter effect
 */
export const SimpleAnimatedHeading = ({ 
  children, 
  variant = 'h1',
  subheading,
  className = '',
  glow = true,
  delay = 0
}: Omit<AnimatedHeadingProps, 'typewriter' | 'duration' | 'stagger' | 'triggerOnce'>) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

  const headingClasses = {
    h1: 'font-heading text-4xl md:text-5xl lg:text-6xl',
    h2: 'font-heading text-3xl md:text-4xl lg:text-5xl',
    h3: 'font-heading text-2xl md:text-3xl lg:text-4xl',
    h4: 'font-heading text-xl md:text-2xl lg:text-3xl',
    h5: 'font-heading text-lg md:text-xl lg:text-2xl',
    h6: 'font-heading text-base md:text-lg lg:text-xl',
  };

  const HeadingTag = variant;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.8, 
          delay,
          ease: "easeOut"
        }}
      >
        <motion.div
          className={`${headingClasses[variant]} ${glow ? 'text-silver' : ''} font-bold`}
          style={{
            textShadow: glow ? '0 0 20px rgba(192, 192, 192, 0.5)' : undefined
          }}
        >
          {children}
        </motion.div>
      </motion.div>

      {subheading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            delay: delay + 0.2,
            ease: "easeOut"
          }}
          className="mt-2"
        >
          <motion.p
            className="font-sub text-lg md:text-xl text-muted-foreground"
            style={{
              textShadow: glow ? '0 0 10px rgba(192, 192, 192, 0.3)' : undefined
            }}
          >
            {subheading}
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

// CSS for silver glow effect (to be added to index.css)
export const silverGlowCSS = `
  .text-silver {
    color: #c0c0c0;
    text-shadow: 0 0 20px rgba(192, 192, 192, 0.5);
  }

  @keyframes silver-glow {
    0%, 100% {
      text-shadow: 0 0 20px rgba(192, 192, 192, 0.5);
    }
    50% {
      text-shadow: 0 0 30px rgba(192, 192, 192, 0.8),
                  0 0 40px rgba(192, 192, 192, 0.4);
    }
  }

  .silver-glow-animated {
    animation: silver-glow 2s ease-in-out infinite;
  }
`;
