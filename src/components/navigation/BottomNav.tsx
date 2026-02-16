import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Users, Image, User, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const BottomNav = () => {
  const location = useLocation();
  const { role } = useAuth();

  const tabs = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/events", icon: Calendar, label: "Events" },
    { to: "/recruitment", icon: Users, label: "Recruit" },
    ...(role !== "student" ? [{ to: "/analytics", icon: BarChart3, label: "Analytics" }] : [{ to: "/gallery", icon: Image, label: "Gallery" }]),
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-border/40"
      style={{
        background: "linear-gradient(180deg, hsl(222 40% 6% / 0.9), hsl(225 50% 3% / 0.95))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className="glow-button flex flex-col items-center gap-1 px-3 py-2 relative"
            >
              <tab.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-sub transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
