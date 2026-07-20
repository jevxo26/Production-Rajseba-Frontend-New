"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, ChevronRight, Sparkles } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

export default function DiscoverMoreCard() {
  const lang = useAppSelector((state) => state.lang.value);

  return (
    <motion.div whileHover={{ y: -3, scale: 1.015 }} transition={{ duration: 0.3 }} className="h-full">
      <Link
        href="/services"
        className="h-full bg-white/90 backdrop-blur-xl rounded-[28px] border border-dashed border-orange-200/80 p-6 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-xl hover:shadow-[#FF6014]/5 hover:border-[#FF6014]/30 transition-all duration-300 group"
      >
        <div className="my-auto space-y-4">
          <div className="w-13 h-13 bg-orange-50/90 rounded-2xl flex items-center justify-center text-[#FF6014] mx-auto border border-orange-100 shadow-2xs group-hover:scale-110 transition-transform duration-300">
            <Plus size={22} />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-black text-slate-900 text-sm tracking-tight">
              {lang === "bn" ? "আরো খুঁজুন" : "Discover More"}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-[200px] mx-auto">
              {lang === "bn"
                ? "আরো নতুন সার্ভিস দেখতে চান? এই মাসের ট্রেন্ডিং সেবাসমূহ এক্সপ্লোর করুন।"
                : "Explore top trending home & digital services this month."}
            </p>
          </div>
        </div>
        <div className="mt-6 w-full bg-orange-50/60 group-hover:bg-[#FF6014] group-hover:text-white border border-orange-100 text-[#FF6014] text-xs font-black py-3 rounded-2xl transition-all text-center flex items-center justify-center gap-1 shadow-2xs">
          <span>{lang === "bn" ? "সার্ভিসসমূহ ব্রাউজ করুন" : "Browse Services"}</span>
          <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
