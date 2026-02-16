import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, Eye, EyeOff, User, GraduationCap, Sparkles, Star, Zap } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const SignupPage = () => {
  const { signup, signupWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    year: "",
    branch: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else if (!formData.email.endsWith("@igdtuw.ac.in")) {
      newErrors.email = "Please use your IGDTUW email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    }

    if (!formData.branch) {
      newErrors.branch = "Branch is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      signup(formData.name, formData.email, formData.password, formData.year, formData.branch);
      navigate("/");
    }
  };

  const handleGoogle = () => {
    signupWithGoogle();
    navigate("/");
  };

  // Floating space elements
  const floatingElements = [
    { icon: Star, delay: 0, duration: 6, size: "w-8 h-8" },
    { icon: Sparkles, delay: 1, duration: 8, size: "w-6 h-6" },
    { icon: Zap, delay: 2, duration: 7, size: "w-7 h-7" },
    { icon: GraduationCap, delay: 3, duration: 5, size: "w-6 h-6" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/40" />
        <video
          className="w-full h-full object-cover opacity-20"
          autoPlay
          muted
          loop
          playsInline
          style={{
            background: "linear-gradient(135deg, #05070D 0%, #0a0f1f 50%, #05070D 100%)"
          }}
        >
          <source src="/videos/auth-background.mp4" type="video/mp4" />
          {/* Fallback gradient if video doesn't load */}
        </video>
      </div>

      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
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
          className={`absolute ${element.size} text-accent/20 pointer-events-none`}
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
        <GlassCard className="p-8 border-2 border-accent/20 glow-border" glow="teal">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 relative"
            >
              <UserPlus className="w-10 h-10 text-accent" />
              {/* Animated glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent/30"
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
              Join Mission Control
            </h1>
            <p className="text-sm text-muted-foreground font-sub">
              Create your IEEE IGDTUW account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <motion.div
                className={`glass-card p-4 rounded-xl border-2 transition-all duration-300 ${
                  isFocused === "name" 
                    ? "border-accent/50 shadow-lg shadow-accent/20" 
                    : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className={`w-5 h-5 transition-colors ${
                    isFocused === "name" ? "text-accent" : "text-muted-foreground"
                  }`} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onFocus={() => setIsFocused("name")}
                    onBlur={() => setIsFocused("")}
                    placeholder="Full Name"
                    className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </motion.div>
              
              {/* Field Focus Glow */}
              <AnimatePresence>
                {isFocused === "name" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 rounded-xl bg-accent/10 blur-xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
              
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-destructive text-xs"
                >
                  {errors.name}
                </motion.div>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <motion.div
                className={`glass-card p-4 rounded-xl border-2 transition-all duration-300 ${
                  isFocused === "email" 
                    ? "border-accent/50 shadow-lg shadow-accent/20" 
                    : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 transition-colors ${
                    isFocused === "email" ? "text-accent" : "text-muted-foreground"
                  }`} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    className="absolute inset-0 rounded-xl bg-accent/10 blur-xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
              
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-destructive text-xs"
                >
                  {errors.email}
                </motion.div>
              )}
            </div>

            {/* Academic Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <motion.div
                  className={`glass-card p-3 rounded-xl border-2 transition-all duration-300 ${
                    isFocused === "year" 
                      ? "border-accent/50 shadow-lg shadow-accent/20" 
                      : "border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className={`w-4 h-4 transition-colors ${
                      isFocused === "year" ? "text-accent" : "text-muted-foreground"
                    }`} />
                    <select
                      value={formData.year}
                      onChange={(e) => handleInputChange("year", e.target.value)}
                      onFocus={() => setIsFocused("year")}
                      onBlur={() => setIsFocused("")}
                      className="flex-1 bg-transparent text-foreground outline-none text-sm"
                      required
                    >
                      <option value="" className="bg-background">Year</option>
                      <option value="1st" className="bg-background">1st</option>
                      <option value="2nd" className="bg-background">2nd</option>
                      <option value="3rd" className="bg-background">3rd</option>
                      <option value="4th" className="bg-background">4th</option>
                    </select>
                  </div>
                </motion.div>
                
                {errors.year && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-1 text-destructive text-xs"
                  >
                    {errors.year}
                  </motion.div>
                )}
              </div>

              <div className="relative">
                <motion.div
                  className={`glass-card p-3 rounded-xl border-2 transition-all duration-300 ${
                    isFocused === "branch" 
                      ? "border-accent/50 shadow-lg shadow-accent/20" 
                      : "border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className={`w-4 h-4 transition-colors ${
                      isFocused === "branch" ? "text-accent" : "text-muted-foreground"
                    }`} />
                    <select
                      value={formData.branch}
                      onChange={(e) => handleInputChange("branch", e.target.value)}
                      onFocus={() => setIsFocused("branch")}
                      onBlur={() => setIsFocused("")}
                      className="flex-1 bg-transparent text-foreground outline-none text-sm"
                      required
                    >
                      <option value="" className="bg-background">Branch</option>
                      <option value="CSE" className="bg-background">CSE</option>
                      <option value="ECE" className="bg-background">ECE</option>
                      <option value="MAE" className="bg-background">MAE</option>
                      <option value="IT" className="bg-background">IT</option>
                    </select>
                  </div>
                </motion.div>
                
                {errors.branch && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-1 text-destructive text-xs"
                  >
                    {errors.branch}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <motion.div
                className={`glass-card p-4 rounded-xl border-2 transition-all duration-300 ${
                  isFocused === "password" 
                    ? "border-accent/50 shadow-lg shadow-accent/20" 
                    : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lock className={`w-5 h-5 transition-colors ${
                    isFocused === "password" ? "text-accent" : "text-muted-foreground"
                  }`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onFocus={() => setIsFocused("password")}
                    onBlur={() => setIsFocused("")}
                    placeholder="Password"
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
                    className="absolute inset-0 rounded-xl bg-accent/10 blur-xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
              
              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-destructive text-xs"
                >
                  {errors.password}
                </motion.div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <motion.div
                className={`glass-card p-4 rounded-xl border-2 transition-all duration-300 ${
                  isFocused === "confirmPassword" 
                    ? "border-accent/50 shadow-lg shadow-accent/20" 
                    : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lock className={`w-5 h-5 transition-colors ${
                    isFocused === "confirmPassword" ? "text-accent" : "text-muted-foreground"
                  }`} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    onFocus={() => setIsFocused("confirmPassword")}
                    onBlur={() => setIsFocused("")}
                    placeholder="Confirm Password"
                    className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
              
              {/* Field Focus Glow */}
              <AnimatePresence>
                {isFocused === "confirmPassword" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 rounded-xl bg-accent/10 blur-xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
              
              {errors.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-destructive text-xs"
                >
                  {errors.confirmPassword}
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full glass-card p-4 rounded-xl font-sub font-semibold text-accent border-2 border-accent/20 transition-all hover:border-accent/50 animate-pulse-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create Account
              </span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border/30" />
              <span className="text-xs text-muted-foreground font-sub">OR</span>
              <div className="flex-1 h-px bg-border/30" />
            </div>

            {/* Google Sign Up */}
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

          {/* Sign In Link */}
          <div className="text-center pt-6 border-t border-border/20">
            <p className="text-sm text-muted-foreground font-sub">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default SignupPage;
