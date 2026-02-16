import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import CountdownTimer from "@/components/CountdownTimer";
import { VideoBackground } from "@/components/VideoBackground";
import { upcomingEvents } from "@/mockData/data";
import { Calendar, ChevronRight, Zap, Users, Trophy, ArrowRight } from "lucide-react";
import heroPlanet from "@/assets/hero-planet.jpg";
import { 
  staggerContainer, 
  cardVariants, 
  scrollRevealVariants, 
  scaleFadeVariants,
  floatingVariants 
} from "@/hooks/useMotionAnimations";

const quickActions = [
  { icon: Calendar, label: "Events", color: "text-primary", to: "/events" },
  { icon: Users, label: "Recruit", color: "text-secondary", to: "/recruitment" },
  { icon: Trophy, label: "Join", color: "text-accent", to: "/membership" },
];

const HomePage = () => {
  const featured = upcomingEvents.slice(0, 3);
  const nextEvent = upcomingEvents[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <VideoBackground 
          fallbackImage={heroPlanet}
          overlayOpacity={0.8}
        >
          <div className="content-container section-spacing-lg relative z-10 text-center">
            <motion.div 
              variants={scaleFadeVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 gradient-animated-slow"
                variants={floatingVariants}
                animate="animate"
              >
                <Zap className="w-4 h-4 text-accent" />
                <span className="caption-text tracking-wider">Mission Control Active</span>
              </motion.div>
              <AnimatedHeading 
                variant="h1"
                className="silver-glow-text"
              >
                Mission Control Active
              </AnimatedHeading>
              <AnimatedHeading
                variant="h2"
                className="silver-glow-text"
              >
                Where Innovation Meets Excellence
              </AnimatedHeading>
              <AnimatedHeading
                variant="h1"
                typewriter={true}
                glow={true}
                delay={0}
                duration={60}
                subheading=""
                className="mb-8"
              >
                IEEE IGDTUW
              </AnimatedHeading>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="flex justify-center gap-6 section-spacing-sm"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {quickActions.map((action, index) => (
                <motion.a
                  key={action.label}
                  href={action.to}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="glow-button flex flex-col items-center gap-3 px-8 py-6 rounded-xl gradient-hover"
                >
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                  <span className="btn-text">{action.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </VideoBackground>
      </section>

      {/* Next Event Countdown */}
      <section className="content-container section-spacing">
        <motion.div 
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GlassCard className="p-6" glow="blue">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="caption-text mb-2">Next Mission</p>
                <h3 className="card-title">{nextEvent.title}</h3>
                <p className="body-text mt-1">{nextEvent.location}</p>
              </div>
              <CountdownTimer targetDate={nextEvent.date} />
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Upcoming Events */}
      <section className="content-container section-spacing">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Upcoming Missions</h2>
          <a href="/events" className="link-text flex items-center gap-1 hover:gap-2">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <motion.div
          className="grid-responsive-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((event, index) => (
            <motion.div key={event.id} variants={cardVariants} custom={index}>
              <GlassCard className="p-6 h-full flex flex-col" variant="morph">
                <div className="flex items-center gap-2 mb-4">
                  <span className="caption-text px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {event.category}
                  </span>
                </div>
                <h3 className="card-title mb-3">{event.title}</h3>
                <p className="body-text flex-1 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                  <CountdownTimer targetDate={event.date} compact />
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Suggested */}
      <section className="content-container section-spacing pb-32">
        <motion.h2 
          className="section-title mb-6"
          variants={scaleFadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Suggested For You
        </motion.h2>
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x">
          {upcomingEvents.slice(2).map((event, index) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <GlassCard key={event.id} className="p-5 min-w-[280px] snap-start shrink-0" variant="shimmer">
                <span className="caption-text">{event.category}</span>
                <h4 className="card-title mt-2">{event.title}</h4>
                <p className="body-text mt-2">{event.registrations}/{event.maxCapacity} registered</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
