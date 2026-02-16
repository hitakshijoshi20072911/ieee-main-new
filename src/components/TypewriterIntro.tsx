import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterIntroProps {
  onComplete: () => void;
}

const TypewriterIntro = ({ onComplete }: TypewriterIntroProps) => {
  const text = "IEEE IGDTUW";
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowCursor(false);
          setDone(true);
        }, 800);
        setTimeout(onComplete, 1800);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "hsl(225, 50%, 3%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl gradient-text-blue inline-block">
              {displayed}
              {showCursor && (
                <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 animate-pulse align-baseline" />
              )}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: displayed.length > 5 ? 0.6 : 0 }}
              className="text-sm text-muted-foreground font-sub mt-4 tracking-widest uppercase"
            >
              Initializing Mission Control
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default TypewriterIntro;
