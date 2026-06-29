"use client";

import React from "react";
import { MessageSquare, Mail, Phone } from "lucide-react";

export default function SupportBanner() {
  return (
    <div className="bg-[#FFF8F4]/45 rounded-[40px] border border-[#FFF0EB]/30 p-8 sm:p-10 text-center space-y-8 mt-6">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Still need help?</h2>
        <p className="text-xs text-slate-500 font-semibold max-w-lg mx-auto leading-relaxed">
          Our dedicated support team is ready to assist you. Choose your preferred way to connect with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 divide-y md:divide-y-0 md:divide-x divide-rose-100/50">
        {/* Live Chat */}
        <div className="space-y-4 pt-4 md:pt-0">
          <div className="w-14 h-14 bg-white border border-[#FFF0EB]/70 rounded-full flex items-center justify-center text-[#FF6014] mx-auto shadow-sm">
            <MessageSquare size={22} />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">Live Chat</h4>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">Typical response time: 2 mins</p>
          </div>
          <button className="bg-[#FF6014] hover:bg-[#FF6014] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-sm shadow-[#FF6014]/10 active:scale-[0.98] transition-all w-fit mx-auto focus:outline-none">
            Start Chatting
          </button>
        </div>

        {/* Email Support */}
        <div className="space-y-4 pt-6 md:pt-0 md:pl-6">
          <div className="w-14 h-14 bg-white border border-[#FFF0EB]/70 rounded-full flex items-center justify-center text-[#FF6014] mx-auto shadow-sm">
            <Mail size={22} />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">Email Support</h4>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">Typical response time: 2 hours</p>
          </div>
          <button className="border border-[#FF6014] hover:bg-[#FFF8F4]/40 text-[#FF6014] text-xs font-bold px-6 py-2.5 rounded-full active:scale-[0.98] transition-all w-fit mx-auto focus:outline-none">
            Send Email
          </button>
        </div>

        {/* hotline */}
        <div className="space-y-4 pt-6 md:pt-0 md:pl-6">
          <div className="w-14 h-14 bg-white border border-[#FFF0EB]/70 rounded-full flex items-center justify-center text-[#FF6014] mx-auto shadow-sm">
            <Phone size={22} />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">24/7 Hotline</h4>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">Immediate support for emergencies</p>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-full active:scale-[0.98] transition-all w-fit mx-auto focus:outline-none">
            +880 1678 900000
          </button>
        </div>
      </div>
    </div>
  );
}
