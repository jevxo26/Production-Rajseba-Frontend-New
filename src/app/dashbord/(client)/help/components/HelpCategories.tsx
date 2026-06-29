"use client";

import React from "react";
import Link from "next/link";
import { Calendar, CreditCard, User, Shield } from "lucide-react";

export const categories = [
  {
    title: "Booking & Scheduling",
    icon: Calendar,
    desc: "Learn how to book a service, reschedule an appointment, or handle cancellations.",
    links: ["How do I change my booking time?", "Can I book multiple services?"],
  },
  {
    title: "Payments & Refund",
    icon: CreditCard,
    desc: "Understand pricing, payment methods, and our guaranteed refund policy.",
    links: ["When will I get my refund?", "Which payment methods are accepted?"],
  },
  {
    title: "Account & Privacy",
    icon: User,
    desc: "Manage your profile, data preferences, and security settings easily.",
    links: ["Changing your account email", "How we protect your data"],
  },
  {
    title: "Safety & Trust",
    icon: Shield,
    desc: "Our commitment to professional vetting and on-site service safety.",
    links: ["Verified service provider badge", "Report a safety concern"],
  },
];

export default function HelpCategories() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">Explore Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#FFF8F4]/60 rounded-2xl flex items-center justify-center text-[#FF6014] border border-[#FFF0EB]/30">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">{cat.title}</h3>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed mt-1">{cat.desc}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-50">
                {cat.links.map((link, lidx) => (
                  <Link
                    key={lidx}
                    href="#"
                    className="flex items-center text-xs font-bold text-[#FF6014] hover:text-[#FF6014] transition-colors"
                  >
                    <span className="mr-1.5 text-sm font-bold">→</span>
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
