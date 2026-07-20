"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Loader2, BookOpen, Search, Sparkles, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import AccessDenied from "../components/AccessDenied";
import SavedServiceCard from "./components/SavedServiceCard";
import DiscoverMoreCard from "./components/DiscoverMoreCard";
import { useSavedServicesState } from "./hooks/useSavedServicesState";

export default function SavedServicesPage() {
  const { role, savedServices, filteredSavedServices, searchQuery, setSearchQuery, isLoading, handleUnsave } = useSavedServicesState();
  const lang = useAppSelector((state) => state.lang.value);

  if (role !== "client") {
    return <AccessDenied roleRequired="Customer" />;
  }

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
      {/* ── Ultra Premium Light Glassmorphic Hero Banner ── */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-[32px] bg-white/90 backdrop-blur-xl border border-orange-100/90 p-6 md:p-8 shadow-sm group hover:shadow-xl hover:shadow-[#FF6014]/5 transition-all duration-300"
      >
        <div className="absolute -right-16 -top-16 w-60 h-60 rounded-full bg-gradient-to-br from-[#FF6014]/15 to-[#FFB3AD]/10 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute -left-16 -bottom-16 w-52 h-52 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-gradient-to-br from-orange-50 to-[#FFF0EB] border border-orange-200/60 text-[#FF6014] rounded-2xl shadow-2xs shrink-0">
              <Heart className="w-6 h-6 fill-[#FF6014]/20 text-[#FF6014]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50/90 border border-orange-200/60 text-[10px] font-black text-[#FF6014] uppercase tracking-widest shadow-2xs mb-2">
                <Sparkles size={11} className="animate-pulse text-[#FF6014]" />
                <span>{lang === "bn" ? "উইশলিস্ট হাব" : "Wishlist Hub"}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">
                {lang === "bn" ? "সংরক্ষিত সার্ভিসসমূহ" : "Saved Services"}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1 font-semibold leading-relaxed">
                {isLoading ? (
                  lang === "bn" ? "সংরক্ষিত সার্ভিসসমূহ লোড হচ্ছে..." : "Loading saved services..."
                ) : lang === "bn" ? (
                  `${savedServices.length}টি পছন্দের সার্ভিস আপনার উইশলিস্টে সংরক্ষিত আছে।`
                ) : (
                  `${savedServices.length} service${savedServices.length !== 1 ? "s" : ""} saved to your personal wishlist.`
                )}
              </p>
            </div>
          </div>

          <Link
            href="/services"
            className="bg-gradient-to-r from-[#FF6014] to-[#E0530A] hover:opacity-95 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg shadow-[#FF6014]/20 text-xs transition-all active:scale-[0.985] text-center flex items-center justify-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto"
          >
            <BookOpen size={15} />
            <span>{lang === "bn" ? "সার্ভিসসমূহ ব্রাউজ করুন" : "Explore Services"}</span>
          </Link>
        </div>
      </motion.div>

      {/* ── Search Bar Filter Controls Row ── */}
      {savedServices.length > 0 && (
        <motion.div variants={itemVariants} className="flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "bn" ? "পছন্দের সার্ভিস অথবা ক্যাটাগরি দিয়ে খুঁজুন..." : "Filter saved items by service name..."
              }
              className="w-full pl-11 pr-4 py-3 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#FF6014] focus:ring-4 focus:ring-[#FF6014]/5 transition-all shadow-2xs"
            />
          </div>
        </motion.div>
      )}

      {/* ── Services Grid ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-16 bg-white/50 rounded-3xl">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF6014]" />
          </div>
        ) : filteredSavedServices.length === 0 ? (
          <div className="col-span-full bg-white/90 backdrop-blur-xl p-12 rounded-[32px] border border-dashed border-slate-200 text-center shadow-sm space-y-3">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-[#FF6014] mx-auto border border-orange-100 shadow-2xs">
              <Heart size={28} className="fill-[#FF6014]/20 text-[#FF6014]" />
            </div>
            <h3 className="text-base font-black text-slate-800">
              {savedServices.length === 0
                ? (lang === "bn" ? "এখনো কোনো সার্ভিস সংরক্ষিত নেই" : "No saved services yet")
                : (lang === "bn" ? "কোনো সার্ভিস পাওয়া যায়নি" : "No matching services found")}
            </h3>
            <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
              {savedServices.length === 0
                ? (lang === "bn"
                    ? "যেকোনো সার্ভিস কার্ডে ♥ হার্ট আইকনে চাপ দিয়ে সেটি এখানে সংরিক্ষিত তালিকায় যোগ করুন।"
                    : "Tap the ♥ heart icon on any service card across the platform to add it to your wishlist.")
                : (lang === "bn"
                    ? "অন্য কি-ওয়ার্ড দিয়ে খুঁজে দেখুন অথবা সার্চ ফিল্টার রিমুভ করুন।"
                    : "Try searching with a different keyword or clear the search query.")}
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-[#FF6014] hover:bg-[#E0530A] text-white text-xs font-extrabold px-6 py-3 rounded-2xl transition-all shadow-md shadow-[#FF6014]/20"
              >
                <BookOpen size={15} />
                {lang === "bn" ? "সার্ভিসসমূহ ব্রাউজ করুন" : "Browse All Services"}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {filteredSavedServices.map((service: any) => (
              <SavedServiceCard key={service.id} service={service} handleUnsave={handleUnsave} />
            ))}
            <DiscoverMoreCard />
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
