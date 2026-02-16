import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
  compact?: boolean;
}

const CountdownTimer = ({ targetDate, compact = false }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (compact) {
    return (
      <span className="font-sub text-sm text-muted-foreground">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
      </span>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center glass-card px-3 py-2 min-w-[48px]">
          <span className="font-heading text-lg text-primary">{String(u.value).padStart(2, "0")}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{u.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
