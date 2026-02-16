import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GalacticButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  href?: string;
  className?: string;
}

const GalacticButton: React.FC<GalacticButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  href,
  className = '',
  ...props
}) => {
  const baseClasses = "relative overflow-hidden rounded-full font-sub font-medium transition-all duration-300 ease-out";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 text-white shadow-lg",
    secondary: "bg-gradient-to-r from-cyan-600 via-purple-500 to-cyan-600 text-white shadow-lg",
    outline: "border-2 border-purple-500/50 text-purple-400 bg-transparent",
    ghost: "text-purple-400 hover:text-purple-300 bg-transparent"
  };

  const glowClasses = {
    primary: "shadow-[0_0_20px_rgba(147,51,234,0.5),0_0_40px_rgba(6,182,212,0.3),0_0_60px_rgba(147,51,234,0.1)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8),0_0_50px_rgba(6,182,212,0.6),0_0_70px_rgba(147,51,234,0.4),inset_0_0_20px_rgba(255,255,255,0.2)]",
    secondary: "shadow-[0_0_20px_rgba(6,182,212,0.5),0_0_40px_rgba(147,51,234,0.3),0_0_60px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8),0_0_50px_rgba(147,51,234,0.6),0_0_70px_rgba(6,182,212,0.4),inset_0_0_20px_rgba(255,255,255,0.2)]",
    outline: "shadow-[0_0_15px_rgba(147,51,234,0.3),0_0_25px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6),0_0_35px_rgba(6,182,212,0.4)] hover:border-purple-400",
    ghost: "shadow-[0_0_10px_rgba(147,51,234,0.2)] hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]"
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        glowClasses[variant],
        fullWidth && "w-full",
        "group cursor-pointer",
        className
      )}
      {...(href ? { href, ...props } : { ...props })}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1, ease: "easeInOut" }
      }}
    >
      {/* Gradient border animation */}
      <div className="absolute inset-0 rounded-full p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 opacity-75 animate-pulse" />
      </div>
      
      {/* Inner highlight rim */}
      <div className="absolute inset-0 rounded-full p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-sm" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && (
          <span className="relative z-10">{icon}</span>
        )}
        <span className="relative z-10">{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="relative z-10">{icon}</span>
        )}
      </div>
      
      {/* Radial light burst on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-300">
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-purple-600/30 blur-xl animate-ping" />
      </div>
    </Component>
  );
};

export default GalacticButton;
