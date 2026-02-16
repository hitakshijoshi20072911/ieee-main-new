import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import GlassCard from "@/components/GlassCard";

const priorityColors = {
  high: "bg-destructive/20 text-destructive",
  medium: "bg-primary/20 text-primary",
  low: "bg-muted text-muted-foreground",
};

const NotificationDrawer = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative p-3 rounded-xl glass-card hover:border-primary/30 transition-all"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center font-sub font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/40 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setOpen(false);
                }
              }}
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-4 top-16 z-50 w-80 glass-card border border-border/40 overflow-hidden shadow-2xl"
              style={{ 
                background: "hsl(222, 40%, 6%)",
                maxHeight: "calc(100vh - 4rem)"
              }}
            >
              <div className="flex items-center justify-between p-5 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-primary mr-2" />
                  <h2 className="font-heading text-base text-foreground">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-[10px] px-2 py-1 rounded-full font-sub font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="glow-button text-[11px] text-primary font-sub flex items-center gap-2 px-3 py-2 rounded-lg">
                      <Check className="w-4 h-4" /> Mark all read
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="glow-button p-2 rounded-xl">
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="p-3 space-y-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 8rem)" }}>
                {notifications.map((n) => (
                  <motion.div key={n.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                    <GlassCard
                      className={`p-3 cursor-pointer transition-all hover:scale-[1.02] ${!n.read ? "border-primary/30 bg-primary/5" : ""}`}
                      hover={false}
                      onClick={() => markAsRead(n.id)}
                    >
                      <div className="flex items-start gap-3">
                        {!n.read && (
                          <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-sub text-foreground font-medium">{n.title}</span>
                            <span className={`text-[9px] uppercase px-2 py-1 rounded-full font-sub ${priorityColors[n.priority]}`}>
                              {n.priority}
                            </span>
                          </div>
                          <p className="text-[12px] text-muted-foreground line-clamp-2 leading-relaxed">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground/70 mt-2 font-medium">{n.time}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationDrawer;
