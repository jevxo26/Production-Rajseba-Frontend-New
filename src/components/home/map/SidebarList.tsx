"use client";

import React, { useRef, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Map as MapIcon,
  List as ListIcon,
  Star,
  CheckCircle2,
  MapPin,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Expert } from "./types";

interface SidebarListProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  activeTab: "map" | "list";
  setActiveTab: (tab: "map" | "list") => void;
  filteredExperts: Expert[];
  selectedExpertId: string;
  setSelectedExpertId: (id: string) => void;
  onOpenFilters: () => void;
}

const CATEGORIES = [
  "All Services",
  "AC Repair",
  "Plumbing",
  "Cleaning",
  "Electrical",
  "Shifting",
  "CCTV",
  "Appliance Repair",
  "Painting",
  "Gardening",
  "Pest Control",
  "Home Salon",
  "Carpentry",
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function SidebarList({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  activeTab,
  setActiveTab,
  filteredExperts,
  selectedExpertId,
  setSelectedExpertId,
  onOpenFilters,
}: SidebarListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  return (
    <div className="w-full h-[45vh] min-h-0 md:w-[380px] md:h-[650px] lg:h-[666px] bg-white border border-slate-200 rounded-3xl flex flex-col shadow-md overflow-hidden">
      {/* Header Filters */}
      <div className="p-4 border-b border-slate-100 space-y-4 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services in Dhaka..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm placeholder-slate-400 text-slate-800 outline-none focus:bg-white focus:border-[#FF5A5F] focus:ring-1 focus:ring-red-200 transition-all"
          />
        </div>

        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        >
          {CATEGORIES.map((cat) => (
            <Button
              variant="ghost"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 h-auto rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
                selectedCategory === cat
                  ? "bg-[#FF5A5F] border-[#FF5A5F] text-white"
                  : "bg-white border-slate-200 text-slate-600 hover:border-[#FF5A5F]"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="bg-slate-100 p-1 rounded-full flex items-center w-40">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("map")}
              className={`flex-1 py-1 h-auto rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                activeTab === "map"
                  ? "bg-[#FF5A5F] text-white shadow-sm"
                  : "text-slate-500"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" /> Map
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("list")}
              className={`flex-1 py-1 h-auto rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                activeTab === "list"
                  ? "bg-[#FF5A5F] text-white shadow-sm"
                  : "text-slate-500"
              }`}
            >
              <ListIcon className="w-3.5 h-3.5" /> List
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={onOpenFilters}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-full"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </Button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-slate-50/50 custom-scrollbar"
      >
        <h3 className="text-sm font-extrabold text-slate-800 px-1 sticky -top-5 bg-white py-2 z-10">
          Nearby Professionals ({filteredExperts.length})
        </h3>

        <AnimatePresence mode="popLayout">
          {filteredExperts.map((expert) => (
            <motion.div
              layout
              key={expert.id}
              variants={itemVariants}
              onClick={() => setSelectedExpertId(expert.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
                selectedExpertId === expert.id
                  ? "border-[#FF5A5F] shadow-[0_8px_30px_rgb(255,90,95,0.06)] ring-1 ring-red-100"
                  : "border-slate-100 hover:border-slate-300 shadow-sm"
              }`}
            >
              <div className="absolute top-4 right-4 bg-amber-50 rounded-full px-2 py-0.5 flex items-center gap-1 text-[11px] font-extrabold text-amber-700">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                {expert.rating}
              </div>

              <div>
                <span className="text-[10px] font-extrabold bg-rose-50 text-[#FF5A5F] px-2.5 py-0.5 rounded-full uppercase">
                  {expert.category}
                </span>
                <h4 className="font-extrabold text-slate-900 text-base mt-2 flex items-center gap-1.5">
                  {expert.name}{" "}
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {expert.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-slate-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  {expert.location} ({expert.distance})
                </div>
                <div className="font-black text-slate-900 text-right">
                  <span className="text-[#FF5A5F] text-sm font-black">
                    ৳{expert.price}+
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredExperts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Info className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">No experts found</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
