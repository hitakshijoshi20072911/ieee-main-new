import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaLinkedin, 
  FaTwitter, 
  FaYoutube, 
  FaEnvelope 
} from 'react-icons/fa';
import { useSocialLinks } from '@/hooks/useForms';
import { 
  staggerContainer, 
  cardVariants, 
  scaleFadeVariants 
} from '@/hooks/useMotionAnimations';

/**
 * Responsive galactic-themed footer with glassmorphism styling
 * Features neon glow effects and smooth animations
 */
export const GalacticFooter = () => {
  const { openLink, socialLinks } = useSocialLinks();

  const socialItems = [
    { icon: FaInstagram, href: socialLinks.instagram, label: 'Instagram' },
    { icon: FaLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, href: socialLinks.twitter, label: 'Twitter' },
    { icon: FaYoutube, href: socialLinks.youtube, label: 'YouTube' },
    { icon: FaEnvelope, href: `mailto:contact@igdtuw.ac.in`, label: 'Email' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient glow border at top */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full w-full gradient-animated" />
      </div>
      
      {/* Deep black background with silver glow */}
      <div className="silver-glow-footer relative">
        <div className="content-container section-spacing">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0"
          >
            {/* IEEE IGDTUW Label */}
            <motion.div
              variants={scaleFadeVariants}
              className="text-center md:text-left"
            >
              <h3 className="font-heading text-2xl md:text-3xl font-bold gradient-text-animated mb-2 typewriter">
                IEEE IGDTUW
              </h3>
              <p className="body-text text-muted-foreground/70">
                Explore. Innovate. Engineer the future.
              </p>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialItems.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                  onClick={(e) => {
                    e.preventDefault();
                    openLink(social.href);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-violet rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                  <div className="relative glass-card p-3 rounded-full border border-border/20 hover:border-neon-blue/50 transition-all duration-300">
                    <social.icon className="w-5 h-5 text-foreground group-hover:text-neon-blue transition-colors duration-300" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            variants={scaleFadeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-8 mt-8 border-t border-border/10"
          >
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <p className="caption-text text-muted-foreground/50">
                © 2025 IEEE IGDTUW. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="link-text text-muted-foreground/50 hover:text-foreground/70">
                  Privacy Policy
                </a>
                <a href="#" className="link-text text-muted-foreground/50 hover:text-foreground/70">
                  Terms of Service
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--neon-blue) / 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, hsl(var(--neon-violet) / 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 40% 20%, hsl(var(--neon-teal) / 0.3) 0%, transparent 50%)`
          }} />
        </div>
      </div>
    </footer>
  );
};
