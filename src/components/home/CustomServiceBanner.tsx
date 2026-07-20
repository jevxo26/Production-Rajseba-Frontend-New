"use client";

import React, { useState } from "react";
import { Sparkles, CalendarCheck, ArrowRight, ShieldCheck } from "lucide-react";
import CustomServiceRequestModal from "./CustomServiceRequestModal";

interface CustomServiceBannerProps {
  categoryName?: string;
  className?: string;
}

export default function CustomServiceBanner({
  categoryName,
  className = "",
}: CustomServiceBannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl p-6 md:p-8 border border-slate-200/80 shadow-[0_8px_32px_0_rgba(255,96,20,0.08)] ${className}`}
      >
        {/* Ambient Gloss and Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#FF6014]/15 to-amber-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-[#FF6014]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Content Layout */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6014]/10 border border-[#FF6014]/20 text-[#FF6014] text-[11px] font-black uppercase tracking-wider">
              <Sparkles size={13} className="animate-pulse text-[#FF6014]" />
              <span>Tailored Solutions</span>
            </div>

            <h3 className="text-lg md:text-2xl font-black tracking-tight text-slate-900 leading-snug">
              Do you want to get any custom service?
            </h3>

            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              Can't find exact predefined packages for{" "}
              <span className="text-[#FF6014] font-bold">
                {categoryName || "your requirements"}
              </span>
              ? Submit a custom service booking request and our expert team will customize a solution for you instantly!
            </p>

            <div className="flex items-center gap-5 pt-1 text-[11px] text-slate-500 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#FF6014]" /> Verified Technicians
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarCheck size={14} className="text-[#FF6014]" /> Quick Callback
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6014] to-[#FF7C71] hover:from-[#E0530A] hover:to-[#FF6014] text-white text-xs font-extrabold tracking-wide shadow-lg shadow-[#FF6014]/25 hover:shadow-xl hover:shadow-[#FF6014]/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
          >
            <span>Book Custom Service</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <CustomServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryName={categoryName}
      />
    </>
  );
}
