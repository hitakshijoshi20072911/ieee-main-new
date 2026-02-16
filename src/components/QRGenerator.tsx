import { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import GlassCard from '@/components/GlassCard';
import { useQRGenerator } from '@/hooks/useForms';
import { QrCode, Download, Share2, Calendar, MapPin, Users } from 'lucide-react';

interface QRGeneratorProps {
  eventData?: {
    id?: string;
    title: string;
    date: string;
    location: string;
    description?: string;
    registrationLink?: string;
  };
  className?: string;
}

/**
 * QR Generator component for creating event QR codes
 * Features download, share, and display functionality
 */
export const QRGenerator = ({ eventData, className = '' }: QRGeneratorProps) => {
  const { isGenerating, qrData, generateQRFromEvent, clearQR } = useQRGenerator();
  const [showQR, setShowQR] = useState(false);

  const handleGenerateQR = async () => {
    if (!eventData) return;
    
    const success = await generateQRFromEvent(eventData);
    if (success) {
      setShowQR(true);
    }
  };

  const handleDownload = () => {
    if (!qrData) return;

    // Create canvas from QR code
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate QR code as image
    const qrElement = document.getElementById('qr-code-display');
    if (!qrElement) return;

    const qrImage = new Image();
    qrElement.appendChild(qrImage);

    // Alternative: Use QRCode library to generate image
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    // Create download link
    const link = document.createElement('a');
    link.download = `event-qr-${eventData.title.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleShare = async () => {
    if (!qrData || !eventData) return;

    const shareData = {
      title: eventData.title,
      text: `Join us for ${eventData.title} on ${new Date(eventData.date).toLocaleDateString()}!`,
      url: eventData.registrationLink || window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Event details copied to clipboard!');
      }
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Generate QR Button */}
      <motion.button
        onClick={handleGenerateQR}
        disabled={isGenerating || !eventData}
        className="w-full glass-card p-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <QrCode className="w-5 h-5 text-primary" />
        <span className="font-sub font-medium">
          {isGenerating ? 'Generating...' : 'Generate QR Code'}
        </span>
      </motion.button>

      {/* QR Display */}
      {showQR && qrData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="space-y-4"
        >
          <GlassCard className="p-6" glow="blue">
            {/* QR Code Display */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div id="qr-code-display" className="bg-white p-4 rounded-xl">
                  <QRCodeSVG
                    value={qrData}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border-2 border-primary/30 animate-pulse" />
              </div>
            </div>

            {/* Event Details */}
            {eventData && (
              <div className="space-y-2 mb-4">
                <h3 className="font-heading text-lg text-foreground text-center">
                  {eventData.title}
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(eventData.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {eventData.location}
                  </span>
                </div>
                {eventData.description && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {eventData.description}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                onClick={handleDownload}
                className="flex-1 glass-card p-3 rounded-lg flex items-center justify-center gap-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                Download
              </motion.button>
              
              <motion.button
                onClick={handleShare}
                className="flex-1 glass-card p-3 rounded-lg flex items-center justify-center gap-2 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
              
              <motion.button
                onClick={() => {
                  clearQR();
                  setShowQR(false);
                }}
                className="glass-card p-3 rounded-lg flex items-center justify-center text-sm text-muted-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};
