"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import Link from "next/link";

interface TaskCardProps {
  booking: any;
  isUpdating: boolean;
  handleMarkComplete: (bookingId: number) => void;
}

export default function TaskCard({ booking, isUpdating, handleMarkComplete }: TaskCardProps) {
  return (
    <div className="bg-white rounded-[28px] border border-slate-100 p-6 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow">
      {/* Top Row: Service Name, Status */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FFF8F4] border border-[#FFF0EB] rounded-2xl flex items-center justify-center text-[#FF6014]">
            <Briefcase size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">
              {booking.nestedService?.name || booking.pkg?.name || "Service Booking"}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8F4] text-[#E0530A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0530A] animate-pulse" />
                {booking.status.toUpperCase()}
              </span>
              <span className="text-[10px] font-bold text-slate-400">Order #{booking.id}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
            {new Date(booking.createdAt).toLocaleDateString("en-BD")}
          </span>
        </div>
      </div>

      {/* Middle Row: Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-50">
        {/* Column 1: Client */}
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2">Client</span>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-sm border border-blue-100">
              {booking.user?.name?.[0] || "C"}
            </div>
            <span className="text-xs font-bold text-slate-800">{booking.user?.name || "Customer"}</span>
          </div>
        </div>

        {/* Column 2: Date & Time */}
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2">
            Date & Time
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
              <span className="text-[10px] text-slate-400 font-semibold">{booking.time || "Time not specified"}</span>
            </div>
          </div>
        </div>

        {/* Column 3: Service Location */}
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2">
            Service Location
          </span>
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-slate-400 mt-0.5" />
            <span className="text-xs font-bold text-slate-800 leading-relaxed max-w-[200px]">
              {booking.location || "Location not provided"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center">
          {booking.vendor && (
            <Link
              href={`/dashbord/live-chat?userId=${booking.vendor.id}&userName=${encodeURIComponent(
                booking.vendor.name || "Vendor"
              )}`}
              className="text-xs font-bold text-slate-500 hover:text-[#FF6014] transition-colors flex items-center gap-1.5"
            >
              <MessageSquare size={14} />
              Chat with Vendor
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleMarkComplete(booking.id)}
            disabled={isUpdating}
            className="bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold py-2.5 px-6 rounded-2xl transition-all shadow-sm shadow-emerald-500/20 active:scale-[0.98] inline-flex items-center justify-center gap-2"
          >
            {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
}
