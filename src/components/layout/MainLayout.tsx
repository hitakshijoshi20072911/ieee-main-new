import { ReactNode } from "react";
import BottomNav from "@/components/navigation/BottomNav";
import DesktopSidebar from "@/components/navigation/DesktopSidebar";
import FloatingActionButton from "@/components/FloatingActionButton";
import StarfieldBackground from "@/components/StarfieldBackground";
import CustomCursor from "@/components/CustomCursor";
import { GalacticFooter } from "@/components/GalacticFooter";
import NotificationDrawer from "@/components/NotificationDrawer";
import RoleSwitcher from "@/components/RoleSwitcher";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex w-full relative">
      <CustomCursor />
      <StarfieldBackground />
      <DesktopSidebar />
      <main className="flex-1 relative z-10 pb-20 md:pb-0 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-end gap-4 px-6 py-4 relative z-20">
          <div className="permanent-glow nav-item-enhanced">
            <RoleSwitcher />
          </div>
          <div className="permanent-glow nav-item-enhanced">
            <NotificationDrawer />
          </div>
        </div>
        <div className="flex-1">{children}</div>
        <GalacticFooter />
      </main>
      <BottomNav />
      <FloatingActionButton />
    </div>
  );
};

export default MainLayout;
