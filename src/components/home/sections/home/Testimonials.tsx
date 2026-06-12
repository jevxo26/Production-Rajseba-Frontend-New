"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// Expanded mock reviews (5 total) matching the required premium coverflow design
const TESTIMONIALS_CONTENT = {
  title: "Real Happy Customers, Real Stories",
  subtitle: "Read reviews from families and businesses who trust our experts daily",
  testimonials: [
    {
      name: "Rahim Ahmed",
      location: "Gulshan, Dhaka",
      rating: 5,
      text: '"The AC technician was professional, polite, and fixed my unit in under an hour. Very satisfied with the quick service!"',
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      glowColor: "from-cyan-400 to-blue-500",
    },
    {
      name: "Sharmin R.",
      location: "Banani, Dhaka",
      rating: 5,
      text: '"Painting my apartment was seamless. The team was punctual, handled furniture carefully, and did an amazing job."',
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      glowColor: "from-rose-400 to-orange-400",
    },
    {
      name: "Kazi Farhan",
      location: "Uttara, Dhaka",
      rating: 5,
      text: '"Best cleaning service I\'ve ever used. My home has never looked cleaner. Highly recommended for busy professionals!"',
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      glowColor: "from-emerald-400 to-teal-500",
    },
    {
      name: "Tasnim Jahan",
      location: "Dhanmondi, Dhaka",
      rating: 5,
      text: '"Very satisfied with the plumbing repair. They diagnosed the leak quickly and fixed it at a very reasonable price."',
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
      glowColor: "from-purple-400 to-indigo-500",
    },
    {
      name: "Adnan Chowdhury",
      location: "Mirpur, Dhaka",
      rating: 5,
      text: '"Courteous electricians who fixed my wiring issues professionally. They even cleaned up after completing the service."',
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
      glowColor: "from-amber-400 to-yellow-500",
    }
  ]
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with center index
  const [autoplay, setAutoplay] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1024);

  // Resize listener to adapt spacing dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = TESTIMONIALS_CONTENT.testimonials;
  const N = testimonials.length;

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % N);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplay, N]);

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % N);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + N) % N);
  };

  // Circular offset calculation to determine 3D positioning
  const getOffset = (idx: number) => {
    let offset = idx - activeIndex;
    if (offset < -Math.floor(N / 2)) offset += N;
    if (offset > Math.floor(N / 2)) offset -= N;
    return offset;
  };

  // Determine horizontal translation spacing based on screen width
  let spacing = 260; // Desktop
  if (windowWidth < 640) {
    spacing = 110; // Mobile
  } else if (windowWidth < 1024) {
    spacing = 180; // Tablet
  }

  const currentGlow = testimonials[activeIndex].glowColor;

  return (
    <div className="bg-transparent py-12 md:py-16 lg:py-20 overflow-hidden relative">
      {/* Decorative gradient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-slate-200/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {TESTIMONIALS_CONTENT.title}
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            {TESTIMONIALS_CONTENT.subtitle}
          </p>
        </div>

        {/* ── 3D COVERFLOW SLIDER WRAPPER ── */}
        <div 
          className="relative max-w-5xl mx-auto h-[380px] md:h-[350px] flex items-center justify-center overflow-visible select-none"
          style={{ perspective: "1000px" }}
        >
          {/* Central shifting glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className={`w-72 h-72 bg-gradient-to-r ${currentGlow} opacity-10 blur-[90px] rounded-full transition-all duration-750`} />
          </div>

          {/* Cards map */}
          {testimonials.map((test, idx) => {
            const offset = getOffset(idx);
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            
            // Render only visible range for mobile optimization
            if (absOffset > 2) return null;

            return (
              <motion.div
                key={idx}
                animate={{
                  x: offset * spacing,
                  scale: isActive ? 1.05 : 1 - absOffset * 0.12,
                  opacity: absOffset > 1 && windowWidth < 640 ? 0 : 1 - absOffset * 0.45,
                  zIndex: 30 - absOffset * 10,
                  rotateY: offset * -12,
                }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 16
                }}
                onClick={() => {
                  setAutoplay(false);
                  setActiveIndex(idx);
                }}
                className={`absolute w-[280px] sm:w-[350px] md:w-[420px] bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[280px] md:h-[300px] cursor-pointer pointer-events-auto origin-center`}
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex gap-0.5 mb-4 text-[#FF5A5F]">
                    {[...Array(test.rating)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-[#FF5A5F]" />
                    ))}
                  </div>

                  <p className="text-slate-700 italic leading-relaxed text-xs sm:text-sm md:text-base mb-6 font-medium line-clamp-4">
                    {test.text}
                  </p>
                </div>

                {/* Profile detail bottom */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-50">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                    <Image
                      src={memberAvatarFallback(test.avatar)}
                      alt={test.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                      {test.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold tracking-wide">
                      {test.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Buttons & Indicators */}
        <div className="flex flex-col items-center gap-6 mt-8">
          {/* Arrow Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:border-[#FF5A5F] hover:text-[#FF5A5F] flex items-center justify-center text-slate-500 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 z-20"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:border-[#FF5A5F] hover:text-[#FF5A5F] flex items-center justify-center text-slate-500 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 z-20"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-2.5">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setAutoplay(false);
                  setActiveIndex(dotIdx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeIndex ? "w-6 bg-[#FF5A5F]" : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Fallback helper to prevent compilation issues with external unsplash urls
function memberAvatarFallback(url: string) {
  return url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150";
}

export default Testimonials;
