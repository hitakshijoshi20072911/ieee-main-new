import { useState } from 'react';
import { motion } from 'framer-motion';
import { CinematicHeader } from '@/components/CinematicHeader';
import { AnimatedHeading, SimpleAnimatedHeading } from '@/components/AnimatedHeading';
import GlassCard from '@/components/GlassCard';
import { staggerContainer, cardVariants } from '@/hooks/useMotionAnimations';
import { Code, Sparkles, Zap, Rocket } from 'lucide-react';

const AnimatedHeadingDemo = () => {
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  const examples = [
    {
      title: "Typewriter Effect",
      description: "Character-by-character reveal with cursor",
      component: (
        <AnimatedHeading
          key={`typewriter-${key}`}
          variant="h2"
          typewriter={true}
          glow={true}
          delay={0}
          duration={50}
          className="mb-8"
        >
          Welcome to the Future of Web
        </AnimatedHeading>
      )
    },
    {
      title: "Simple Animation",
      description: "Smooth fade and slide animation",
      component: (
        <SimpleAnimatedHeading
          key={`simple-${key}`}
          variant="h3"
          glow={true}
          delay={0}
          subheading="Clean and elegant animation"
          className="mb-8"
        >
          Innovation Meets Design
        </SimpleAnimatedHeading>
      )
    },
    {
      title: "Fast Typewriter",
      description: "Quick character reveal",
      component: (
        <AnimatedHeading
          key={`fast-${key}`}
          variant="h4"
          typewriter={true}
          glow={true}
          delay={0}
          duration={20}
          className="mb-8"
        >
          Lightning Fast Experience
        </AnimatedHeading>
      )
    },
    {
      title: "No Glow",
      description: "Clean typography without effects",
      component: (
        <AnimatedHeading
          key={`no-glow-${key}`}
          variant="h3"
          typewriter={true}
          glow={false}
          delay={0}
          duration={40}
          className="mb-8"
        >
          Minimalist Approach
        </AnimatedHeading>
      )
    },
    {
      title: "With Subheading",
      description: "Main title with descriptive text",
      component: (
        <AnimatedHeading
          key={`subheading-${key}`}
          variant="h2"
          typewriter={true}
          glow={true}
          delay={0}
          duration={30}
          subheading="Experience the power of modern web animations"
          className="mb-8"
        >
          Advanced Animation System
        </AnimatedHeading>
      )
    },
    {
      title: "Different Sizes",
      description: "Various heading sizes available",
      component: (
        <div className="space-y-6 mb-8">
          <AnimatedHeading
            key={`h1-${key}`}
            variant="h1"
            typewriter={true}
            glow={true}
            delay={0}
            duration={25}
          >
            Massive Heading
          </AnimatedHeading>
          <AnimatedHeading
            key={`h2-${key}`}
            variant="h2"
            typewriter={true}
            glow={true}
            delay={0}
            duration={25}
          >
            Large Heading
          </AnimatedHeading>
          <AnimatedHeading
            key={`h3-${key}`}
            variant="h3"
            typewriter={true}
            glow={true}
            delay={0}
            duration={25}
          >
            Medium Heading
          </AnimatedHeading>
          <AnimatedHeading
            key={`h4-${key}`}
            variant="h4"
            typewriter={true}
            glow={true}
            delay={0}
            duration={25}
          >
            Small Heading
          </AnimatedHeading>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      <CinematicHeader
        title="Animated Heading System"
        tagline="Typewriter effects, silver glow, and viewport-triggered animations"
        fallbackImage="/hero-planet.jpg"
        floatingElement="star"
      />
      
      <div className="content-container section-spacing">
        {/* Introduction */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div variants={cardVariants} custom={0}>
            <GlassCard className="p-6 mb-6" glow="blue">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl text-foreground">
                  Interactive Animation Demo
                </h3>
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <p className="text-muted-foreground mb-4">
                Scroll through the examples below to see the animated headings in action.
                Each heading triggers when it enters the viewport.
              </p>
              <motion.button
                onClick={handleReset}
                className="glass-card px-6 py-3 rounded-lg font-sub font-medium text-primary flex items-center justify-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-4 h-4" />
                Reset Animations
              </motion.button>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Examples Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {examples.map((example, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
            >
              <GlassCard className="p-6 h-full" glow="teal">
                <div className="mb-4">
                  <h4 className="font-sub text-lg text-foreground mb-2">
                    {example.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {example.description}
                  </p>
                </div>
                <div className="min-h-[120px] flex items-center justify-center">
                  {example.component}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Code Examples */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <motion.div variants={cardVariants} custom={0}>
            <GlassCard className="p-8" glow="violet">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-6 h-6 text-accent" />
                <h3 className="font-heading text-xl text-foreground">
                  Usage Examples
                </h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-sub text-sm text-primary mb-2">Basic Typewriter Heading</h4>
                  <pre className="bg-background/50 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{`<AnimatedHeading
  typewriter={true}
  glow={true}
  delay={0}
  duration={50}
>
  Your Text Here
</AnimatedHeading>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-sub text-sm text-primary mb-2">With Subheading</h4>
                  <pre className="bg-background/50 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{`<AnimatedHeading
  variant="h2"
  typewriter={true}
  glow={true}
  subheading="Your description here"
>
  Main Title
</AnimatedHeading>`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-sub text-sm text-primary mb-2">Simple Animation</h4>
                  <pre className="bg-background/50 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{`<SimpleAnimatedHeading
  glow={true}
  delay={0}
  subheading="Description"
>
  Title Text
</SimpleAnimatedHeading>`}</code>
                  </pre>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Features Overview */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <motion.h3 variants={cardVariants} custom={0} className="font-heading text-2xl text-foreground mb-8 text-center">
            Key Features
          </motion.h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div variants={cardVariants} custom={1}>
              <GlassCard className="p-6 h-full text-center" glow="blue">
                <Rocket className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-sub text-lg text-foreground mb-2">
                  Performance Optimized
                </h4>
                <p className="text-sm text-muted-foreground">
                  Uses Intersection Observer for efficient viewport detection
                </p>
              </GlassCard>
            </motion.div>

            <motion.div variants={cardVariants} custom={2}>
              <GlassCard className="p-6 h-full text-center" glow="teal">
                <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
                <h4 className="font-sub text-lg text-foreground mb-2">
                  Silver Glow Effect
                </h4>
                <p className="text-sm text-muted-foreground">
                  Beautiful animated glow with customizable intensity
                </p>
              </GlassCard>
            </motion.div>

            <motion.div variants={cardVariants} custom={3}>
              <GlassCard className="p-6 h-full text-center" glow="violet">
                <Zap className="w-8 h-8 text-secondary mx-auto mb-4" />
                <h4 className="font-sub text-lg text-foreground mb-2">
                  No Re-render Loops
                </h4>
                <p className="text-sm text-muted-foreground">
                  Efficient state management prevents unnecessary re-renders
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedHeadingDemo;
