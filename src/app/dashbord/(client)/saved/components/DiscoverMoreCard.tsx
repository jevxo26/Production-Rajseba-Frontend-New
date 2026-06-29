"use client";

import React from "react";
import Link from "next/link";
import { Plus, ChevronRight } from "lucide-react";

export default function DiscoverMoreCard() {
  return (
    <Link
      href="/services"
      className="bg-white/80 backdrop-blur-md rounded-3xl border border-dashed border-slate-200 p-6 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-md transition-all group"
    >
      <div className="my-auto space-y-4">
        <div className="w-12 h-12 bg-[#FFF8F4] rounded-full flex items-center justify-center text-[#FF6014] mx-auto border border-[#FFF0EB] group-hover:scale-110 transition-transform">
          <Plus size={20} />
        </div>
        <div className="space-y-1.5">
          <h3 className="font-extrabold text-slate-800 text-sm">Discover More</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold max-w-[200px] mx-auto">
            Want to explore more options? Check out our trending services this month.
          </p>
        </div>
      </div>
      <div className="mt-6 w-full bg-white group-hover:bg-slate-50 border border-slate-100 text-[#FF6014] text-xs font-bold py-2.5 rounded-2xl transition-colors text-center flex items-center justify-center gap-1">
        Find More Services <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}
