import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "organizer" | "admin";

interface User {
  name: string;
  email: string;
  role: UserRole;
  memberId: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, password: string) => void;
  loginWithGoogle: () => void;
  signup: (name: string, email: string, password: string, year: string, branch: string) => void;
  signupWithGoogle: () => void;
  logout: () => void;
}

const mockUser: User = {
  name: "Astronaut",
  email: "explorer@igdtuw.ac.in",
  role: "student",
  memberId: "IEEE-2026-0042",
  avatar: "planet-1",
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [role, setRole] = useState<UserRole>("student");

  const login = (_email: string, _password: string) => {
    setUser({ ...mockUser, role });
  };

  const loginWithGoogle = () => {
    setUser({ ...mockUser, role });
  };

  const signup = (name: string, email: string, password: string, year: string, branch: string) => {
    setUser({ ...mockUser, name, email, role });
  };

  const signupWithGoogle = () => {
    setUser({ ...mockUser, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      role,
      setRole,
      login,
      loginWithGoogle,
      signup,
      signupWithGoogle,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
