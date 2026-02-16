import { useMemo } from "react";

const StarfieldBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(225 50% 3%) 0%, hsl(222 40% 6%) 50%, hsl(220 35% 10%) 100%)",
        }}
      />
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="starfield-dot"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
      {/* Nebula accent */}
      <div
        className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, hsl(270 70% 55%), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, hsl(217 91% 60%), transparent 70%)",
        }}
      />
    </div>
  );
};

export default StarfieldBackground;
