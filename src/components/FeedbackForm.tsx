import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { useFeedbackForm, FeedbackFormData } from '@/hooks/useForms';
import { Star, Send, CheckCircle2, AlertCircle, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

interface FeedbackFormProps {
  className?: string;
  onSuccess?: () => void;
}

/**
 * Feedback Form component with sentiment analysis and validation
 * Features real-time sentiment preview and form validation
 */
export const FeedbackForm = ({ className = '', onSuccess }: FeedbackFormProps) => {
  const {
    formData,
    setFormData,
    isSubmitting,
    isSubmitted,
    errors,
    submitForm,
    analyzeSentiment
  } = useFeedbackForm();

  const [currentSentiment, setCurrentSentiment] = useState<'positive' | 'neutral' | 'negative'>('neutral');

  // Update sentiment as user types
  useEffect(() => {
    if (formData.message) {
      const sentiment = analyzeSentiment(formData.message);
      setCurrentSentiment(sentiment);
    }
  }, [formData.message, analyzeSentiment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitForm(formData as FeedbackFormData);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  const handleInputChange = (field: keyof FeedbackFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setFormData(prev => ({ ...prev }));
    }
  };

  const getSentimentIcon = () => {
    switch (currentSentiment) {
      case 'positive': return <ThumbsUp className="w-4 h-4" />;
      case 'negative': return <ThumbsDown className="w-4 h-4" />;
      default: return <Meh className="w-4 h-4" />;
    }
  };

  const getSentimentColor = () => {
    switch (currentSentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const categories = [
    'Event Quality',
    'Content Relevance',
    'Speaker Performance',
    'Organization',
    'Venue & Facilities',
    'Networking Opportunities',
    'Overall Experience',
    'Other'
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <GlassCard className="p-6" glow="blue">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h3 className="font-heading text-xl text-foreground mb-2">Share Your Feedback</h3>
            <p className="text-sm text-muted-foreground">
              Help us improve by sharing your experience
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-sub text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full glass-card px-4 py-3 rounded-lg bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50 transition-all ${
                  errors.name ? 'border-red-500/50' : 'border-transparent'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-500 text-xs"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </motion.div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-sub text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full glass-card px-4 py-3 rounded-lg bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50 transition-all ${
                  errors.email ? 'border-red-500/50' : 'border-transparent'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-500 text-xs"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </motion.div>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-sub text-foreground mb-2">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => handleInputChange('rating', star)}
                    className="p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= (formData.rating || 0)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {errors.rating && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-500 text-xs"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.rating}
                </motion.div>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-sub text-foreground mb-2">
                Category *
              </label>
              <select
                value={formData.category || ''}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full glass-card px-4 py-3 rounded-lg bg-transparent text-foreground outline-none transition-all ${
                  errors.category ? 'border-red-500/50' : 'border-transparent'
                }`}
              >
                <option value="" className="bg-background">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-background">
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-500 text-xs"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.category}
                </motion.div>
              )}
            </div>

            {/* Message with Sentiment Preview */}
            <div>
              <label className="block text-sm font-sub text-foreground mb-2">
                Message *
              </label>
              <div className="relative">
                <textarea
                  value={formData.message || ''}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className={`w-full glass-card px-4 py-3 rounded-lg bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50 resize-none transition-all ${
                    errors.message ? 'border-red-500/50' : 'border-transparent'
                  }`}
                  placeholder="Share your detailed feedback..."
                />
                
                {/* Sentiment Indicator */}
                {formData.message && formData.message.length > 10 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 glass-card text-xs ${getSentimentColor()}`}
                  >
                    {getSentimentIcon()}
                    <span className="capitalize">{currentSentiment}</span>
                  </motion.div>
                )}
              </div>
              {errors.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-500 text-xs"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </motion.div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full glass-card px-6 py-4 rounded-lg font-sub font-semibold text-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary border-r-transparent border-b-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Feedback
              </>
            )}
          </motion.button>

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
        </form>
      </GlassCard>

      {/* Success Animation */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <GlassCard className="p-8 text-center max-w-sm w-full" glow="teal">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </motion.div>
              <h3 className="font-heading text-xl text-foreground mb-2">
                Thank You!
              </h3>
              <p className="text-sm text-muted-foreground">
                Your feedback has been submitted successfully. We appreciate your input!
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
