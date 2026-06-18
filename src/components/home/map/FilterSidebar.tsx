"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FilterSidebarProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
  tempPriceRange: { min: number; max: number };
  setTempPriceRange: (range: { min: number; max: number }) => void;
  tempMinRating: number | null;
  setTempMinRating: (val: number | null) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

// Stagger variants for smooth entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function FilterSidebar({
  sortBy,
  setSortBy,
  tempPriceRange,
  setTempPriceRange,
  tempMinRating,
  setTempMinRating,
  onApplyFilters,
  onClearFilters,
}: FilterSidebarProps) {
  const fillRight = ((tempPriceRange.max - 500) / (10000 - 500)) * 100;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hidden lg:block bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6"
    >
      {/* SORT BY Selector */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Sort By
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:bg-white focus:border-[#FF5A5F] focus:ring-1 focus:ring-red-100 transition-all cursor-pointer appearance-none"
          >
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronRight className="w-4 h-4 rotate-90" />
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="border-t border-slate-100 pt-5 flex items-center justify-between"
      >
        <h4 className="text-sm font-extrabold text-slate-900">Filters</h4>
        <Button
          variant="link"
          onClick={onClearFilters}
          className="text-xs font-bold text-[#FF5A5F] hover:underline cursor-pointer bg-transparent border-none outline-none p-0 h-auto"
        >
          Clear All
        </Button>
      </motion.div>

      {/* Price range selector */}
      <motion.div variants={itemVariants} className="space-y-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Price Range
        </label>
        <div className="h-1.5 bg-slate-100 rounded-full relative">
          <motion.div
            className="absolute h-full bg-[#FF5A5F] rounded-full"
            initial={{ width: 0 }}
            animate={{ left: "0%", right: `${100 - fillRight}%` }}
          />
          <div className="absolute left-0 w-4 h-4 bg-white border-2 border-[#FF5A5F] rounded-full top-1/2 -translate-y-1/2 shadow-sm" />
          <motion.div
            className="absolute w-4 h-4 bg-white border-2 border-[#FF5A5F] rounded-full top-1/2 -translate-y-1/2 shadow-sm"
            animate={{ left: `${fillRight}%` }}
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* Inputs */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block">
              MIN
            </span>
            <input
              type="number"
              value={tempPriceRange.min}
              onChange={(e) =>
                setTempPriceRange({
                  ...tempPriceRange,
                  min: parseInt(e.target.value) || 0,
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block">
              MAX
            </span>
            <input
              type="number"
              value={tempPriceRange.max}
              onChange={(e) =>
                setTempPriceRange({
                  ...tempPriceRange,
                  max: Math.min(10000, parseInt(e.target.value) || 0),
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
            />
          </div>
        </div>
      </motion.div>

      {/* Rating chips */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Minimum Rating
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[3.0, 4.0, 4.5].map((val) => (
            <motion.div
              key={val}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                onClick={() => setTempMinRating(val)}
                className={`w-full py-2 rounded-xl text-xs font-bold border ${tempMinRating === val ? "bg-rose-50 border-[#FF5A5F] text-[#FF5A5F]" : ""}`}
              >
                {val}★+
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          onClick={onApplyFilters}
          className="w-full bg-[#FF5A5F] hover:bg-[#FF4449] text-white font-bold py-3 h-auto rounded-xl shadow-sm transition-all"
        >
          Apply Filters
        </Button>
      </motion.div>
    </motion.div>
  );
}
