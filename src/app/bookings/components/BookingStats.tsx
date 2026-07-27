"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Clock, Briefcase } from "lucide-react";

interface BookingStatsProps {
  stats: {
    label: string;
    value: string;
    sub: string;
    icon: any;
    stripeColor: string;
    iconContainerColor: string;
    iconColor: string;
    gradient: string;
    borderColor: string;
    shadow: string;
  }[];
}

const staggerContainer: any = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const cardFadeUp: any = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function BookingStats({ stats }: BookingStatsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={idx}
            variants={cardFadeUp}
            whileHover={{ y: -5 }}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} p-5 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 ${stat.borderColor} ${stat.shadow} group`}
          >
            <div className={`absolute top-0 left-0 right-0 h-[3px] ${stat.stripeColor}`} />

            <div className="flex justify-between items-start">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                {stat.label}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${stat.iconContainerColor} ${stat.iconColor} group-hover:scale-110 transition-transform`}>
                <Icon size={14} />
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3 mb-0.5">
              {stat.value}
            </h2>
            <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{stat.sub}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
