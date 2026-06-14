"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES_CONTENT = {
  title: "Top Rated Services",
  subtitle: "Handpicked vendors with the highest customer satisfaction.",
  viewAllText: "View All Services",
  viewAllHref: "/services",
  services: [
    {
      title: "Dhaka Cool Experts",
      description: "Master AC Servicing & Gas Refill",
      price: 750,
      rating: 4.9,
      category: "AC Repair",
      // Tailwind bg + icon colour pair
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      // Any lucide or heroicon SVG path – we inline a simple path here;
      // swap for your preferred icon library if needed
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.7.7m13.16 13.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M19.08 4.92l-.7.7M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 3.34A10 10 0 0 0 2 12c0 2.21.72 4.26 1.93 5.93" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 3.34A10 10 0 0 1 22 12c0 2.21-.72 4.26-1.93 5.93" />
        </svg>
      ),
      slug: "ac-repair",
    },
    {
      title: "ProFlow Plumbing",
      description: "Kitchen & Bathroom Specialist",
      price: 500,
      rating: 4.8,
      category: "Plumbing",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-500",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8 8 6 11 6 14a6 6 0 0 0 12 0c0-3-2-6-6-12Z" />
        </svg>
      ),
      slug: "plumbing",
    },
    {
      title: "Sparkle Home Care",
      description: "Deep Cleaning & Sanitization",
      price: 1200,
      rating: 5.0,
      category: "Cleaning",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-500",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
        </svg>
      ),
      slug: "home-cleaning",
    },
    {
      title: "VoltGuard Solutions",
      description: "Full Home Wiring & Panel Fix",
      price: 850,
      rating: 4.7,
      category: "Electrical",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-16 h-16">
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
      ),
      slug: "appliance-repair",
    },
  ],
};

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 14 },
  },
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function TopServices() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (index: number) =>
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <div className="bg-transparent mt-15 py-8 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Header ── */}
        <div className="space-y-4 mb-8 md:mb-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-[#FF5A5F]" />
              {SERVICES_CONTENT.title}
            </h2>

            <p className="text-slate-500 text-sm max-w-md mx-auto">
              {SERVICES_CONTENT.subtitle}
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Link
              href={SERVICES_CONTENT.viewAllHref}
              className="
          rounded-xl
          flex items-center gap-2
          px-5 py-2
          bg-white
          hover:bg-[#FFF0F1]
          hover:text-[#FF5A5F]
          border border-slate-200
          shadow-sm
        "
            >
              {SERVICES_CONTENT.viewAllText}
            </Link>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {SERVICES_CONTENT.services.map((service, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-[#FF5A5F]/20 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
            >
              {/* ── Illustration block (replaces photo) ── */}
              <div className={`relative h-48 md:h-52 ${service.bgColor} flex items-center justify-center overflow-hidden`}>

                {/* Subtle decorative ring behind icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-32 h-32 rounded-full opacity-10 ${service.bgColor.replace("50", "200")} border-[12px] border-current ${service.iconColor}`} />
                </div>

                {/* Icon */}
                <div className={`relative z-10 ${service.iconColor} drop-shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Verified badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider flex items-center gap-1 shadow-sm text-slate-700 uppercase">
                  <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>

                {/* Category pill – bottom left */}
                <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {service.category}
                </div>

                {/* Wishlist heart */}
                <Button
                  variant="ghost"
                  onClick={(e) => { e.preventDefault(); toggleLike(i); }}
                  className="absolute top-3 right-3 w-8 h-8 p-0 rounded-full bg-white/90 flex items-center justify-center shadow-sm border border-slate-100/60 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${liked[i] ? "fill-[#FF5A5F] text-[#FF5A5F]" : "text-slate-500"
                      }`}
                  />
                </Button>
              </div>

              {/* ── Text + CTA ── */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug tracking-tight">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-0.5 text-[#FF5A5F] font-black text-sm whitespace-nowrap">
                      <Star className="w-3 h-3 fill-[#FF5A5F]" />
                      <span>{service.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-400">{service.description}</p>
                </div>

                <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-50">
                  <div className="text-sm font-black text-slate-900">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      Starting at
                    </span>
                    <span>৳{service.price}</span>
                  </div>
                  <Link href={`/book/${service.slug}`}>
                    <Button className="bg-[#FF5A5F] hover:bg-[#FF4449] text-white text-xs font-extrabold px-4 py-2 h-auto rounded-xl transition-all cursor-pointer hover:scale-105 border-none shadow-md hover:shadow-lg">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}