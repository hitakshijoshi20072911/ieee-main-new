import { useAuth, UserRole } from "@/context/AuthContext";
import { Shield, GraduationCap, Settings } from "lucide-react";

const roles: { value: UserRole; label: string; icon: React.ElementType }[] = [
  { value: "student", label: "Student", icon: GraduationCap },
  { value: "organizer", label: "Organizer", icon: Settings },
  { value: "admin", label: "Admin", icon: Shield },
];

const RoleSwitcher = () => {
  const { role, setRole } = useAuth();

  return (
    <div className="flex gap-2 p-1.5 rounded-xl glass-card">
      {roles.map((r) => (
        <button
          key={r.value}
          onClick={() => setRole(r.value)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-sub transition-all ${
            role === r.value
              ? "bg-primary/30 text-primary border border-primary/50"
              : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
          }`}
        >
          <r.icon className="w-3.5 h-3.5" />
          {r.label}
        </button>
      ))}
    </div>
  );
};

export default RoleSwitcher;
