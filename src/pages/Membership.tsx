import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { CinematicHeader } from "@/components/CinematicHeader";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { membershipBenefits, timelineMilestones } from "@/mockData/data";
import { BookOpen, Users, Award, Briefcase, Zap, Shield, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Users, Award, Briefcase, Zap, Shield,
};

const steps = [
  { step: 1, title: "Visit IEEE.org", description: "Create an IEEE account on the official website" },
  { step: 2, title: "Select Student Membership", description: "Choose the student membership tier" },
  { step: 3, title: "Pay Dues", description: "Complete payment (discounted for students)" },
  { step: 4, title: "Join IGDTUW Branch", description: "Register with our local student branch" },
];

const MembershipPage = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <CinematicHeader
        title="Membership"
        tagline="Join the global IEEE network"
        fallbackImage="/hero-planet.jpg"
        floatingElement="nebula"
      />
      
      <div className="content-container section-spacing">
        {/* Benefits */}
        <AnimatedHeading
          variant="h2"
          typewriter={true}
          glow={true}
          delay={0}
          duration={35}
          subheading="Exclusive benefits for IEEE members"
          className="mb-8"
        >
          Membership Benefits
        </AnimatedHeading>
        <div className="grid gap-4 md:grid-cols-3 mb-10">
          {membershipBenefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || Zap;
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-5 h-full text-center">
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading text-xs text-foreground mb-1">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Join Steps */}
        <AnimatedHeading
          variant="h3"
          typewriter={true}
          glow={true}
          delay={0}
          duration={40}
          subheading="Simple steps to become an IEEE member"
          className="mb-6"
        >
          How to Join
        </AnimatedHeading>
        <div className="space-y-3 mb-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-4 flex items-center gap-4 glow-button">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="font-heading text-sm text-primary">{s.step}</span>
                </div>
                <div>
                  <h4 className="text-sm font-sub text-foreground">{s.title}</h4>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
              </GlassCard>
            </motion.div>
          ))}
        </div>

      {/* Timeline Memory Mode */}
        <AnimatedHeading
          variant="h3"
          typewriter={true}
          glow={true}
          delay={0}
          duration={45}
          subheading="Our journey through the years"
          className="mb-6"
        >
          Our Journey
        </AnimatedHeading>
      <div className="relative pl-8 border-l-2 border-primary/20 space-y-6">
        {timelineMilestones.map((milestone, i) => (
          <motion.div
            key={milestone.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative"
          >
            <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
            <GlassCard className="p-4">
              <span className="font-heading text-xs text-primary">{milestone.year}</span>
              <h4 className="font-sub text-sm text-foreground mt-1">{milestone.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{milestone.description}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MembershipPage;
