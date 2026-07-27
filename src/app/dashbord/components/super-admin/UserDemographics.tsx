"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, User, Briefcase, Zap, ShieldCheck } from "lucide-react";

interface UserDemographicsProps {
  users: {
    totalClients: number;
    totalVendors: number;
    totalAgents: number;
  };
}

export default function UserDemographics({ users }: UserDemographicsProps) {
  const totalUsers = users.totalClients + users.totalVendors + users.totalAgents;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-3xl border border-slate-100 hover:border-[#FF6014]/20 hover:shadow-xl hover:shadow-[#FF6014]/5 transition-all duration-300 p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Users size={18} className="text-[#FF6014]" />
              User Demographics
            </h3>
            <p className="text-xs text-slate-400 font-medium">Registered account distribution</p>
          </div>
          <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl border border-orange-100 shadow-xs">
            <Users size={20} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            className="text-center p-4 bg-slate-50/70 hover:bg-[#FFF8F4]/50 hover:border-[#FF6014]/20 rounded-2xl border border-slate-100 transition-all duration-200 group/item cursor-pointer"
          >
            <p className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight group-hover/item:text-[#FF6014] transition-colors">
              {users.totalClients}
            </p>
            <p className="text-[10px] font-extrabold text-slate-400 mt-1.5 uppercase tracking-wider flex items-center justify-center gap-1">
              <User size={10} className="text-slate-400" />
              Clients
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            className="text-center p-4 bg-slate-50/70 hover:bg-[#FFF8F4]/50 hover:border-[#FF6014]/20 rounded-2xl border border-slate-100 transition-all duration-200 group/item cursor-pointer"
          >
            <p className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight group-hover/item:text-[#FF6014] transition-colors">
              {users.totalVendors}
            </p>
            <p className="text-[10px] font-extrabold text-slate-400 mt-1.5 uppercase tracking-wider flex items-center justify-center gap-1">
              <Briefcase size={10} className="text-slate-400" />
              Vendors
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            className="text-center p-4 bg-slate-50/70 hover:bg-[#FFF8F4]/50 hover:border-[#FF6014]/20 rounded-2xl border border-slate-100 transition-all duration-200 group/item cursor-pointer"
          >
            <p className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight group-hover/item:text-[#FF6014] transition-colors">
              {users.totalAgents}
            </p>
            <p className="text-[10px] font-extrabold text-slate-400 mt-1.5 uppercase tracking-wider flex items-center justify-center gap-1">
              <Zap size={10} className="text-slate-400" />
              Agents
            </p>
          </motion.div>
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center px-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-slate-400" />
          Total Registered Users
        </span>
        <span className="text-lg font-black text-[#FF6014]">{totalUsers}</span>
      </div>
    </motion.div>
  );
}
