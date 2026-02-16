import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import VideoHeader from "@/components/VideoHeader";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { galleryImages } from "@/mockData/data";
import { X, ZoomIn, ChevronLeft, ChevronRight, Calendar, MapPin, Users } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import eventsVideo from "@/assets/events.mp4";

const categories = ["All", "Hackathons", "Workshops", "Tech Talks", "Robotics", "AI Events", "Networking"];

// Themed placeholder images with gradients
const imageThemes = {
  "hackathon-1": "from-orange-500/30 to-red-500/30",
  "workshop-1": "from-blue-500/30 to-cyan-500/30", 
  "tech-talk-1": "from-purple-500/30 to-pink-500/30",
  "robotics-1": "from-green-500/30 to-emerald-500/30",
  "ai-event-1": "from-indigo-500/30 to-blue-500/30",
  "networking-1": "from-yellow-500/30 to-orange-500/30",
  "workshop-2": "from-teal-500/30 to-blue-500/30",
  "hackathon-2": "from-pink-500/30 to-rose-500/30",
  "tech-talk-2": "from-violet-500/30 to-purple-500/30",
  "robotics-2": "from-lime-500/30 to-green-500/30",
  "ai-event-2": "from-sky-500/30 to-blue-500/30",
  "networking-2": "from-amber-500/30 to-yellow-500/30",
  "hackathon-3": "from-red-500/30 to-pink-500/30",
  "workshop-3": "from-cyan-500/30 to-teal-500/30",
  "tech-talk-3": "from-fuchsia-500/30 to-purple-500/30",
  "robotics-3": "from-emerald-500/30 to-green-500/30",
  "ai-event-3": "from-blue-500/30 to-indigo-500/30",
  "networking-3": "from-orange-500/30 to-amber-500/30",
};

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Initialize Lenis smooth scroll
  useLenis();
  
  // Parallax effect for gallery
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const selectedImage = selectedImageIndex !== null ? filtered[selectedImageIndex] : null;

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImageIndex !== null) {
      navigateImage(1);
    }
    if (isRightSwipe && selectedImageIndex !== null) {
      navigateImage(-1);
    }
  };

  const navigateImage = (direction: number) => {
    if (selectedImageIndex === null) return;
    
    const newIndex = selectedImageIndex + direction;
    if (newIndex >= 0 && newIndex < filtered.length) {
      setSelectedImageIndex(newIndex);
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedImageIndex(null), 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === "ArrowLeft") navigateImage(-1);
      if (e.key === "ArrowRight") navigateImage(1);
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedImageIndex, filtered.length]);

  return (
    <div className="min-h-screen">
      <VideoHeader
        title="Mission Archives"
        tagline="Explore our journey through captured moments"
        videoSrc={eventsVideo}
      />
      
      <div className="content-container section-spacing">
        {/* Section Title */}
        <AnimatedHeading
          variant="h2"
          typewriter={true}
          glow={true}
          delay={0}
          duration={45}
          subheading="Explore our journey through captured moments"
          className="mb-8"
        >
          Mission Archives
        </AnimatedHeading>

        {/* Category Filter */}
        <motion.div 
          className="flex gap-2 overflow-x-auto pb-4 mb-8 snap-x"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-sub whitespace-nowrap transition-all snap-center ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "glass-card text-muted-foreground hover:text-foreground hover:scale-105"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div 
          ref={galleryRef}
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          style={{ y: parallaxY }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="break-inside-avoid"
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => openLightbox(index)}
              >
                <GlassCard 
                  className="group overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-300 rounded-2xl"
                  glow="blue"
                >
                  {/* Image Container */}
                  <div 
                    className={`relative bg-gradient-to-br ${imageThemes[image.image as keyof typeof imageThemes] || "from-primary/30 to-secondary/30"} overflow-hidden`}
                    style={{ height: `${200 + (index % 3) * 80}px` }}
                  >
                    {/* Placeholder Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2 opacity-20">
                          {image.category === "Hackathons" && "💻"}
                          {image.category === "Workshops" && "🛠️"}
                          {image.category === "Tech Talks" && "🎤"}
                          {image.category === "Robotics" && "🤖"}
                          {image.category === "AI Events" && "🧠"}
                          {image.category === "Networking" && "🤝"}
                        </div>
                        <div className="text-xs text-foreground/50 font-sub uppercase tracking-wider">
                          {image.category}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex items-center justify-between text-white">
                          <ZoomIn className="w-5 h-5" />
                          <span className="text-xs font-sub">View Details</span>
                        </div>
                      </div>
                    </div>

                    {/* Glow Border Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="font-heading text-sm text-foreground mb-2 group-hover:text-primary transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {image.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {image.year}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-sub">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GlassCard className="p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4 opacity-20">📸</div>
              <h3 className="font-heading text-lg text-foreground mb-2">No images found</h3>
              <p className="text-sm text-muted-foreground">
                Try selecting a different category or check back later.
              </p>
            </GlassCard>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Buttons */}
            {filtered.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full text-foreground hover:text-primary transition-colors"
                  disabled={selectedImageIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full text-foreground hover:text-primary transition-colors"
                  disabled={selectedImageIndex === filtered.length - 1}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </>
            )}

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-1 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden gradient-border"
            >
              {/* Image Display */}
              <div 
                className={`bg-gradient-to-br ${imageThemes[selectedImage.image as keyof typeof imageThemes] || "from-primary/30 to-secondary/30"} rounded-3xl flex items-center justify-center relative overflow-hidden`}
                style={{ minHeight: "400px" }}
              >
                <div className="text-center">
                  <div className="text-8xl mb-4 opacity-30">
                    {selectedImage.category === "Hackathons" && "💻"}
                    {selectedImage.category === "Workshops" && "🛠️"}
                    {selectedImage.category === "Tech Talks" && "🎤"}
                    {selectedImage.category === "Robotics" && "🤖"}
                    {selectedImage.category === "AI Events" && "🧠"}
                    {selectedImage.category === "Networking" && "🤝"}
                  </div>
                  <div className="text-lg text-foreground/50 font-sub uppercase tracking-wider">
                    {selectedImage.category}
                  </div>
                </div>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>
              
              {/* Image Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="font-heading text-2xl text-foreground mb-2">
                      {selectedImage.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {selectedImage.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {selectedImage.year}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-sub">
                        {selectedImage.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={closeLightbox}
                    className="glass-card p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Image Counter */}
                {filtered.length > 1 && (
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    {filtered.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === selectedImageIndex
                            ? "bg-primary w-6"
                            : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Close Hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground"
            >
              Press ESC or click outside to close • Use arrow keys to navigate
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
