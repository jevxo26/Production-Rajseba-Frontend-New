"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, MessageCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { STATUS_TEXT } from "../hooks/useClientBookingsState";

interface BookingItemProps {
  booking: any;
}

export default function BookingItem({ booking }: BookingItemProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-[28px] border border-slate-100 p-6 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-shadow">
      {/* Top Row: Service Name, Status, Price */}
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
                {STATUS_TEXT[booking.status] || booking.status}
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
        {/* Column 1: Assigned Personnel */}
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2">
            Assigned To
          </span>
          <div className="flex flex-col gap-2">
            {booking.vendor && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFF0EB] flex items-center justify-center text-[#E0530A] font-bold text-xs border border-[#FF6014]/30">
                  {booking.vendor?.name?.[0] || "V"}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    {booking.vendor?.name || "Assigned Vendor"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">Service Provider</span>
                </div>
              </div>
            )}

            {booking.employees &&
              booking.employees.length > 0 &&
              booking.employees.map((emp: any) => (
                <div key={emp.id} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                    {emp.name?.[0] || "E"}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{emp.name}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Technician</span>
                  </div>
                </div>
              ))}

            {!booking.vendor && (!booking.employees || booking.employees.length === 0) && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-200">
                  ?
                </div>
                <span className="text-xs font-bold text-slate-400">Not assigned yet</span>
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Date & Time */}
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-2">Date</span>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 flex-wrap">
          {booking.vendor && (
            <button
              onClick={() =>
                router.push(
                  `/dashbord/live-chat?receiverId=${booking.vendor.id}&receiverName=${encodeURIComponent(
                    booking.vendor.name
                  )}`
                )
              }
              className="flex items-center gap-1.5 text-[#FF6014] bg-[#FFF8F4] hover:bg-[#FFF0EB] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors focus:outline-none"
            >
              <MessageCircle size={14} />
              <span>Chat Vendor</span>
            </button>
          )}
          {booking.employees?.map((emp: any) => (
            <button
              key={emp.id}
              onClick={() =>
                router.push(
                  `/dashbord/live-chat?receiverId=${emp.id}&receiverName=${encodeURIComponent(emp.name)}`
                )
              }
              className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors focus:outline-none"
            >
              <MessageCircle size={14} />
              <span>Chat {emp.name?.split(" ")[0]}</span>
            </button>
          ))}
          {!booking.vendor && (!booking.employees || booking.employees.length === 0) && (
            <span className="text-xs text-slate-400 font-bold flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" /> Waiting for provider
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => router.push(`/dashbord/bookings/${booking.id}`)}
            className="flex-1 sm:flex-none bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2.5 px-4 sm:px-6 rounded-2xl transition-colors active:scale-[0.98]"
          >
            View Details
          </button>
          <Link
            href={`/dashbord/bookings/track/${booking.id}`}
            className="flex-1 sm:flex-none bg-[#FF6014] hover:bg-[#E0530A] text-white text-xs font-bold py-2.5 px-4 sm:px-6 rounded-2xl transition-all shadow-sm shadow-[#FF6014]/10 active:scale-[0.98] inline-block text-center"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
