import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { useReminderSystem } from '@/hooks/useForms';
import { Bell, BellOff, Calendar, Clock, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

interface ReminderSystemProps {
  eventData?: {
    id: string;
    title: string;
    date: string;
    description?: string;
  };
  className?: string;
}

/**
 * Reminder System component with browser notification support
 * Features local notification scheduling and management
 */
export const ReminderSystem = ({ eventData, className = '' }: ReminderSystemProps) => {
  const {
    reminders,
    isSupported,
    permission,
    requestPermission,
    scheduleReminder,
    cancelReminder,
    clearAllReminders
  } = useReminderSystem();

  const [reminderTime, setReminderTime] = useState('15');
  const [reminderUnit, setReminderUnit] = useState('minutes');
  const [isScheduling, setIsScheduling] = useState(false);

  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      // Show success message
    }
  };

  const handleScheduleReminder = async () => {
    if (!eventData) return;

    setIsScheduling(true);
    
    try {
      const eventDate = new Date(eventData.date);
      const reminderDate = new Date(eventDate);

      // Calculate reminder time based on user selection
      const timeValue = parseInt(reminderTime);
      switch (reminderUnit) {
        case 'minutes':
          reminderDate.setMinutes(reminderDate.getMinutes() - timeValue);
          break;
        case 'hours':
          reminderDate.setHours(reminderDate.getHours() - timeValue);
          break;
        case 'days':
          reminderDate.setDate(reminderDate.getDate() - timeValue);
          break;
      }

      // Don't schedule reminders in the past
      if (reminderDate <= new Date()) {
        alert('Reminder time must be in the future');
        return;
      }

      const reminder = await scheduleReminder({
        title: `Reminder: ${eventData.title}`,
        description: `Event starts in ${timeValue} ${reminderUnit}! ${eventData.description || ''}`,
        eventDate: eventData.date,
        reminderDate: reminderDate.toISOString()
      });

      if (reminder) {
        setIsScheduling(false);
      }
    } catch (error) {
      console.error('Failed to schedule reminder:', error);
      setIsScheduling(false);
    }
  };

  const formatReminderTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getTimeUntilReminder = (dateString: string) => {
    const now = new Date();
    const reminderDate = new Date(dateString);
    const diff = reminderDate.getTime() - now.getTime();

    if (diff <= 0) return 'Past due';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Permission Request */}
      {isSupported && permission === 'default' && (
        <GlassCard className="p-4" glow="blue">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-sub text-foreground mb-1">
                Enable Notifications
              </p>
              <p className="text-xs text-muted-foreground">
                Get reminded about upcoming events
              </p>
            </div>
            <motion.button
              onClick={handleRequestPermission}
              className="glass-card px-4 py-2 rounded-lg text-sm font-sub"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enable
            </motion.button>
          </div>
        </GlassCard>
      )}

      {/* Permission Denied */}
      {isSupported && permission === 'denied' && (
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <BellOff className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-sub text-foreground mb-1">
                Notifications Blocked
              </p>
              <p className="text-xs text-muted-foreground">
                Enable notifications in your browser settings to use reminders
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Schedule Reminder */}
      {eventData && isSupported && permission === 'granted' && (
        <GlassCard className="p-4" glow="teal">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-sub text-foreground">
                Set Reminder for {eventData.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="60"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-20 glass-card px-3 py-2 rounded bg-transparent text-foreground outline-none text-center"
              />
              <select
                value={reminderUnit}
                onChange={(e) => setReminderUnit(e.target.value)}
                className="glass-card px-3 py-2 rounded bg-transparent text-foreground outline-none"
              >
                <option value="minutes" className="bg-background">Minutes</option>
                <option value="hours" className="bg-background">Hours</option>
                <option value="days" className="bg-background">Days</option>
              </select>
              <span className="text-xs text-muted-foreground">before event</span>
            </div>

            <motion.button
              onClick={handleScheduleReminder}
              disabled={isScheduling}
              className="w-full glass-card px-4 py-3 rounded-lg font-sub font-medium text-primary flex items-center justify-center gap-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Clock className="w-4 h-4" />
              {isScheduling ? 'Scheduling...' : 'Schedule Reminder'}
            </motion.button>
          </div>
        </GlassCard>
      )}

      {/* Active Reminders */}
      {reminders.length > 0 && (
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-sub text-sm text-foreground">
              Active Reminders ({reminders.length})
            </h4>
            {reminders.length > 1 && (
              <motion.button
                onClick={clearAllReminders}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Clear All
              </motion.button>
            )}
          </div>

          <div className="space-y-2">
            {reminders.map((reminder) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 glass-card rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-sub text-foreground truncate">
                    {reminder.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{getTimeUntilReminder(reminder.reminderDate)}</span>
                  </div>
                </div>
                <motion.button
                  onClick={() => cancelReminder(reminder.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Not Supported */}
      {!isSupported && (
        <GlassCard className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-sub text-foreground mb-1">
                Notifications Not Supported
              </p>
              <p className="text-xs text-muted-foreground">
                Your browser doesn't support desktop notifications
              </p>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};
