"use client";

import React from "react";
import { Mail, MessageSquare, Megaphone } from "lucide-react";

interface NotificationsCardProps {
  emailNotif: boolean;
  onEmailNotifChange: () => void;
  smsAlert: boolean;
  onSmsAlertChange: () => void;
  promotions: boolean;
  onPromotionsChange: () => void;
  Switch: React.ComponentType<{ checked: boolean; onChange: () => void }>;
}

export default function NotificationsCard({
  emailNotif,
  onEmailNotifChange,
  smsAlert,
  onSmsAlertChange,
  promotions,
  onPromotionsChange,
  Switch,
}: NotificationsCardProps) {
  return (
    <div id="notifications" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 scroll-mt-6">
      <h3 className="text-lg font-bold text-slate-900">Notifications</h3>

      <div className="space-y-4">
        {/* Email Notifications Row */}
        <div className="flex items-center justify-between gap-4 p-4 bg-slate-50/50 hover:bg-slate-50/80 rounded-2xl border border-slate-50 transition-colors">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#FFF8F4] rounded-xl text-[#FF6014] shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Email Notifications</h4>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Updates about your bookings and account.</p>
            </div>
          </div>
          <Switch checked={emailNotif} onChange={onEmailNotifChange} />
        </div>

        {/* SMS Alerts Row */}
        <div className="flex items-center justify-between gap-4 p-4 bg-slate-50/50 hover:bg-slate-50/80 rounded-2xl border border-slate-50 transition-colors">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#FFF8F4] rounded-xl text-[#FF6014] shrink-0">
              <MessageSquare size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">SMS Alerts</h4>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Urgent updates and service confirmations.</p>
            </div>
          </div>
          <Switch checked={smsAlert} onChange={onSmsAlertChange} />
        </div>

        {/* Promotions Row */}
        <div className="flex items-center justify-between gap-4 p-4 bg-slate-50/50 hover:bg-slate-50/80 rounded-2xl border border-slate-50 transition-colors">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#FFF8F4] rounded-xl text-[#FF6014] shrink-0">
              <Megaphone size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Promotions</h4>
              <p className="text-xs text-slate-400 mt-1 font-semibold">News, offers, and seasonal discounts.</p>
            </div>
          </div>
          <Switch checked={promotions} onChange={onPromotionsChange} />
        </div>
      </div>
    </div>
  );
}
