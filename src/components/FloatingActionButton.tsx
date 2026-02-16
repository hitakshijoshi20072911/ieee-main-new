import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CalendarPlus, MessageSquarePlus, UserPlus, X } from "lucide-react";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: CalendarPlus, label: "Register for Event", color: "bg-primary" },
    { icon: MessageSquarePlus, label: "Submit Feedback", color: "bg-secondary" },
    { icon: UserPlus, label: "Join IEEE", color: "bg-accent" },
  ];

  return (
    <div className="fixed bottom-24 right-4 z-50 md:bottom-8 md:right-8 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen &&
          actions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 glass-card px-4 py-3 rounded-full btn-glow`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-sm font-sub text-foreground whitespace-nowrap">{action.label}</span>
              <action.icon className="w-5 h-5 text-primary" />
            </motion.button>
          ))}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center animate-pulse-glow shadow-lg"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {isOpen ? <X className="w-6 h-6 text-primary-foreground" /> : <Plus className="w-6 h-6 text-primary-foreground" />}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
