"use client";

import { useState } from "react";
import { useGetNotificationsQuery, useMarkNotificationAsReadMutation } from "@/redux/features/notification/notificationApi";
import { useAppSelector } from "@/redux/hooks";
import { Bell, Calendar, BellRing, Info, Check, Filter, Search, Clock } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const lang = useAppSelector((state) => state.lang.value);
  const role = useAppSelector((state) => state.auth.role) || "client";
  const router = useRouter();

  const [filter, setFilter] = useState<'all' | 'unread' | 'booking' | 'system'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: notifications = [], isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();

  const unreadCount = notifications.filter((n: any) => !n.isRead).length;

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter((n: any) => !n.isRead);
    for (const notification of unreadNotifications) {
      try {
        await markAsRead(notification.id).unwrap();
      } catch (err) {
        console.error("Failed to mark as read", err);
      }
    }
  };

  const filteredNotifications = notifications.filter((n: any) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'unread'
        ? !n.isRead
        : filter === 'booking'
        ? n.type?.toLowerCase().includes('booking') || n.message?.toLowerCase().includes('booking')
        : !n.type?.toLowerCase().includes('booking');

    const matchesSearch =
      !searchTerm ||
      n.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.type?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getNotificationIcon = (type: string, message: string) => {
    const normalizedType = (type || '').toLowerCase();
    const msg = (message || '').toLowerCase();

    if (normalizedType.includes('booking') || msg.includes('booking') || msg.includes('বুকিং')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-[#FFF8F4] border border-[#FF6014]/25 text-[#FF6014] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
          <Calendar size={22} />
        </div>
      );
    }
    if (normalizedType.includes('service') || msg.includes('service') || msg.includes('সার্ভিস')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
          <BellRing size={22} />
        </div>
      );
    }
    if (normalizedType.includes('payment') || msg.includes('payout') || msg.includes('withdraw') || msg.includes('টাকা')) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
          <Check size={22} />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
        <Info size={22} />
      </div>
    );
  };

  const handleNotificationClick = async (n: any) => {
    if (!n.isRead) {
      try {
        await markAsRead(n.id).unwrap();
      } catch {}
    }
    // Navigate directly to dedicated notification details page
    router.push(`/dashbord/notifications/${n.id}`);
  };

  return (
    <div className="w-full space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-black text-[#FF6014] uppercase tracking-widest bg-[#FFF8F4] px-3.5 py-1.5 rounded-full border border-[#FF6014]/20 mb-3">
            <Bell size={13} />
            <span>Notification Hub</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            {lang === "bn" ? "নোটিফিকেশন সেন্টার" : "Notifications & Activity"}
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            {lang === "bn"
              ? "আপনার সমস্ত বুকিং আপডেট, সিস্টেম মেসেজ এবং অ্যালার্ট একসাথে দেখুন"
              : "View all your booking updates, system messages, and alerts in one place"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 bg-[#FFF8F4] hover:bg-[#FF6014] text-[#FF6014] hover:text-white border border-[#FF6014]/25 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-xs shrink-0 self-start md:self-auto"
          >
            <Check size={16} />
            <span>{lang === "bn" ? "সবগুলো পঠিত করুন" : "Mark All as Read"}</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {([
            { value: 'all', labelEn: 'All Activity', labelBn: 'সবগুলো' },
            { value: 'unread', labelEn: `Unread (${unreadCount})`, labelBn: `অপঠিত (${unreadCount})` },
            { value: 'booking', labelEn: 'Bookings', labelBn: 'বুকিং সংক্রান্ত' },
            { value: 'system', labelEn: 'System', labelBn: 'সিস্টেম অ্যালার্ট' }
          ] as const).map((tab) => {
            const isActive = filter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#FF6014] text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {lang === "bn" ? tab.labelBn : tab.labelEn}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === "bn" ? "খুঁজুন..." : "Filter notifications..."}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014]"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-3 shadow-xs">
            <div className="w-6 h-6 border-2 border-[#FF6014] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-slate-400">Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Bell size={24} />
            </div>
            <h3 className="text-sm font-black text-slate-800">
              {lang === "bn" ? "কোনো নোটিফিকেশন নেই" : "No Notifications Found"}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {lang === "bn" ? "আপনার ক্যাটাগরিতে কোনো নতুন নোটিফিকেশন নেই।" : "You're all caught up! No recent activity matching your filter."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((n: any) => {
            const isUnread = !n.isRead;
            return (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`bg-white border rounded-3xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex items-start gap-4 cursor-pointer group relative ${
                  isUnread
                    ? "border-[#FF6014]/30 bg-gradient-to-r from-white via-[#FFF8F4]/30 to-white"
                    : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                {/* Dynamic Icon */}
                {getNotificationIcon(n.type, n.message)}

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-[#FF6014] uppercase tracking-wider bg-[#FFF8F4] border border-[#FF6014]/20 px-2.5 py-0.5 rounded-full">
                        {n.type || "Update"}
                      </span>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-[#FF6014] animate-pulse" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                      <Clock size={12} />
                      <span>{format(new Date(n.createdAt), "MMM d, yyyy • h:mm a")}</span>
                    </div>
                  </div>

                  <p className={`text-xs md:text-sm leading-relaxed ${isUnread ? "font-black text-slate-900" : "font-semibold text-slate-600"}`}>
                    {n.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
