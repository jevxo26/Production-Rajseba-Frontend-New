"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, Sparkles, ArrowRight, Tag, BookmarkCheck } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

interface SavedServiceCardProps {
  service: any;
  handleUnsave: (id: string | number, title: string) => void;
}

export default function SavedServiceCard({ service, handleUnsave }: SavedServiceCardProps) {
  const lang = useAppSelector((state) => state.lang.value);

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.015 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-xl rounded-[28px] border border-slate-100/90 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#FF6014]/5 hover:border-[#FF6014]/20 transition-all duration-300 flex flex-col group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden">
        <img
          src={
            service.image ||
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80"
          }
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        {service.category?.name && (
          <span className="absolute top-3 left-3 py-1 px-3 bg-white/90 backdrop-blur-md text-[10px] font-black text-slate-800 rounded-full uppercase tracking-wider shadow-2xs border border-white/40 flex items-center gap-1">
            <Tag size={10} className="text-[#FF6014]" />
            {service.category.name}
          </span>
        )}

        {/* Remove / Heart Button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleUnsave(service.id, service.name)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-[#FF6014] text-white shadow-md shadow-[#FF6014]/30 hover:bg-[#E0530A] transition-all cursor-pointer"
          aria-label="Remove from wishlist"
        >
          <Heart size={15} className="fill-white" />
        </motion.button>
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-black text-slate-900 text-sm line-clamp-1 tracking-tight">{service.name}</h3>
            {service.reviews?.length > 0 && (
              <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs shrink-0 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                <Star size={11} className="fill-current" />
                {(
                  service.reviews.reduce((acc: number, r: any) => acc + (r.rating || 5), 0) / service.reviews.length
                ).toFixed(1)}
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500 font-semibold line-clamp-2 leading-relaxed">
            {service.subtitle || (service.description ? service.description.replace(/<[^>]*>/g, "") : (lang === "bn" ? "প্রিমিয়াম এবং ভেরিফাইড সার্ভিস।" : "Premium vetted service."))}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 gap-2">
          <Link
            href={`/services/${service.id}`}
            className="flex-1 text-center bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 text-xs font-extrabold px-3 py-2.5 rounded-xl transition-all border border-slate-200/50"
          >
            {lang === "bn" ? "বিস্তারিত" : "Details"}
          </Link>
          <Link
            href={`/categories/service/${service.slug || service.id}`}
            className="flex-1 text-center bg-gradient-to-r from-[#FF6014] to-[#E0530A] hover:opacity-95 text-white text-xs font-black px-3 py-2.5 rounded-xl transition-all shadow-md shadow-[#FF6014]/20 flex items-center justify-center gap-1"
          >
            <span>{lang === "bn" ? "বুক করুন" : "Book Now"}</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
