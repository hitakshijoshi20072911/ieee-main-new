import { useState, useEffect, useCallback } from 'react';

// Types for form data
export interface RecruitmentFormData {
  name: string;
  email: string;
  phone: string;
  year: string;
  branch: string;
  skills: string[];
  experience: string;
  roleId: string;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  rating: number;
  category: string;
  message: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface ReminderData {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  reminderDate: string;
  isScheduled: boolean;
}

// Local storage keys
const STORAGE_KEYS = {
  RECRUITMENT_SUBMISSIONS: 'ieee_recruitment_submissions',
  FEEDBACK_SUBMISSIONS: 'ieee_feedback_submissions',
  REMINDERS: 'ieee_reminders',
  QR_CODES: 'ieee_qr_codes',
} as const;

// Recruitment Form Hook
export const useRecruitmentForm = () => {
  const [formData, setFormData] = useState<Partial<RecruitmentFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback((data: Partial<RecruitmentFormData>): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!data.name?.trim()) newErrors.name = 'Name is required';
    if (!data.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = 'Invalid email format';
    if (!data.phone?.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
    if (!data.year) newErrors.year = 'Year is required';
    if (!data.branch) newErrors.branch = 'Branch is required';
    if (!data.roleId) newErrors.roleId = 'Role selection is required';
    if (!data.experience?.trim()) newErrors.experience = 'Experience is required';
    else if (data.experience.length < 50) newErrors.experience = 'Experience must be at least 50 characters';

    return newErrors;
  }, []);

  const submitForm = useCallback(async (data: RecruitmentFormData) => {
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store submission locally
      const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.RECRUITMENT_SUBMISSIONS) || '[]');
      const newSubmission = {
        ...data,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      submissions.push(newSubmission);
      localStorage.setItem(STORAGE_KEYS.RECRUITMENT_SUBMISSIONS, JSON.stringify(submissions));

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      return true;
    } catch (error) {
      setErrors({ submit: 'Failed to submit application. Please try again.' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm]);

  const resetForm = useCallback(() => {
    setFormData({});
    setErrors({});
    setIsSubmitted(false);
  }, []);

  return {
    formData,
    setFormData,
    isSubmitting,
    isSubmitted,
    errors,
    submitForm,
    resetForm,
    validateForm
  };
};

// Feedback Form Hook
export const useFeedbackForm = () => {
  const [formData, setFormData] = useState<Partial<FeedbackFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const analyzeSentiment = useCallback((message: string): 'positive' | 'neutral' | 'negative' => {
    const positiveWords = ['great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'good', 'love', 'perfect', 'awesome', 'brilliant'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'worst', 'disappointing', 'poor', 'sad', 'angry'];
    
    const lowerMessage = message.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerMessage.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerMessage.includes(word)).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }, []);

  const validateForm = useCallback((data: Partial<FeedbackFormData>): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!data.name?.trim()) newErrors.name = 'Name is required';
    if (!data.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = 'Invalid email format';
    if (!data.rating || data.rating < 1 || data.rating > 5) newErrors.rating = 'Valid rating is required';
    if (!data.category) newErrors.category = 'Category is required';
    if (!data.message?.trim()) newErrors.message = 'Message is required';
    else if (data.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

    return newErrors;
  }, []);

  const submitForm = useCallback(async (data: FeedbackFormData) => {
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store submission locally
      const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEEDBACK_SUBMISSIONS) || '[]');
      const newSubmission = {
        ...data,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        sentiment: analyzeSentiment(data.message)
      };
      submissions.push(newSubmission);
      localStorage.setItem(STORAGE_KEYS.FEEDBACK_SUBMISSIONS, JSON.stringify(submissions));

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      return true;
    } catch (error) {
      setErrors({ submit: 'Failed to submit feedback. Please try again.' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, analyzeSentiment]);

  const resetForm = useCallback(() => {
    setFormData({});
    setErrors({});
    setIsSubmitted(false);
  }, []);

  return {
    formData,
    setFormData,
    isSubmitting,
    isSubmitted,
    errors,
    submitForm,
    resetForm,
    analyzeSentiment
  };
};

// QR Generator Hook
export const useQRGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);

