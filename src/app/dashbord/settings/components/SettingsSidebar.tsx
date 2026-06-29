"use client";

import React from "react";
import { User, Shield, Bell, Link as LinkIcon, CreditCard, LogOut } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface SettingsSidebarProps {
  activeTab: string;
  handleTabClick: (tabId: string) => void;
  router: AppRouterInstance;
}

export default function SettingsSidebar({ activeTab, handleTabClick, router }: SettingsSidebarProps) {
  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Login & Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "linked", label: "Linked Accounts", icon: LinkIcon },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 lg:p-6 lg:min-h-[480px] flex flex-col justify-between">
      {/* Scrollable tab links on mobile, stacked list on desktop */}
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 scrollbar-none whitespace-nowrap lg:whitespace-normal">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            activeTab === tab.id ||
            (activeTab === "personal" && tab.id === "personal") ||
            (activeTab === "security" && tab.id === "security") ||
            (activeTab === "notifications" && tab.id === "notifications");

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-left transition-all ${
                isActive
                  ? "bg-[#FFF8F4] text-[#FF6014] font-bold"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-semibold"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Separator & Logout button */}
      <div className="hidden lg:block pt-6 border-t border-slate-100 mt-6">
        <button
          onClick={() => router.push("/login")}
          className="w-full flex items-center gap-3 px-5 py-3 rounded-2xl text-left text-slate-500 hover:bg-[#FFF8F4] hover:text-[#E0530A] transition-all font-semibold"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
