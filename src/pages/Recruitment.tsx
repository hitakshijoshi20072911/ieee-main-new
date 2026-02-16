import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import VideoHeader from "@/components/VideoHeader";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { useRecruitmentForm, RecruitmentFormData } from "@/hooks/useForms";
import { recruitmentRoles } from "@/mockData/data";
import { Briefcase, X, Send, CheckCircle2, Clock, Tag, AlertCircle } from "lucide-react";
import eventsVideo from "@/assets/events.mp4";

const RecruitmentPage = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [applied, setApplied] = useState<Set<string>>(new Set());
  
  const {
    formData,
    setFormData,
    isSubmitting,
    isSubmitted,
    errors,
    submitForm,
    resetForm
  } = useRecruitmentForm();

  const selected = recruitmentRoles.find((r) => r.id === selectedRole);

  const handleApply = async (id: string) => {
    if (!selectedRole) return;
    
    // Prepare form data with selected role
    const applicationData: RecruitmentFormData = {
      ...formData,
      roleId: selectedRole,
      name: formData.name || '',
      email: formData.email || '',
      phone: formData.phone || '',
      year: formData.year || '',
      branch: formData.branch || '',
      skills: formData.skills || [],
      experience: formData.experience || ''
    };

    const success = await submitForm(applicationData);
    if (success) {
      setApplied((prev) => new Set(prev).add(id));
      setSelectedRole(null);
      resetForm();
    }
  };

  return (
    <div className="min-h-screen">
      <VideoHeader
        title="Recruitment Hub"
        tagline="Join our crew — open positions below"
        videoSrc={eventsVideo}
      />
      
      <div className="content-container section-spacing">
        {/* Section Title */}
        <AnimatedHeading
          variant="h2"
          typewriter={true}
          glow={true}
          delay={0}
          duration={40}
          subheading="Join our crew — open positions below"
          className="mb-8"
        >
          Open Positions
        </AnimatedHeading>

        {/* Application Status */}
        {applied.size > 0 && (
          <GlassCard className="p-4 mb-6" glow="teal">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-sub text-foreground">{applied.size} Application{applied.size > 1 ? "s" : ""} Submitted</p>
                <p className="text-xs text-muted-foreground">Under review — we'll contact you soon</p>
              </div>
            </div>
          </GlassCard>
        )}

      {/* Role Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {recruitmentRoles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard
              className="p-5"
              onClick={() => role.status === "open" && setSelectedRole(role.id)}
              glow={applied.has(role.id) ? "teal" : "none"}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="text-xs font-sub text-muted-foreground">{role.team}</span>
                </span>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-sub ${
                  role.status === "open" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                }`}>
                  {applied.has(role.id) ? "Applied" : role.status === "open" ? `${role.openings} open` : "Closed"}
                </span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-2">{role.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{role.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{role.eligibility}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {role.skills.map((skill) => (
                  <span key={skill} className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-sub">
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedRole(null)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 w-full max-w-lg rounded-t-2xl md:rounded-2xl gradient-border"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-heading text-xl text-foreground">{selected.title}</h2>
                <button onClick={() => setSelectedRole(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{selected.description}</p>
              <div className="space-y-4 mb-6">
                <div className="glass-card p-3 rounded-lg">
                  <label className="text-xs text-muted-foreground block mb-1">Full Name *</label>
                  <input 
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50 ${errors.name ? 'border-red-500/50' : ''}`}
                    placeholder="Enter your name" 
                  />
                  {errors.name && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1 mt-1 text-red-500 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </motion.div>
                  )}
                </div>
                
                <div className="glass-card p-3 rounded-lg">
                  <label className="text-xs text-muted-foreground block mb-1">Email *</label>
                  <input 
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50 ${errors.email ? 'border-red-500/50' : ''}`}
                    placeholder="your@email.com" 
                  />
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1 mt-1 text-red-500 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </motion.div>
                  )}
                </div>

                <div className="glass-card p-3 rounded-lg">
                  <label className="text-xs text-muted-foreground block mb-1">Phone *</label>
                  <input 
                    value={formData.phone || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50 ${errors.phone ? 'border-red-500/50' : ''}`}
                    placeholder="1234567890" 
                  />
                  {errors.phone && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1 mt-1 text-red-500 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </motion.div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="glass-card p-3 rounded-lg">
                    <label className="text-xs text-muted-foreground block mb-1">Year *</label>
                    <select 
                      value={formData.year || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      className={`w-full bg-transparent text-sm text-foreground outline-none ${errors.year ? 'border-red-500/50' : ''}`}
                    >
                      <option value="" className="bg-background">Select Year</option>
                      <option value="1st" className="bg-background">1st Year</option>
                      <option value="2nd" className="bg-background">2nd Year</option>
                      <option value="3rd" className="bg-background">3rd Year</option>
                      <option value="4th" className="bg-background">4th Year</option>
                    </select>
                    {errors.year && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1 mt-1 text-red-500 text-xs"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.year}
                      </motion.div>
                    )}
                  </div>

                  <div className="glass-card p-3 rounded-lg">
                    <label className="text-xs text-muted-foreground block mb-1">Branch *</label>
                    <select 
                      value={formData.branch || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                      className={`w-full bg-transparent text-sm text-foreground outline-none ${errors.branch ? 'border-red-500/50' : ''}`}
                    >
                      <option value="" className="bg-background">Select Branch</option>
                      <option value="CSE" className="bg-background">CSE</option>
                      <option value="ECE" className="bg-background">ECE</option>
                      <option value="MAE" className="bg-background">MAE</option>
                      <option value="IT" className="bg-background">IT</option>
                    </select>
                    {errors.branch && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1 mt-1 text-red-500 text-xs"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.branch}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="glass-card p-3 rounded-lg">
                  <label className="text-xs text-muted-foreground block mb-1">Why this role? *</label>
                  <textarea 
                    value={formData.experience || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    rows={3} 
                    className={`w-full bg-transparent text-sm text-foreground outline-none resize-none placeholder:text-muted-foreground/50 ${errors.experience ? 'border-red-500/50' : ''}`}
                    placeholder="Tell us why you're interested in this role (minimum 50 characters)..." 
                  />
                  {errors.experience && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1 mt-1 text-red-500 text-xs"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.experience}
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Global Error */}
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errors.submit}
                </motion.div>
              )}

              <button
                onClick={() => handleApply(selected.id)}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-sub font-semibold text-sm flex items-center justify-center gap-2 animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground border-r-transparent border-b-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Application
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default RecruitmentPage;
