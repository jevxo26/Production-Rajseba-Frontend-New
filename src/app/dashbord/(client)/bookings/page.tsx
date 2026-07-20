"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Loader2, Clock, CheckCircle2, Search, Zap, Plus, Briefcase, Filter, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import AccessDenied from "../components/AccessDenied";
import BookingItem from "./components/BookingItem";
import { useClientBookingsState } from "./hooks/useClientBookingsState";

export default function BookingsPage() {
  const { role, filter, setFilter, searchQuery, setSearchQuery, isLoading, myBookings, filteredBookings } = useClientBookingsState();
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

  const totalCount = myBookings.length;
  const activeCount = myBookings.filter((b: any) => ["pending", "assigned", "on_the_way"].includes(b.status)).length;
  const completedCount = myBookings.filter((b: any) => b.status === "completed").length;

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
      {/* ── Ultra Premium Light Glassmorphic Header ── */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-[32px] bg-white/90 backdrop-blur-xl border border-orange-100/90 p-6 md:p-8 shadow-sm group hover:shadow-xl hover:shadow-[#FF6014]/5 transition-all duration-300"
      >
        <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full bg-gradient-to-br from-[#FF6014]/15 to-[#FFB3AD]/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute -left-16 -bottom-16 w-52 h-52 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Title & Info */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50/90 border border-orange-200/60 text-[10px] font-black text-[#FF6014] uppercase tracking-widest shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014] animate-ping inline-block" />
                {lang === "bn" ? "লাইভ অর্ডার ট্র্যাকার" : "Live Order Hub"}
              </span>
              <span className="text-[11px] font-extrabold text-slate-400">
                • {myBookings.length} {lang === "bn" ? "টি বুকিং" : "Total Bookings"}
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-3.5 bg-gradient-to-br from-orange-50 to-[#FFF0EB] border border-orange-200/60 text-[#FF6014] rounded-2xl shadow-2xs shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                  {lang === "bn" ? "আমার বুকিংস ও সার্ভিস ইতিহাস" : "My Bookings & Service Requests"}
                </h1>
                <p className="text-xs md:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">
                  {lang === "bn"
                    ? "আপনার অনুরোধকৃত সব সার্ভিসের রিয়েল-টাইম আপডেট, ভেন্ডর স্ট্যাটাস ও মেসেজিং সেন্টার।"
                    : "Real-time updates, assigned vendor details, and live communication for all service requests."}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Button & Stats Mini Summary */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/dashbord/overview"
              className="bg-gradient-to-r from-[#FF6014] to-[#E0530A] hover:opacity-95 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg shadow-[#FF6014]/20 text-xs transition-all active:scale-[0.985] text-center flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Plus size={16} />
              <span>{lang === "bn" ? "নতুন সার্ভিস বুক করুন" : "Book New Service"}</span>
            </Link>
          </div>
        </div>

        {/* ── Integrated Header Mini Stats Bar ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-7 pt-6 border-t border-orange-100/60">
          <div className="bg-orange-50/60 border border-orange-100/80 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-white text-[#FF6014] rounded-xl shadow-2xs border border-orange-100">
              <Briefcase size={16} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                {lang === "bn" ? "মোট বুকিং" : "Total Requests"}
              </span>
              <span className="text-lg font-black text-slate-900">{totalCount}</span>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-100/80 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-white text-amber-600 rounded-xl shadow-2xs border border-amber-100">
              <Clock size={16} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                {lang === "bn" ? "চলমান বুকিং" : "Active Orders"}
              </span>
              <span className="text-lg font-black text-amber-600">{activeCount}</span>
            </div>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-100/80 p-3.5 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-white text-emerald-600 rounded-xl shadow-2xs border border-emerald-100">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                {lang === "bn" ? "সম্পন্ন সার্ভিস" : "Completed Services"}
              </span>
              <span className="text-lg font-black text-emerald-600">{completedCount}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Search & Status Filter Controls Row ── */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === "bn" ? "সার্ভিসের নাম, ভেন্ডর বা আইডি দিয়ে খুঁজুন..." : "Search by service, provider, or ID..."
            }
            className="w-full pl-11 pr-4 py-3 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FF6014] focus:ring-4 focus:ring-[#FF6014]/5 transition-all shadow-2xs"
          />
        </div>

        {/* Status Filter Tab Bar */}
        <div className="overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="bg-white/90 backdrop-blur-xl border border-orange-100/90 p-1.5 rounded-2xl flex gap-1.5 w-max shadow-2xs">
            {(["All", "Pending", "Assigned", "On The Way", "Completed", "Cancelled"] as const).map((tab) => {
              const isActive = filter === tab;
              return (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all focus:outline-none whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
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
