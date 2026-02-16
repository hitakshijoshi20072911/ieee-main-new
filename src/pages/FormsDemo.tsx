import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CinematicHeader } from '@/components/CinematicHeader';
import { FeedbackForm } from '@/components/FeedbackForm';
import { QRGenerator } from '@/components/QRGenerator';
import { ReminderSystem } from '@/components/ReminderSystem';
import GlassCard from '@/components/GlassCard';
import { staggerContainer, cardVariants } from '@/hooks/useMotionAnimations';
import { CheckCircle2, Settings, Bell, QrCode, MessageSquare } from 'lucide-react';

const FormsDemo = () => {
  const [activeTab, setActiveTab] = useState('feedback');

  // Sample event data for QR and reminders
  const sampleEvent = {
    id: 'demo-event-1',
    title: 'AI/ML Workshop 2025',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    location: 'Main Auditorium, IGDTUW',
    description: 'Hands-on workshop covering the latest in Artificial Intelligence and Machine Learning',
    registrationLink: 'https://ieee-igdtuw.ai-workshop.com'
  };

  const tabs = [
    { id: 'feedback', label: 'Feedback Form', icon: MessageSquare },
    { id: 'qr', label: 'QR Generator', icon: QrCode },
    { id: 'reminders', label: 'Reminder System', icon: Bell },
  ];

  return (
    <div className="min-h-screen">
      <CinematicHeader
        title="Forms & Functionality"
        tagline="Interactive demo of form features and utilities"
        fallbackImage="/hero-planet.jpg"
        floatingElement="planet"
      />
      
      <div className="content-container section-spacing">
        {/* Tab Navigation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex gap-2 overflow-x-auto pb-4 mb-8 snap-x"
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variants={cardVariants}
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-sub whitespace-nowrap transition-all snap-center ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'feedback' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-6">
                <GlassCard className="p-6" glow="blue">
                  <h3 className="font-heading text-xl text-foreground mb-4">
                    Feedback Form Demo
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try our intelligent feedback form with real-time sentiment analysis and validation.
                  </p>
                </GlassCard>
                
                <FeedbackForm />
              </div>
            </motion.div>
          )}

          {activeTab === 'qr' && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-6">
                <GlassCard className="p-6" glow="blue">
                  <h3 className="font-heading text-xl text-foreground mb-4">
                    QR Generator Demo
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Generate QR codes for events with download and sharing capabilities.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-sub text-sm text-foreground mb-2">Event Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Title:</strong> {sampleEvent.title}</p>
                        <p><strong>Date:</strong> {new Date(sampleEvent.date).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> {sampleEvent.location}</p>
                        <p><strong>Description:</strong> {sampleEvent.description}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-sub text-sm text-foreground mb-2">Features</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Event data encoding</li>
                        <li>• Download as PNG</li>
                        <li>• Share functionality</li>
                        <li>• Animated borders</li>
                      </ul>
                    </div>
                  </div>
                </GlassCard>
                
                <QRGenerator eventData={sampleEvent} />
              </div>
            </motion.div>
          )}

          {activeTab === 'reminders' && (
            <motion.div
              key="reminders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-6">
                <GlassCard className="p-6" glow="blue">
                  <h3 className="font-heading text-xl text-foreground mb-4">
                    Reminder System Demo
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Schedule browser notifications for events with local storage management.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-sub text-sm text-foreground mb-2">Sample Event</h4>
                      <div className="space-y-2 text-sm">
                        <p><strong>Title:</strong> {sampleEvent.title}</p>
                        <p><strong>When:</strong> {new Date(sampleEvent.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {new Date(sampleEvent.date).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-sub text-sm text-foreground mb-2">Features</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Browser notifications</li>
                        <li>• Custom reminder times</li>
                        <li>• Local storage sync</li>
                        <li>• Permission management</li>
                      </ul>
                    </div>
                  </div>
                </GlassCard>
                
                <ReminderSystem eventData={sampleEvent} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Overview */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="font-heading text-2xl text-foreground mb-6 text-center">
            All Form Features
          </h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div variants={cardVariants} custom={0}>
              <GlassCard className="p-6 h-full" variant="morph">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-sub text-lg text-foreground">Smart Forms</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time validation</li>
                  <li>• Error handling</li>
                  <li>• Success animations</li>
                  <li>• Local storage</li>
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div variants={cardVariants} custom={1}>
              <GlassCard className="p-6 h-full" variant="morph">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-sub text-lg text-foreground">QR Generation</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Event data encoding</li>
                  <li>• Download functionality</li>
                  <li>• Share capabilities</li>
                  <li>• Custom styling</li>
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div variants={cardVariants} custom={2}>
              <GlassCard className="p-6 h-full" variant="morph">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
                    <Bell className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="font-sub text-lg text-foreground">Reminders</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Browser notifications</li>
                  <li>• Custom scheduling</li>
                  <li>• Permission management</li>
                  <li>• Local persistence</li>
                </ul>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FormsDemo;
