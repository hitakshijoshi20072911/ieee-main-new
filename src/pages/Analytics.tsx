import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import { CinematicHeader } from "@/components/CinematicHeader";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { useAuth } from "@/context/AuthContext";
import { BarChart3, TrendingUp, Users, Calendar, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { label: "Total Registrations", value: "1,284", change: "+12%", up: true, icon: Users },
  { label: "Events This Month", value: "8", change: "+3", up: true, icon: Calendar },
  { label: "Avg. Attendance", value: "78%", change: "-2%", up: false, icon: Eye },
  { label: "Engagement Score", value: "92", change: "+5", up: true, icon: TrendingUp },
];

const chartData = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 82 },
  { label: "Mar", value: 70 },
  { label: "Apr", value: 95 },
  { label: "May", value: 88 },
  { label: "Jun", value: 76 },
];

const topEvents = [
  { name: "AI/ML Hackathon", registrations: 156, capacity: 200 },
  { name: "Women in Tech Summit", registrations: 210, capacity: 300 },
  { name: "Quantum Computing Workshop", registrations: 87, capacity: 120 },
  { name: "IoT Innovation Challenge", registrations: 72, capacity: 100 },
];

const AnalyticsPage = () => {
  const { role } = useAuth();

  if (role === "student") {
    return (
      <div className="min-h-screen">
        <CinematicHeader
          title="Access Restricted"
          tagline="Analytics available for organizers and admins only"
          fallbackImage="/hero-planet.jpg"
          floatingElement="star"
        />
        
        <div className="content-container section-spacing flex items-center justify-center">
          <GlassCard className="p-8 text-center max-w-md">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading text-lg text-foreground mb-2">Access Restricted</h2>
            <p className="text-sm text-muted-foreground">Analytics is available for organizers and admins only. Switch your role using the role switcher.</p>
          </GlassCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CinematicHeader
        title="Mission Analytics"
        tagline="Performance metrics & insights"
        fallbackImage="/hero-planet.jpg"
        floatingElement="planet"
      />
      
      <div className="content-container section-spacing">
        {/* Stats Grid */}
        <AnimatedHeading
          variant="h2"
          typewriter={true}
          glow={true}
          delay={0}
          duration={35}
          subheading="Key performance indicators"
          className="mb-8"
        >
          Performance Metrics
        </AnimatedHeading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="p-4">
                <stat.icon className="w-4 h-4 text-primary mb-2" />
                <p className="font-heading text-xl text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground mb-1">{stat.label}</p>
                <span className={`text-[10px] font-sub flex items-center gap-0.5 ${stat.up ? "text-accent" : "text-destructive"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <AnimatedHeading
          variant="h3"
          typewriter={true}
          glow={true}
          delay={0}
          duration={40}
          subheading="Registration trends over time"
          className="mb-6"
        >
          Registration Trends
        </AnimatedHeading>
        <GlassCard className="p-5 mb-8" glow="blue">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-sub text-foreground">Registration Trends</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {chartData.map((d, i) => (
              <motion.div
                key={d.label}
                className="flex-1 flex flex-col items-center gap-1"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ transformOrigin: "bottom" }}
              >
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary/60 to-primary/20 transition-all"
                  style={{ height: `${d.value}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{d.label}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Top Events Table */}
        <AnimatedHeading
          variant="h3"
          typewriter={true}
          glow={true}
          delay={0}
          duration={45}
          subheading="Most popular events"
          className="mb-6"
        >
          Top Events by Registration
        </AnimatedHeading>
        <GlassCard className="p-5">
          <div className="space-y-3">
            {topEvents.map((event, i) => {
              const pct = Math.round((event.registrations / event.capacity) * 100);
              return (
                <motion.div key={event.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-sub text-foreground">{event.name}</span>
                    <span className="text-[10px] text-muted-foreground">{event.registrations}/{event.capacity} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AnalyticsPage;
