import { motion } from 'framer-motion';
import { CinematicHeader } from '@/components/CinematicHeader';
import GlassCard from '@/components/GlassCard';
import { ArrowRight, Zap, Star, Rocket } from 'lucide-react';
import { 
  staggerContainer, 
  cardVariants, 
  scrollRevealVariants 
} from '@/hooks/useMotionAnimations';

const CinematicDemo = () => {
  return (
    <div className="min-h-screen">
      {/* Cinematic Header */}
      <CinematicHeader
        title="Cinematic Experience"
        tagline="Transform your web presence with stunning visual storytelling"
        videoSrc="/videos/hero-video.mp4" // Replace with actual video
        fallbackImage="/hero-planet.jpg"
        floatingElement="planet"
      >
        <motion.div
          className="flex justify-center gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            variants={cardVariants}
            custom={0}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card-hover px-8 py-3 rounded-full font-sub font-medium text-primary"
          >
            Get Started
          </motion.button>
          <motion.button
            variants={cardVariants}
            custom={1}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card px-8 py-3 rounded-full font-sub font-medium"
          >
            Learn More
          </motion.button>
        </motion.div>
      </CinematicHeader>

      {/* Content Sections */}
      <section className="content-container section-spacing">
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">Features & Capabilities</h2>
          <p className="body-text-large max-w-3xl mx-auto">
            Experience the power of cinematic web design with our cutting-edge header component
          </p>
        </motion.div>

        <motion.div
          className="grid-responsive-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={cardVariants} custom={0}>
            <GlassCard className="p-6 h-full flex flex-col items-center text-center" variant="morph">
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="card-title mb-3">Lightning Fast</h3>
              <p className="body-text flex-1">
                Optimized performance with lazy loading and smooth animations
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={cardVariants} custom={1}>
            <GlassCard className="p-6 h-full flex flex-col items-center text-center" variant="morph">
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="card-title mb-3">Stunning Visuals</h3>
              <p className="body-text flex-1">
                Beautiful gradients, glassmorphism, and cinematic effects
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={cardVariants} custom={2}>
            <GlassCard className="p-6 h-full flex flex-col items-center text-center" variant="morph">
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-4">
                <Rocket className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="card-title mb-3">Future Ready</h3>
              <p className="body-text flex-1">
                Built with modern React, TypeScript, and performance in mind
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>

      {/* Technical Details */}
      <section className="content-container section-spacing">
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title mb-8">Technical Excellence</h2>
          <div className="grid-responsive-2 gap-8">
            <GlassCard className="p-6" variant="shimmer">
              <h3 className="card-title mb-4">Performance Optimized</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="body-text">Lazy video loading with fallback images</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="body-text">GPU-accelerated animations</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="body-text">Mobile-optimized performance</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="body-text">Intersection Observer for efficiency</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6" variant="shimmer">
              <h3 className="card-title mb-4">Developer Experience</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="body-text">Reusable component architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="body-text">TypeScript safety throughout</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="body-text">Framer Motion integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span className="body-text">Tailwind CSS styling</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </motion.div>
      </section>

      {/* Scroll Test Section */}
      <section className="content-container section-spacing pb-32">
        <motion.div
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="section-title mb-4">Scroll to Test Header Transformation</h2>
          <p className="body-text-large mb-8">
            Scroll down to see the cinematic header transform into a compact navigation bar
          </p>
          
          <div className="space-y-8">
            {[...Array(10)].map((_, index) => (
              <GlassCard key={index} className="p-8" variant="morph">
                <h3 className="card-title mb-4">Section {index + 1}</h3>
                <p className="body-text">
                  Keep scrolling to test the smooth header transformation. The header will automatically
                  convert to a compact navigation bar when you scroll past the hero section.
                </p>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CinematicDemo;
