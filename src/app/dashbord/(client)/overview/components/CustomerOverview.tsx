"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Plus,
  Share2,
  ChevronRight,
  Calendar,
  MessageCircle,
  SlidersHorizontal,
  Download,
  Loader2,
  CheckCircle2,
  Clock,
  Zap,
  Activity,
  ArrowUpRight,
  Wrench,
  Home,
  Droplets,
  Tv,
  User,
  ShieldCheck,
  Tag,
  Star
} from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { CustomTable } from "@/components/ui/table";
import { useGetAllBookingsQuery } from "@/redux/features/admin/booking";

export default function CustomerOverview() {
  const authUser = useAppSelector((state) => state.auth.user);
  const lang = useAppSelector((state) => state.lang.value);
  const { data: bookingsRes, isLoading: loadingBookings } = useGetAllBookingsQuery();

  const allBookings = bookingsRes?.data || [];
  const userId = authUser?.id || authUser?._id;
  const myBookings = allBookings.filter((b: any) => b.user?.id === userId || b.user?.id === Number(userId));
  const activeBookings = myBookings.filter((b: any) => ["assigned", "on_the_way", "pending"].includes(b.status));
  const completedBookings = myBookings.filter((b: any) => b.status === "completed");

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return lang === "bn" ? "পেন্ডিং" : "Pending";
      case "assigned":
        return lang === "bn" ? "নিযুক্ত" : "Assigned";
      case "on_the_way":
        return lang === "bn" ? "চলমান" : "On The Way";
      case "completed":
        return lang === "bn" ? "সম্পন্ন" : "Completed";
      case "cancelled":
        return lang === "bn" ? "বাতিল" : "Cancelled";
      default:
        return status;
    }
  };

  const quickServices = [
    { name: lang === "bn" ? "এসি সার্ভিসিং" : "AC Servicing", icon: Wrench, color: "text-[#FF6014] bg-orange-50 border-orange-100", href: "/services" },
    { name: lang === "bn" ? "বাসা ক্লিনিং" : "Home Cleaning", icon: Home, color: "text-teal-600 bg-teal-50 border-teal-100", href: "/services" },
    { name: lang === "bn" ? "প্লাম্বিং সেবা" : "Plumbing & Gas", icon: Droplets, color: "text-indigo-600 bg-indigo-50 border-indigo-100", href: "/services" },
    { name: lang === "bn" ? "অ্যাপ্লায়েন্স রিপেয়ার" : "Appliance Repair", icon: Tv, color: "text-amber-600 bg-amber-50 border-amber-100", href: "/services" },
  ];

  const customerColumns = [
    {
      key: "id",
      header: lang === "bn" ? "বুকিং আইডি" : "Booking ID",
      render: (b: any) => <span className="font-extrabold text-[#FF6014]">#{b.id}</span>,
    },
    {
      key: "service",
      header: lang === "bn" ? "সার্ভিস" : "Service",
      render: (b: any) => (
        <span className="font-bold text-slate-800 flex items-center gap-1.5">
          <Wrench size={13} className="text-[#FF6014]" />
          {b.nestedService?.name || b.pkg?.name || (lang === "bn" ? "সার্ভিস" : "Service")}
        </span>
      ),
    },
    {
      key: "vendor",
      header: lang === "bn" ? "অভিজ্ঞ সেবাদাতা" : "Expert Provider",
      render: (b: any) => (
        <span className="font-semibold text-slate-700 flex items-center gap-1">
          <User size={12} className="text-slate-400" />
          {b.vendor?.name || "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: lang === "bn" ? "অবস্থা" : "Status",
      render: (b: any) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
            b.status === "completed"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              : b.status === "on_the_way"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
              : "bg-amber-50 text-amber-700 border border-amber-200/60"
          }`}
        >
          <CheckCircle2 size={11} />
          {getStatusText(b.status)}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: lang === "bn" ? "তারিখ" : "Date",
      render: (b: any) => (
        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
          <Calendar size={12} className="text-slate-400" />
          {new Date(b.createdAt).toLocaleDateString("en-BD")}
        </span>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07 }
    }
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
      {/* ── Premium Light Glassmorphism Banner ── */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-[32px] bg-white/90 backdrop-blur-xl border border-orange-100/90 p-6 md:p-8 shadow-sm group hover:shadow-xl hover:shadow-[#FF6014]/5 transition-all duration-300"
      >
        {/* Decorative Subtle Orange Glows */}
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-[#FF6014]/15 to-[#FFB3AD]/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-orange-100/50 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left side: User Profile Greeting */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50/90 border border-orange-200/60 text-[11px] font-black text-[#FF6014] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6014] animate-pulse" />
              <span>{lang === "bn" ? "গ্রাহক ড্যাশবোর্ড" : "Client Dashboard"}</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                {lang === "bn" ? `হ্যালো, ${authUser?.name || "গ্রাহক"}` : `Hello, ${authUser?.name || "Client"}`} 👋
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1 font-semibold flex items-center gap-1.5">
                <Activity size={14} className="text-[#FF6014]" />
                {lang === "bn"
                  ? "রাজসেবার সাথে আপনার ঘর সাজানোর আজ এক চমৎকার দিন।"
                  : "It's a great day to refresh your home with Rajseba."}
              </p>
            </div>
          </div>

          {/* Right side: Modern Light Glass Counters */}
          <div className="flex items-center gap-3 sm:gap-4 self-stretch md:self-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-1 md:flex-none bg-white/90 backdrop-blur-md border border-orange-100/80 rounded-2xl p-3.5 md:p-4 min-w-[115px] text-center shadow-2xs hover:border-[#FF6014]/30 hover:shadow-md transition-all cursor-pointer"
            >
              {loadingBookings ? (
                <Loader2 size={18} className="animate-spin text-[#FF6014] mx-auto" />
              ) : (
                <span className="text-2xl md:text-3xl font-black text-[#FF6014] block leading-tight">
                  {activeBookings.length.toString().padStart(2, "0")}
                </span>
              )}
              <span className="text-[9px] font-extrabold text-slate-400 tracking-wider uppercase mt-1 flex items-center justify-center gap-1">
                <Clock size={10} className="text-[#FF6014]" />
                {lang === "bn" ? "সক্রিয় বুকিং" : "Active Bookings"}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-1 md:flex-none bg-white/90 backdrop-blur-md border border-emerald-100/80 rounded-2xl p-3.5 md:p-4 min-w-[115px] text-center shadow-2xs hover:border-emerald-300/40 hover:shadow-md transition-all cursor-pointer"
            >
              {loadingBookings ? (
                <Loader2 size={18} className="animate-spin text-emerald-500 mx-auto" />
              ) : (
                <span className="text-2xl md:text-3xl font-black text-emerald-600 block leading-tight">
                  {completedBookings.length.toString().padStart(2, "0")}
                </span>
              )}
              <span className="text-[9px] font-extrabold text-slate-400 tracking-wider uppercase mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 size={10} className="text-emerald-500" />
                {lang === "bn" ? "সম্পন্ন" : "Completed"}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Quick Service Categories Shortcut Bar ── */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Zap size={13} className="text-[#FF6014]" />
            {lang === "bn" ? "জনপ্রিয় সার্ভিস শর্টকাট" : "Popular Service Shortcuts"}
          </h3>
          <Link href="/services" className="text-xs font-extrabold text-[#FF6014] hover:underline flex items-center gap-1">
            {lang === "bn" ? "সব দেখুন" : "Explore All"} <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {quickServices.map((qs, i) => {
            const Icon = qs.icon;
            return (
              <motion.div key={i} whileHover={{ y: -3, scale: 1.02 }}>
                <Link
                  href={qs.href}
                  className="bg-white p-3.5 rounded-2xl border border-slate-100 hover:border-[#FF6014]/20 hover:shadow-lg hover:shadow-[#FF6014]/5 transition-all duration-300 flex items-center gap-3 group/qs cursor-pointer"
                >
                  <div className={`p-2.5 rounded-xl border ${qs.color} shrink-0 group-hover/qs:scale-110 transition-transform`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-slate-800 group-hover/qs:text-[#FF6014] transition-colors truncate">
                      {qs.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5 mt-0.5">
                      <Tag size={9} className="text-[#FF6014]" />
                      {lang === "bn" ? "বুক করুন" : "Book Now"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Action Banners Row ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div whileHover={{ scale: 1.015, y: -2 }}>
          <Link
            href="/services"
            className="relative overflow-hidden bg-gradient-to-r from-[#FF6014] to-[#E0530A] text-white p-6 rounded-[28px] shadow-lg shadow-[#FF6014]/20 flex items-center justify-between group transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl border border-white/20 backdrop-blur-md">
                <Plus size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight flex items-center gap-1.5">
                  {lang === "bn" ? "নতুন সার্ভিস বুক করুন" : "Book a New Service"}{" "}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-orange-100 mt-0.5 font-semibold">
                  {lang === "bn" ? "আজই অভিজ্ঞ পেশাদার দ্বারা সেবা নিন" : "Get professional help today in minutes"}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.015, y: -2 }} className="bg-white/90 backdrop-blur-xl p-6 rounded-[28px] border border-slate-100/90 shadow-sm flex items-center justify-between hover:shadow-lg hover:shadow-[#FF6014]/5 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FFF8F4] rounded-2xl text-[#FF6014] border border-orange-100 shadow-2xs">
              <Share2 size={22} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
                {lang === "bn" ? "বন্ধুকে রেফার করুন" : "Refer a Friend"}
                <Star size={14} className="text-amber-400 fill-amber-400" />
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-semibold">
                {lang === "bn" ? "শেয়ার করে বোনাস ক্রেডিট জিতুন" : "Earn bonus credits for sharing Rajseba"}
              </p>
            </div>
          </div>
          <button className="p-2.5 bg-[#FF6014] text-white rounded-full hover:bg-[#E0530A] transition-colors shadow-sm focus:outline-none cursor-pointer">
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </motion.div>

      {/* ── Active Bookings Section ── */}
      {activeBookings.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Clock size={18} className="text-[#FF6014]" />
              {lang === "bn" ? "সক্রিয় বুকিংস" : "Active Bookings"}
            </h2>
            <Link href="/dashbord/bookings" className="text-xs font-bold text-[#FF6014] hover:underline flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-xl border border-orange-100">
              {lang === "bn" ? "সব দেখুন" : "View All"} <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {activeBookings.slice(0, 2).map((booking: any) => (
              <motion.div
                key={booking.id}
                whileHover={{ y: -2 }}
                className="bg-white/90 backdrop-blur-xl p-6 rounded-[28px] border border-slate-100/90 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-lg hover:border-orange-200/60 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-[#FF6014] text-base flex items-center gap-1.5">
                      <Wrench size={16} />
                      {booking.nestedService?.name || booking.pkg?.name || (lang === "bn" ? "সার্ভিস বুকিং" : "Service Booking")}
                    </h3>
                    <span className="text-[10px] font-extrabold text-slate-400 block mt-0.5">Booking ID: #{booking.id}</span>
                  </div>
                  <span
                    className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                      booking.status === "on_the_way" ? "text-[#E0530A] bg-[#FFF8F4] border border-orange-200/60" : "text-amber-700 bg-amber-50 border border-amber-200/60"
                    }`}
                  >
                    <CheckCircle2 size={10} />
                    {getStatusText(booking.status)}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFF0EB] flex items-center justify-center text-[#E0530A] font-black text-sm shadow-2xs border border-orange-100">
                      {booking.vendor?.name?.[0] || "V"}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800">
                        {booking.vendor?.name || (lang === "bn" ? "নিযুক্ত ভেন্ডর" : "Assigned Vendor")}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <ShieldCheck size={11} className="text-emerald-500" />
                        {lang === "bn" ? "যাচাইকৃত স্পেশালিস্ট" : "Verified Specialist"}
                      </p>
                    </div>
                  </div>
                  <button className="p-2.5 bg-white text-[#FF6014] rounded-xl hover:bg-[#FFF8F4] border border-slate-100 shadow-2xs transition-colors cursor-pointer">
                    <MessageCircle size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                  <Calendar size={13} className="text-[#FF6014]" />
                  <span>{booking.date ? new Date(booking.date).toLocaleDateString("en-BD") : (lang === "bn" ? "তারিখ নির্ধারিত হবে" : "Date TBD")}</span>
                  <span className="mx-1">•</span>
                  <span className="truncate max-w-[160px]">{booking.location || (lang === "bn" ? "অবস্থান নির্ধারণ করা হয়নি" : "Location not set")}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Service History ── */}
      {myBookings.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar size={18} className="text-[#FF6014]" />
              {lang === "bn" ? "বুকিংয়ের ইতিহাস" : "Booking History"}
            </h2>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl border border-slate-100 shadow-2xs transition-colors cursor-pointer">
                <SlidersHorizontal size={14} />
              </button>
              <button className="p-2 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl border border-slate-100 shadow-2xs transition-colors cursor-pointer">
                <Download size={14} />
              </button>
            </div>
          </div>

          <CustomTable
            columns={customerColumns}
            data={myBookings}
            searchKey="id"
            searchPlaceholder={lang === "bn" ? "বুকিং খুঁজুন..." : "Search bookings..."}
            pageSize={5}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
