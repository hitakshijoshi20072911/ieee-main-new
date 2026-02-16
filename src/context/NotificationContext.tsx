import { createContext, useContext, useState, ReactNode } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  type: "event" | "system" | "recruitment";
}

const mockNotifications: Notification[] = [
  { id: "1", title: "Registration Confirmed", message: "You're registered for Quantum Computing Workshop", time: "2 min ago", read: false, priority: "high", type: "event" },
  { id: "2", title: "New Role Opening", message: "Technical Lead position is now open", time: "1 hr ago", read: false, priority: "medium", type: "recruitment" },
  { id: "3", title: "Event Reminder", message: "AI/ML Hackathon starts in 3 days", time: "3 hrs ago", read: true, priority: "medium", type: "event" },
  { id: "4", title: "Membership Renewed", message: "Your IEEE membership is active until Dec 2026", time: "1 day ago", read: true, priority: "low", type: "system" },
  { id: "5", title: "New Gallery Photos", message: "12 new photos from Women in Tech Summit", time: "2 days ago", read: true, priority: "low", type: "system" },
];

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};
