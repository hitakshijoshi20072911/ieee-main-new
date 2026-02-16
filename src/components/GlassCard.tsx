import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "heavy" | "light" | "morph" | "shimmer";
  hover?: boolean;
  glow?: "blue" | "violet" | "teal" | "none";
  onClick?: () => void;
}

const GlassCard = ({ 
  children, 
  className, 
  variant = "default",
  hover = true, 
  glow = "none", 
  onClick 
}: GlassCardProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case "heavy":
        return "glass-card-heavy";
      case "light":
        return "glass-card-light";
      case "morph":
        return "glass-card-morph";
      case "shimmer":
        return "glass-card-shimmer";
      default:
        return "glass-card";
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        getVariantClass(),
        hover && variant !== "morph" && "glass-card-hover",
        glow === "blue" && "glow-blue",
        glow === "violet" && "glow-violet",
        glow === "teal" && "glow-teal",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
