"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Loader2, Clock, CheckCircle2, AlertCircle, RefreshCw, XCircle, Filter, Zap } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import AccessDenied from "../components/AccessDenied";
import BookingItem from "./components/BookingItem";
import { useClientBookingsState } from "./hooks/useClientBookingsState";

export default function BookingsPage() {
  const { role, filter, setFilter, isLoading, filteredBookings } = useClientBookingsState();
  const lang = useAppSelector((state) => state.lang.value);

  if (role !== "client") {
    return <AccessDenied roleRequired="Customer" />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-[#FF6014]" />
      </div>
    );
  }

  const langFilterName = (f: string) => {
    switch (f) {
      case "All": return lang === "bn" ? "সব" : "All";
      case "Pending": return lang === "bn" ? "পেন্ডিং" : "Pending";
      case "Assigned": return lang === "bn" ? "নিযুক্ত" : "Assigned";
      case "On The Way": return lang === "bn" ? "চলমান" : "On The Way";
      case "Completed": return lang === "bn" ? "সম্পন্ন" : "Completed";
      case "Cancelled": return lang === "bn" ? "বাতিল" : "Cancelled";
      default: return f;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full space-y-7 relative z-10"
    >
      {/* ── Premium Light Glassmorphic Header ── */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-[32px] bg-white/90 backdrop-blur-xl border border-orange-100/90 p-6 md:p-8 shadow-sm group hover:shadow-xl hover:shadow-[#FF6014]/5 transition-all duration-300"
      >
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-[#FF6014]/15 to-[#FFB3AD]/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 border border-orange-200/60 text-[#FF6014] rounded-2xl shadow-2xs">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50/90 border border-orange-200/60 text-[10px] font-black text-[#FF6014] shadow-2xs mb-2">
                <Zap size={11} className="animate-pulse text-[#FF6014]" />
                <span>{lang === "bn" ? "অর্ডার ট্র্যাকিং" : "Order Tracker"}</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
                {lang === "bn" ? "আমার বুকিংস" : "My Bookings"}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1 font-semibold leading-relaxed">
                {lang === "bn"
                  ? "রাজসেবায় আপনার সার্ভিস অনুরোধগুলো পরিচালনা ও ট্র্যাক করুন এবং চ্যাট করুন।"
                  : "Manage, track, and chat about your service requests at Rajseba."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Status Filter Tab Pill Bar ── */}
      <motion.div variants={itemVariants} className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="bg-white/90 backdrop-blur-xl border border-orange-100/90 p-1.5 rounded-full flex gap-1.5 w-max shadow-2xs">
          {(["All", "Pending", "Assigned", "On The Way", "Completed", "Cancelled"] as const).map((tab) => {
            const isActive = filter === tab;
            return (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all focus:outline-none whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF6014] to-[#E0530A] text-white shadow-md shadow-[#FF6014]/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-orange-50/50"
                }`}
              >
                {langFilterName(tab)}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Bookings List ── */}
      <motion.div variants={itemVariants} className="space-y-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking: any) => <BookingItem key={booking.id} booking={booking} />)
        ) : (
          <div className="bg-white/90 backdrop-blur-xl p-12 text-center border border-slate-100 rounded-3xl shadow-sm text-slate-400 font-extrabold text-xs space-y-2">
            <Filter size={24} className="mx-auto text-slate-300" />
            <p>
              {lang === "bn"
                ? `${langFilterName(filter)} বুকিং পাওয়া যায়নি।`
                : `No ${filter.toLowerCase()} bookings found.`}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
