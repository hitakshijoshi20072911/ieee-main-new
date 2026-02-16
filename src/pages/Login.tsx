import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Rocket, Mail, Lock, Eye, EyeOff, Sparkles, Star, Zap } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import BackgroundVideo from "@/components/BackgroundVideo";
import signinVideo from "@/assets/signin.mp4";

const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
  };

  const handleGoogle = () => {
    loginWithGoogle();
    navigate("/");
  };

  const isIgdtuw = email.endsWith("@igdtuw.ac.in");

  // Floating space elements
  const floatingElements = [
    { icon: Star, delay: 0, duration: 6, size: "w-8 h-8" },
    { icon: Sparkles, delay: 1, duration: 8, size: "w-6 h-6" },
    { icon: Zap, delay: 2, duration: 7, size: "w-7 h-7" },
    { icon: Star, delay: 3, duration: 5, size: "w-5 h-5" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Video Layer */}
      <BackgroundVideo
        src={signinVideo}
        overlayOpacity={0.6}
        overlayGradient="linear-gradient(to bottom, rgba(5, 7, 13, 0.8), rgba(5, 7, 13, 0.9))"
        className="absolute inset-0"
      />

      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Space Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} text-primary/20 pointer-events-none`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <element.icon className="w-full h-full" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glass Panel */}
        <GlassCard className="p-8 border-2 border-primary/20 glow-border" glow="blue">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative"
            >
              <Rocket className="w-10 h-10 text-primary" />
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <h1 className="font-heading text-3xl text-foreground mb-2 gradient-text-animated">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground font-sub">
              Sign in to Mission Control
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <motion.div
                className={`glass-card p-4 rounded-xl border-2 transition-all duration-300 ${
                  isFocused === "email" 
                    ? "border-primary/50 shadow-lg shadow-primary/20" 
                    : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 transition-colors ${
                    isFocused === "email" ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused("email")}
                    onBlur={() => setIsFocused("")}
                    placeholder="your.email@igdtuw.ac.in"
                    className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </motion.div>
              
              {/* Field Focus Glow */}
              <AnimatePresence>
                {isFocused === "email" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 rounded-xl bg-primary/10 blur-xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Password Field */}
            <div className="relative">
              <motion.div
                className={`glass-card p-4 rounded-xl border-2 transition-all duration-300 ${
                  isFocused === "password" 
                    ? "border-primary/50 shadow-lg shadow-primary/20" 
                    : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lock className={`w-5 h-5 transition-colors ${
                    isFocused === "password" ? "text-primary" : "text-muted-foreground"
                  }`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsFocused("password")}
                    onBlur={() => setIsFocused("")}
                    placeholder="Enter your password"
                    className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
              
              {/* Field Focus Glow */}
              <AnimatePresence>
                {isFocused === "password" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 rounded-xl bg-primary/10 blur-xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!email || !password}
              className="w-full glass-card p-4 rounded-xl font-sub font-semibold text-primary border-2 border-primary/20 transition-all hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Sign In
              </span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border/30" />
              <span className="text-xs text-muted-foreground font-sub">OR</span>
              <div className="flex-1 h-px bg-border/30" />
            </div>

            {/* Google Sign In */}
            <motion.button
              type="button"
              onClick={handleGoogle}
              className="w-full glass-card p-4 rounded-xl font-sub font-medium text-foreground border-2 border-border/20 transition-all hover:border-border/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.12 0 2.14.38 2.95 1.14l3.13-3.13C16.46 2.09 14.43 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </span>
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center pt-6 border-t border-border/20">
            <p className="text-sm text-muted-foreground font-sub">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* IGDTUW Validation */}
          {email && !isIgdtuw && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm"
            >
              Please use your IGDTUW email address (@igdtuw.ac.in)
            </motion.div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default LoginPage;
