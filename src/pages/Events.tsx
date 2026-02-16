import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import VideoHeader from "@/components/VideoHeader";
import GalacticButton from "@/components/GalacticButton";
import CountdownTimer from "@/components/CountdownTimer";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { upcomingEvents } from "@/mockData/data";
import { Calendar, MapPin, Users, QrCode, X, Camera, CheckCircle } from "lucide-react";
import eventsVideo from "@/assets/events.mp4";

const categories = ["All", "Workshop", "Hackathon", "Summit", "Bootcamp", "Competition"];

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const filtered = activeCategory === "All"
    ? upcomingEvents
    : upcomingEvents.filter((e) => e.category === activeCategory);

  const selected = upcomingEvents.find((e) => e.id === selectedEvent);

  return (
    <div className="min-h-screen">
      <VideoHeader
        title="Mission Board"
        tagline="Discover upcoming events and activities"
        videoSrc={eventsVideo}
      />
      
      <div className="content-container section-spacing">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`glow-button px-4 py-2 rounded-full text-xs font-sub whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* QR Check-in Button */}
        <GlassCard className="p-4 mb-6 flex items-center justify-between glow-button" glow="teal" onClick={() => setShowQR(true)}>
          <div className="flex items-center gap-3">
            <QrCode className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-sub text-foreground">QR Check-in</p>
              <p className="text-xs text-muted-foreground">Scan to mark attendance</p>
            </div>
          </div>
          <Camera className="w-5 h-5 text-muted-foreground" />
        </GlassCard>

        {/* Events Grid */}
        <motion.div className="grid gap-4 md:grid-cols-2" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassCard className="p-5" onClick={() => setSelectedEvent(event.id)}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary font-sub">
                      {event.category}
                    </span>
                    <CountdownTimer targetDate={event.date} compact />
                  </div>
                  <h3 className="font-heading text-sm text-foreground mb-2">{event.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.registrations}/{event.maxCapacity}</span>
                  </div>
                  <div className="mt-4 w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 w-full max-w-lg rounded-t-2xl md:rounded-2xl gradient-border"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary font-sub">
                  {selected.category}
                </span>
                <button onClick={() => setSelectedEvent(null)}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <h2 className="font-heading text-xl text-foreground mb-2">{selected.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{selected.description}</p>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />{new Date(selected.date).toLocaleDateString("en-US", { dateStyle: "full" })}</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />{selected.location}</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" />{selected.registrations} / {selected.maxCapacity} registered</span>
              </div>
              <CountdownTimer targetDate={selected.date} />
              <button className="glow-button w-full mt-6 py-3 rounded-xl bg-primary text-primary-foreground font-sub font-semibold text-sm animate-pulse-glow">
                Register Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 rounded-2xl text-center max-w-sm w-full gradient-border"
            >
              <div className="w-48 h-48 mx-auto mb-6 rounded-xl border-2 border-dashed border-primary/30 flex items-center justify-center bg-muted/20">
                <Camera className="w-12 h-12 text-primary/50" />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2">Scan QR Code</h3>
              <p className="text-sm text-muted-foreground mb-6">Point your camera at the event QR code</p>
              <div className="flex items-center justify-center gap-2 text-accent">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-sub">Camera ready</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
