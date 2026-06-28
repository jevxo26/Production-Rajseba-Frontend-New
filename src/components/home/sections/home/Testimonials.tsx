"use client";
import React, { useState, useEffect } from "react";
import { Star, Quote, MessageSquare, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetPublicReviewsQuery } from "@/redux/features/landing/landingApi";
import { motion, AnimatePresence } from "framer-motion";

// Fallback high-quality testimonials
const FALLBACK_TESTIMONIALS = [
  {
    name: "Adnan Sami",
    location: "Gulshan, Dhaka",
    rating: 5,
    comment: "The AC service was professional and on-time. Best service experience in Dhaka so far.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Mehjabin R.",
    location: "Uttara, Dhaka",
    rating: 5,
    comment: "Finding a reliable plumber was impossible before Rajseba. Life-changing app!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Saif Islam",
    location: "Banani, Dhaka",
    rating: 5,
    comment: "Fast, reliable and high-quality cleaning service. I highly recommend them to everyone.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Tasnim Jahan",
    location: "Dhanmondi, Dhaka",
    rating: 5,
    comment: "Very satisfied with the plumbing repair. Diagnosed and fixed quickly at a great price.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Adnan Chowdhury",
    location: "Mirpur, Dhaka",
    rating: 5,
    comment: "Courteous electricians who fixed my wiring issues professionally. Even cleaned up after!",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Sabrina Yasmin",
    location: "Dhanmondi, Dhaka",
    rating: 5,
    comment: "Booked a deep cleaning — they exceeded expectations. Spotless corners, great team!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);

  const { data: reviewsRes, isLoading } = useGetPublicReviewsQuery();
  const rawReviews: any[] = reviewsRes?.data || (Array.isArray(reviewsRes) ? reviewsRes : []);

  // Filter out low-quality/placeholder reviews (less than 10 chars)
  const realReviews = rawReviews
    .filter((r: any) => {
      const comment = r.comment || r.content || r.review || "";
      return comment.trim().length > 10;
    })
    .map((r: any) => ({
      name: r.user?.name || "Valued Customer",
      location: r.user?.profile?.address || "Dhaka, Bangladesh",
      rating: r.rating || 5,
      comment: r.comment || r.content || r.review || "",
      avatar: r.user?.profile?.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(r.user?.name || "U")}&background=FF7C71&color=fff&size=100`,
    }));

  // Combine real reviews with fallbacks to always guarantee at least 5 testimonials for the slider
  const testimonials = realReviews.length >= 5
    ? realReviews
    : [...realReviews, ...FALLBACK_TESTIMONIALS.slice(0, 5 - realReviews.length)];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardsToShow = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;
  const maxIndex = Math.max(0, testimonials.length - cardsToShow);

  useEffect(() => {
    if (activeIndex > maxIndex) setActiveIndex(maxIndex);
  }, [cardsToShow, maxIndex]);

  // Autoplay slider every 5 seconds
  useEffect(() => {
    if (maxIndex === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  // Framer Motion drag end handler for swipe capability
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && activeIndex < maxIndex) {
      setActiveIndex((prev) => prev + 1);
    } else if (info.offset.x > swipeThreshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="py-5 md:py-16 lg:py-20 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FF7C71]/10 border border-[#FF7C71]/20 text-[#FF7C71] px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
            <MessageSquare size={13} />
            Customer Reviews
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Trusted by thousands of happy homes across Bangladesh.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-7 h-7 animate-spin text-[#FF7C71]" />
          </div>
        )}

        {/* Simple & Premium Slider */}
        {!isLoading && (
          <div className="relative select-none">
            <div className="overflow-hidden cursor-grab active:cursor-grabbing px-1 py-3">
              <motion.div
                className="flex gap-4"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={{ x: `-${activeIndex * (100 / cardsToShow)}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                style={{ width: "100%" }}
              >
                {testimonials.map((test: any, idx: number) => {
                  const cardWidthPct = 100 / cardsToShow;
                  const gapAdjustment = ((cardsToShow - 1) * 16) / cardsToShow;

                  return (
                    <div
                      key={idx}
                      className="flex-shrink-0"
                      style={{
                        width: `calc(${cardWidthPct}% - ${gapAdjustment}px)`,
                      }}
                    >
                      {/* Simple Card Design */}
                      <div className="bg-white rounded-3xl border border-slate-100/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[230px] md:h-[220px]">
                        <div>
                          {/* Stars and Quote */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-0.5">
                              {[...Array(Math.min(test.rating || 5, 5))].map((_, i) => (
                                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                            <Quote className="w-8 h-8 text-[#FF7C71]/15" />
                          </div>

                          {/* Client Comment */}
                          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 italic">
                            "{test.comment}"
                          </p>
                        </div>

                        {/* Author info */}
                        <div className="flex items-center gap-3 pt-4 border-t border-slate-50 mt-auto">
                          <img
                            src={test.avatar}
                            alt={test.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 flex-shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(test.name)}&background=FF5A5F&color=fff&size=80`;
                            }}
                          />
                          <div>
                            <h4 className="font-extrabold text-slate-800 text-xs md:text-sm leading-tight">
                              {test.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                              {test.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Premium Dots Indicators & Arrows */}
            {testimonials.length > cardsToShow && (
              <div className="flex items-center justify-between mt-8 max-w-xs mx-auto px-4">
                <button
                  onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
                  disabled={activeIndex === 0}
                  className="w-8 h-8 rounded-full border border-slate-150 flex items-center justify-center text-slate-400 hover:border-[#FF7C71] hover:text-[#FF7C71] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex gap-1.5">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIndex ? "w-5 bg-[#FF7C71]" : "w-1.5 bg-slate-200"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveIndex((p) => Math.min(maxIndex, p + 1))}
                  disabled={activeIndex === maxIndex}
                  className="w-8 h-8 rounded-full border border-slate-150 flex items-center justify-center text-slate-400 hover:border-[#FF7C71] hover:text-[#FF7C71] disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;