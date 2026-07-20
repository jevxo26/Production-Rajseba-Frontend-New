"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Briefcase, Zap, DollarSign, Clock, Loader2, CheckCircle2, Calendar, User, Layers, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { CustomTable } from "@/components/ui/table";
import { useGetAllBookingsQuery } from "@/redux/features/admin/booking";

export default function AgentOverview() {
  const authUser = useAppSelector((state) => state.auth.user);
  const lang = useAppSelector((state) => state.lang.value);
  const { data: bookingsRes, isLoading } = useGetAllBookingsQuery();
  const allBookings = (bookingsRes?.data || []) as any[];

  const totalOrders = allBookings.length;
  const todayOrders = allBookings.filter((b: any) => {
    const created = new Date(b.createdAt);
    const today = new Date();
    return created.toDateString() === today.toDateString();
  }).length;

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

  const stats = [
    {
      label: lang === "bn" ? "মোট বুকিং" : "Total Bookings",
      value: isLoading ? "—" : `${totalOrders}`,
      desc: lang === "bn" ? "সর্বকালের বুকিং" : "All time bookings",
      icon: Briefcase,
      color: "text-[#FF6014] bg-orange-50 border-orange-100",
    },
    {
      label: lang === "bn" ? "আজকের বুকিং" : "Today's Bookings",
      value: isLoading ? "—" : `${todayOrders}`,
      desc: lang === "bn" ? "আজ অর্ডার করা হয়েছে" : "Placed today",
      icon: Zap,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      label: lang === "bn" ? "সম্পন্ন" : "Completed",
      value: isLoading ? "—" : `${allBookings.filter((b: any) => b.status === "completed").length}`,
      desc: lang === "bn" ? "মোট সম্পন্ন অর্ডার" : "Total completed orders",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: lang === "bn" ? "পেন্ডিং" : "Pending",
      value: isLoading ? "—" : `${allBookings.filter((b: any) => b.status === "pending").length}`,
      desc: lang === "bn" ? "নিযুক্তির অপেক্ষায়" : "Awaiting assignment",
      icon: Clock,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
  ];

  const columns = [
    {
      key: "id",
      header: lang === "bn" ? "বুকিং আইডি" : "Booking ID",
      render: (o: any) => <span className="font-extrabold text-[#FF6014]">#{o.id}</span>,
    },
    {
      key: "user",
      header: lang === "bn" ? "গ্রাহকের নাম" : "Client Name",
      render: (o: any) => (
        <span className="font-bold text-slate-800 flex items-center gap-1.5">
          <User size={12} className="text-[#FF6014]" />
          {o.user?.name || "—"}
        </span>
      ),
    },
    {
      key: "nestedService",
      header: lang === "bn" ? "বুক করা সার্ভিস" : "Service Booked",
      render: (o: any) => (
        <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
          <Layers size={11} className="text-slate-400" />
          {o.nestedService?.name || o.pkg?.name || "—"}
        </span>
      ),
    },
    {
      key: "vendor",
      header: lang === "bn" ? "ভেন্ডর" : "Vendor",
      render: (o: any) => (
        <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
          <Briefcase size={11} className="text-slate-400" />
          {o.vendor?.name || "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: lang === "bn" ? "অবস্থা" : "Status",
      render: (o: any) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
            o.status === "completed"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              : "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
          }`}
        >
          <CheckCircle2 size={10} />
          {getStatusText(o.status)}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: lang === "bn" ? "তারিখ" : "Date",
      render: (o: any) => (
        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
          <Calendar size={11} className="text-slate-400" />
          {new Date(o.createdAt).toLocaleDateString("en-BD")}
        </span>
      ),
    },
  ];

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
      className="space-y-7"
    >
      {/* ── Premium Light Glassmorphic Header ── */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden bg-white/90 backdrop-blur-xl rounded-[28px] border border-orange-100/90 shadow-sm p-6 md:p-7 group hover:shadow-xl hover:shadow-[#FF6014]/5 transition-all duration-300"
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-[#FF6014]/15 to-[#FFB3AD]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-amber-100/40 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-orange-50 border border-orange-200/60 text-[#FF6014] rounded-2xl shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200/60 text-[#FF6014] text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014] animate-ping inline-block" />
                Agent Panel
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {lang === "bn" ? "এজент ওভারভিউ" : "Agent Overview"}
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-semibold">
                {lang === "bn"
                  ? `হ্যালো, ${authUser?.name || "এজент"}! বুকিং পরিচালনা ও কার্যক্রম ট্র্যাক করুন।`
                  : `Hello, ${authUser?.name || "Agent"}! Manage bookings and track activity.`}
              </p>
            </div>
          </div>
          <Link
            href="/dashbord/quick-booking"
            className="bg-gradient-to-r from-[#FF6014] to-[#E0530A] hover:opacity-95 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg shadow-[#FF6014]/20 text-xs transition-all active:scale-[0.985] text-center flex items-center justify-center gap-1.5 shrink-0"
          >
            <Zap size={15} />
            <span>{lang === "bn" ? "নতুন লিড বুক করুন" : "Book a New Lead"}</span>
          </Link>
        </div>
      </motion.div>

      {/* ── Stats Cards Grid ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ y: -3, scale: 1.015 }}
              className="bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-100/90 shadow-sm flex items-start gap-4 hover:shadow-xl hover:shadow-[#FF6014]/5 hover:border-[#FF6014]/20 transition-all duration-300 cursor-pointer"
            >
              <div className={`p-3 rounded-xl border ${stat.color} shrink-0`}>
                <Icon size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">{stat.label}</p>
                <h4 className="text-2xl font-black text-slate-900 mt-1 leading-tight tracking-tight">{stat.value}</h4>
                <span className="text-[10px] text-slate-400 mt-1 block font-bold">{stat.desc}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Recent Bookings Table ── */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-center bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-slate-100/90 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Briefcase size={18} className="text-[#FF6014]" />
            {lang === "bn" ? "সাম্প্রতিক লিড অর্ডার" : "Recent Lead Orders"}
          </h3>
          <Link href="/dashbord/orders" className="text-xs font-extrabold text-[#FF6014] hover:underline flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-100">
            {lang === "bn" ? "সব দেখুন" : "View All"} <ArrowUpRight size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-32 bg-white/50 rounded-2xl">
            <Loader2 size={32} className="animate-spin text-[#FF6014]" />
          </div>
        ) : (
          <CustomTable
            columns={columns}
            data={allBookings}
            searchKey="id"
            searchPlaceholder={lang === "bn" ? "বুকিং খুঁজুন..." : "Search bookings..."}
            pageSize={5}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