  const generateQRFromEvent = useCallback(async (eventData: any) => {
    setIsGenerating(true);
    
    try {
      // Create comprehensive event data for QR
      const qrContent = {
        type: 'event',
        id: eventData.id || Date.now().toString(),
        title: eventData.title || 'Event',
        date: eventData.date || new Date().toISOString(),
        location: eventData.location || 'TBD',
        description: eventData.description || '',
        organizer: 'IEEE IGDTUW',
        registration: eventData.registrationLink || '#'
      };

      const qrString = JSON.stringify(qrContent);
      setQrData(qrString);

      // Store QR data locally
      const qrCodes = JSON.parse(localStorage.getItem(STORAGE_KEYS.QR_CODES) || '[]');
      qrCodes.push({
        id: qrContent.id,
        eventData: qrContent,
        qrData: qrString,
        generatedAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEYS.QR_CODES, JSON.stringify(qrCodes));

      return qrString;
    } catch (error) {
      console.error('Failed to generate QR:', error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearQR = useCallback(() => {
    setQrData(null);
  }, []);

  return {
    isGenerating,
    qrData,
    generateQRFromEvent,
    clearQR
  };
};

// Reminder System Hook
export const useReminderSystem = () => {
  const [reminders, setReminders] = useState<ReminderData[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  // Check notification support and request permission
  useEffect(() => {
    const checkSupport = () => {
      const supported = 'Notification' in window && 'serviceWorker' in navigator;
      setIsSupported(supported);
      
      if (supported) {
        setPermission(Notification.permission);
      }
    };

    checkSupport();

    // Load existing reminders
    const storedReminders = JSON.parse(localStorage.getItem(STORAGE_KEYS.REMINDERS) || '[]');
    setReminders(storedReminders);
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const scheduleReminder = useCallback(async (reminderData: Omit<ReminderData, 'id' | 'isScheduled'>) => {
    const reminder: ReminderData = {
      ...reminderData,
      id: Date.now().toString(),
      isScheduled: true
    };

    // Store reminder
    const updatedReminders = [...reminders, reminder];
    setReminders(updatedReminders);
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(updatedReminders));

    // Schedule browser notification
    if (isSupported && permission === 'granted') {
      const reminderTime = new Date(reminder.reminderDate).getTime();
      const currentTime = new Date().getTime();
      const delay = reminderTime - currentTime;

      if (delay > 0) {
        setTimeout(() => {
          new Notification(reminder.title, {
            body: reminder.description,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: reminder.id,
            requireInteraction: true
          });
        }, delay);
      }
    }

    return reminder;
  }, [reminders, isSupported, permission]);

  const cancelReminder = useCallback((reminderId: string) => {
    const updatedReminders = reminders.filter(r => r.id !== reminderId);
    setReminders(updatedReminders);
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(updatedReminders));
  }, [reminders]);

  const clearAllReminders = useCallback(() => {
    setReminders([]);
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify([]));
  }, []);

  return {
    reminders,
    isSupported,
    permission,
    requestPermission,
    scheduleReminder,
    cancelReminder,
    clearAllReminders
  };
};

// Social Links Hook
export const useSocialLinks = () => {
  const openLink = useCallback((url: string) => {
    // Validate URL
    try {
      const urlObj = new URL(url);
      window.open(urlObj.href, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Invalid URL:', url);
      // Fallback for relative URLs
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const socialLinks = {
    instagram: 'https://instagram.com/ieeeigdtuw',
    linkedin: 'https://linkedin.com/company/ieee-igdtuw',
    twitter: 'https://twitter.com/ieeeigdtuw',
    youtube: 'https://youtube.com/@ieeeigdtuw',
    github: 'https://github.com/hitakshijoshi20072911/ieee',
    website: 'https://igdtuw.ac.in'
  };

  return {
    openLink,
    socialLinks
  };
};
