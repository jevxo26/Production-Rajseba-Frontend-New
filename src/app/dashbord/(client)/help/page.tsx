"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { HelpCircle } from "lucide-react";
import AccessDenied from "../components/AccessDenied";
import HelpCategories from "./components/HelpCategories";
import PopularArticles from "./components/PopularArticles";
import SupportBanner from "./components/SupportBanner";

export default function HelpCenterPage() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";
  const lang = useAppSelector((state) => state.lang.value);

  if (role !== "client") {
    return <AccessDenied roleRequired="Customer" />;
  }

  return (
    <div className="w-full animate-in fade-in duration-200">
      <div className="w-full space-y-10 relative z-10">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                {lang === "bn" ? "সাহায্য কেন্দ্র" : "Help Center"}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                {lang === "bn"
                  ? "প্রায়শই জিজ্ঞাসিত প্রশ্নের উত্তর খুঁজুন, টিউটোরিয়াল পড়ুন বা সাপোর্টের সাথে যুক্ত হন।"
                  : "Find answers to FAQs, read tutorials, or connect with support."}
              </p>
            </div>
          </div>
        </div>

        {/* Explore Categories Section */}
        <HelpCategories />

        {/* Popular Articles Section */}
        <PopularArticles />

        {/* Still Need Help Banner Section */}
        <SupportBanner />
      </div>
    </div>
  );
}
