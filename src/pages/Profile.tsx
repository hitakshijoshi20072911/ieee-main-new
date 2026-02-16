import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import VideoHeader from "@/components/VideoHeader";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { profileData, upcomingEvents } from "@/mockData/data";
import { User, Calendar, Star, Clock, Settings, LogOut } from "lucide-react";
import eventsVideo from "@/assets/events.mp4";

const planetAvatars = [
  { id: "planet-1", emoji: "🪐", label: "Saturn" },
  { id: "planet-2", emoji: "🌍", label: "Earth" },
  { id: "planet-3", emoji: "🔴", label: "Mars" },
  { id: "planet-4", emoji: "🟣", label: "Neptune" },
  { id: "planet-5", emoji: "🌕", label: "Moon" },
  { id: "planet-6", emoji: "☀️", label: "Sun" },
];

const ProfilePage = () => {
  const [avatar, setAvatar] = useState(profileData.avatar);
  const currentAvatar = planetAvatars.find((p) => p.id === avatar) || planetAvatars[0];
  const savedEvents = upcomingEvents.filter((e) => profileData.savedEvents.includes(e.id));

  return (
    <div className="min-h-screen">
      <VideoHeader
        title="Mission Control"
        tagline="Your personal space station"
        videoSrc={eventsVideo}
      />
      
      <div className="content-container section-spacing">
        {/* Profile Header */}
        <AnimatedHeading
          variant="h2"
          typewriter={true}
          glow={true}
          delay={0}
          duration={50}
          subheading="Your personal space station"
          className="mb-8"
        >
          Mission Control
        </AnimatedHeading>
        
        <div className="text-center mb-8">
          <motion.div
            className="w-24 h-24 mx-auto mb-4 rounded-full glass-card flex items-center justify-center text-5xl animate-float"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {currentAvatar.emoji}
          </motion.div>
          <h1 className="font-heading text-xl text-foreground">{profileData.name}</h1>
          <p className="text-sm text-muted-foreground font-sub">{profileData.email}</p>
          <p className="text-xs text-primary font-sub mt-1">{profileData.memberId}</p>
        </div>

        {/* Stats */}
        <AnimatedHeading
          variant="h3"
          typewriter={true}
          glow={true}
          delay={0}
          duration={40}
          subheading="Your activity overview"
          className="mb-6"
        >
          Activity Overview
        </AnimatedHeading>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <GlassCard className="p-4 text-center">
            <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="font-heading text-xl text-foreground">{profileData.eventsAttended}</p>
            <p className="text-xs text-muted-foreground">Events Attended</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <Star className="w-5 h-5 text-accent mx-auto mb-2" />
            <p className="font-heading text-xl text-foreground">{profileData.points}</p>
            <p className="text-xs text-muted-foreground">Points Earned</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <Clock className="w-5 h-5 text-secondary mx-auto mb-2" />
            <p className="font-heading text-xl text-foreground">{profileData.hours}</p>
            <p className="text-xs text-muted-foreground">Hours Contributed</p>
          </GlassCard>
        </div>

        {/* Avatar Selection */}
        <AnimatedHeading
          variant="h3"
          typewriter={true}
          glow={true}
          delay={0}
          duration={45}
          subheading="Choose your avatar"
          className="mb-6"
        >
          Avatar Selection
        </AnimatedHeading>
        <div className="flex gap-4 justify-center mb-8">
          {planetAvatars.map((planet) => (
            <button
              key={planet.id}
              onClick={() => setAvatar(planet.id)}
              className={`w-16 h-16 rounded-full glass-card flex items-center justify-center text-2xl transition-all ${
                avatar === planet.id ? "ring-2 ring-primary glow-blue" : ""
              }`}
            >
              {planet.emoji}
            </button>
          ))}
        </div>

        {/* Saved Events */}
        <AnimatedHeading
          variant="h3"
          typewriter={true}
          glow={true}
          delay={0}
          duration={50}
          subheading="Events you're registered for"
          className="mb-6"
        >
          Registered Events
        </AnimatedHeading>
        <div className="space-y-3 mb-8">
          {savedEvents.map((event) => (
            <GlassCard key={event.id} className="p-4 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-sub text-foreground truncate">{event.title}</h4>
                <p className="text-xs text-muted-foreground">{event.category}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Settings */}
        <AnimatedHeading
          variant="h3"
          typewriter={true}
          glow={true}
          delay={0}
          duration={55}
          subheading="Account management"
          className="mb-6"
        >
          Settings
        </AnimatedHeading>
        <div className="space-y-3">
          <GlassCard className="p-4 flex items-center gap-3 glow-button">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-sub text-foreground">Settings</span>
          </GlassCard>
          <GlassCard className="p-4 flex items-center gap-3 glow-button">
            <LogOut className="w-4 h-4 text-destructive" />
            <span className="text-sm font-sub text-destructive">Sign Out</span>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
