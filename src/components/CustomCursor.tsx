import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (isMobile || !enabled) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 12) trailRef.current.shift();
    };

    window.addEventListener("mousemove", handleMove);
    document.body.style.cursor = "none";

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d")!;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const trail = trailRef.current;
      for (let i = 0; i < trail.length; i++) {
        const alpha = (i / trail.length) * 0.4;
        const size = (i / trail.length) * 3;
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(217, 91%, 60%, ${alpha})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
    };
  }, [isMobile, enabled]);

  if (isMobile || !enabled) return null;

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{ left: pos.x - 8, top: pos.y - 8 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" className="drop-shadow-[0_0_6px_hsl(217,91%,60%)]">
          <polygon
            points="8,0 9.5,6 16,6.5 10.5,10 12,16 8,12 4,16 5.5,10 0,6.5 6.5,6"
            fill="hsl(217, 91%, 60%)"
            opacity="0.9"
          />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
