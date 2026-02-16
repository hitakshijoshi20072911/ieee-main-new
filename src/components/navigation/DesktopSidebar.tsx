import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Users, Image, CreditCard, User, Rocket, ChevronLeft, ChevronRight, BarChart3, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const DesktopSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { role } = useAuth();

  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/events", icon: Calendar, label: "Events" },
    { to: "/recruitment", icon: Users, label: "Recruitment" },
    { to: "/gallery", icon: Image, label: "Gallery" },
    { to: "/membership", icon: CreditCard, label: "Membership" },
    ...(role !== "student" ? [{ to: "/analytics", icon: BarChart3, label: "Analytics" }] : []),
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/login", icon: LogIn, label: "Login" },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 z-30 border-r border-border/40 transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
      style={{
        background: "linear-gradient(180deg, hsl(222 40% 6% / 0.8), hsl(225 50% 3% / 0.9))",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border/30">
        <Rocket className="w-6 h-6 text-primary shrink-0" />
        {!collapsed && (
          <span className="font-heading text-sm text-foreground tracking-wide">IEEE IGDTUW</span>
        )}
      </div>
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={cn(
                "glow-button flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                isActive
                  ? "bg-primary/10 text-primary glow-blue-subtle"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="text-sm font-sub">{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-border/30 text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
};

export default DesktopSidebar;
