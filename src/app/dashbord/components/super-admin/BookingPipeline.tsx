"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, UserCheck, Activity } from "lucide-react";

interface BookingPipelineProps {
  bookings: {
    completed: number;
    pending: number;
    todayAssigned: number;
  };
}

export default function BookingPipeline({ bookings }: BookingPipelineProps) {
  const totalPipeline = bookings.completed + bookings.pending + bookings.todayAssigned;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-3xl border border-slate-100 hover:border-[#FF6014]/20 hover:shadow-xl hover:shadow-[#FF6014]/5 transition-all duration-300 p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Activity size={18} className="text-emerald-600" />
              Booking Pipeline
            </h3>
            <p className="text-xs text-slate-400 font-medium">Status overview of booking records</p>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-xs">
            <CheckCircle2 size={20} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            className="text-center p-4 bg-slate-50/70 hover:bg-emerald-50/40 hover:border-emerald-500/20 rounded-2xl border border-slate-100 transition-all duration-200 group/item cursor-pointer"
          >
            <p className="text-2xl md:text-3xl font-black text-emerald-600 tracking-tight group-hover/item:scale-105 transition-transform">
              {bookings.completed}
            </p>
            <p className="text-[10px] font-extrabold text-slate-400 mt-1.5 uppercase tracking-wider flex items-center justify-center gap-1">
              <CheckCircle2 size={10} className="text-emerald-500" />
              Completed
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            className="text-center p-4 bg-slate-50/70 hover:bg-amber-50/40 hover:border-amber-500/20 rounded-2xl border border-slate-100 transition-all duration-200 group/item cursor-pointer"
          >
            <p className="text-2xl md:text-3xl font-black text-amber-500 tracking-tight group-hover/item:scale-105 transition-transform">
              {bookings.pending}
            </p>
            <p className="text-[10px] font-extrabold text-slate-400 mt-1.5 uppercase tracking-wider flex items-center justify-center gap-1">
              <Clock size={10} className="text-amber-500" />
              Pending
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            className="text-center p-4 bg-slate-50/70 hover:bg-indigo-50/40 hover:border-indigo-500/20 rounded-2xl border border-slate-100 transition-all duration-200 group/item cursor-pointer"
          >
            <p className="text-2xl md:text-3xl font-black text-indigo-500 tracking-tight group-hover/item:scale-105 transition-transform">
              {bookings.todayAssigned}
            </p>
            <p className="text-[10px] font-extrabold text-slate-400 mt-1.5 uppercase tracking-wider flex items-center justify-center gap-1">
              <UserCheck size={10} className="text-indigo-500" />
              Assigned
            </p>
          </motion.div>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center px-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
          <Activity size={14} className="text-slate-400" />
          Active Pipeline Total
        </span>
        <span className="text-lg font-black text-slate-800">{totalPipeline}</span>
      </div>
    </motion.div>
  );
}
