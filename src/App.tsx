import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/Home";
import EventsPage from "@/pages/Events";
import RecruitmentPage from "@/pages/Recruitment";
import GalleryPage from "@/pages/Gallery";
import MembershipPage from "@/pages/Membership";
import ProfilePage from "@/pages/Profile";
import LoginPage from "@/pages/Login";
import SignupPage from "@/pages/Signup";
import AnalyticsPage from "@/pages/Analytics";
import CinematicDemo from "@/pages/CinematicDemo";
import FormsDemo from "@/pages/FormsDemo";
import AnimatedHeadingDemo from "@/pages/AnimatedHeadingDemo";
import NotFound from "./pages/NotFound";
import TypewriterIntro from "@/components/TypewriterIntro";
import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";

const queryClient = new QueryClient();

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);
  
  // Initialize Lenis smooth scroll when app is ready
  useLenis();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <NotificationProvider>
            <Toaster />
            <Sonner />
            {!introComplete && <TypewriterIntro onComplete={() => setIntroComplete(true)} />}
            <BrowserRouter>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/recruitment" element={<RecruitmentPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/membership" element={<MembershipPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/cinematic" element={<CinematicDemo />} />
                  <Route path="/forms" element={<FormsDemo />} />
                  <Route path="/headings" element={<AnimatedHeadingDemo />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
