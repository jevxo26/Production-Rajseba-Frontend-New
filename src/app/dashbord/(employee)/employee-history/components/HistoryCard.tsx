"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

interface HistoryCardProps {
  booking: any;
}

export default function HistoryCard({ booking }: HistoryCardProps) {
  const lang = useAppSelector((state) => state.lang.value);

  return (
    <div className="bg-white rounded-[28px] border border-emerald-100 p-6 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Background Completed Stamp */}
      <div className="absolute -right-8 -top-8 text-emerald-55/40 pointer-events-none transform -rotate-12">
        <CheckCircle2 size={160} />
      </div>

      {/* Top Row: Service Name, Status */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-500">
            <Briefcase size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              {booking.nestedService?.name || booking.pkg?.name || (lang === "bn" ? "সার্ভিস বুকিং" : "Service Booking")}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                {lang === "bn" ? "সম্পন্ন" : "COMPLETED"}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {lang === "bn" ? `অর্ডার #${booking.id}` : `Order #${booking.id}`}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
            {new Date(booking.updatedAt || booking.createdAt).toLocaleDateString("en-BD")}
          </span>
        </div>
      </div>

      {/* Middle Row: Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-50 relative z-10">
        {/* Column 1: Client */}
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "গ্রাহক" : "Client"}
          </span>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-sm border border-blue-100">
              {booking.user?.name?.[0] || "C"}
            </div>
            <span className="text-xs font-bold text-slate-800">
              {booking.user?.name || (lang === "bn" ? "গ্রাহক" : "Customer")}
            </span>
          </div>
        </div>

        {/* Column 2: Date & Time */}
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "সার্ভিসের তারিখ" : "Service Date"}
          </span>
          <div className="flex items-start gap-2.5">
            <Calendar size={16} className="text-slate-400 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800">
                {booking.date
                  ? new Date(booking.date).toLocaleDateString("en-BD", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "TBD"}
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold">
                {booking.time || (lang === "bn" ? "সময় নির্দিষ্ট নয়" : "Time not specified")}
              </span>
            </div>
          </div>
        </div>

        {/* Column 3: Service Location */}
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2">
            {lang === "bn" ? "সার্ভিসের স্থান" : "Service Location"}
          </span>
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-slate-400 mt-0.5" />
            <span className="text-xs font-bold text-slate-800 leading-relaxed max-w-[200px]">
              {booking.location || (lang === "bn" ? "অবস্থান দেওয়া হয়নি" : "Location not provided")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
