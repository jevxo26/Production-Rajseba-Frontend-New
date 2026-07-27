"use client";

import { use } from "react";
import { useGetNotificationsQuery, useMarkNotificationAsReadMutation } from "@/redux/features/notification/notificationApi";
import { useAppSelector } from "@/redux/hooks";
import { Bell, Calendar, BellRing, Info, Check, ArrowLeft, Clock, ShieldCheck, Tag, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const notificationId = Number(resolvedParams.id);

  const lang = useAppSelector((state) => state.lang.value);
  const role = useAppSelector((state) => state.auth.role) || "client";
  const router = useRouter();

  const { data: notifications = [], isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();

  const notification = notifications.find((n: any) => n.id === notificationId);

  // Auto mark as read when detail page is opened
  if (notification && !notification.isRead) {
    markAsRead(notification.id).catch(() => {});
  }

  const getNotificationIcon = (type: string, message: string) => {
    const normalizedType = (type || '').toLowerCase();
    const msg = (message || '').toLowerCase();

    if (normalizedType.includes('booking') || msg.includes('booking') || msg.includes('বুকিং')) {
      return (
        <div className="w-14 h-14 rounded-3xl bg-[#FFF8F4] border border-[#FF6014]/25 text-[#FF6014] flex items-center justify-center shrink-0 shadow-sm">
          <Calendar size={26} />
        </div>
      );
    }
    if (normalizedType.includes('service') || msg.includes('service') || msg.includes('সার্ভিস')) {
      return (
        <div className="w-14 h-14 rounded-3xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
          <BellRing size={26} />
        </div>
      );
    }
    if (normalizedType.includes('payment') || msg.includes('payout') || msg.includes('withdraw') || msg.includes('টাকা')) {
      return (
        <div className="w-14 h-14 rounded-3xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
          <Check size={26} />
        </div>
      );
    }
    return (
      <div className="w-14 h-14 rounded-3xl bg-indigo-50 border border-indigo-200/80 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
        <Info size={26} />
      </div>
    );
  };

  const bookingMatch = notification?.message?.match(/#(\d+)/);
  const targetBookingId = bookingMatch ? bookingMatch[1] : null;

  return (
    <div className="w-full space-y-6 pb-16">
      {/* Back Button & Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/dashbord/notifications"
          className="inline-flex items-center gap-2 text-xs font-black text-slate-700 hover:text-[#FF6014] bg-white border border-slate-200/80 hover:border-[#FF6014]/30 px-4 py-2.5 rounded-2xl shadow-xs transition-all duration-200"
        >
          <ArrowLeft size={16} />
          <span>{lang === "bn" ? "সকল নোটিফিকেশনে ফিরে যান" : "Back to Notifications"}</span>
        </Link>

        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          ID: #{notificationId}
        </span>
      </div>

      {isLoading ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center flex flex-col items-center justify-center gap-3 shadow-xs">
          <div className="w-8 h-8 border-3 border-[#FF6014] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-500">Loading notification details...</p>
        </div>
      ) : !notification ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Bell size={28} />
          </div>
          <h2 className="text-base font-black text-slate-800">Notification Not Found</h2>
          <p className="text-xs text-slate-500 font-medium">The notification you requested could not be located or may have been deleted.</p>
          <Link
            href="/dashbord/notifications"
            className="inline-block bg-[#FF6014] text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-xs hover:bg-[#E0530A] transition-colors"
          >
            Return to Notification Hub
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-xs space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF6014] via-[#FF8142] to-[#FF6014]/40" />

          {/* Top Header Card Info */}
          <div className="flex items-start gap-5 flex-col sm:flex-row">
            {getNotificationIcon(notification.type, notification.message)}

            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black text-[#FF6014] uppercase tracking-wider bg-[#FFF8F4] border border-[#FF6014]/20 px-3 py-1 rounded-full">
                  {notification.type || "Activity Update"}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400">
                  <Clock size={14} />
                  <span>{format(new Date(notification.createdAt), "EEEE, MMMM d, yyyy • h:mm a")}</span>
                </span>
              </div>

              <h1 className="text-lg md:text-xl font-black text-slate-900 leading-snug">
                Notification Details
              </h1>
            </div>
          </div>

          {/* Main Message Box */}
          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Message Content
            </h3>
            <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed whitespace-pre-wrap">
              {notification.message}
            </p>
          </div>

          {/* Information Metadata Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <Tag size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Category Type</p>
                <p className="text-xs font-black text-slate-800">{notification.type || "General"}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Read Status</p>
                <p className="text-xs font-black text-emerald-600">Verified & Read</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Received Time</p>
                <p className="text-xs font-black text-slate-800">{format(new Date(notification.createdAt), "h:mm a")}</p>
              </div>
            </div>
          </div>

          {/* Action Navigation Link */}
          {targetBookingId && (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href={
                  role === 'superadmin' || role === 'admin' || role === 'employee'
                    ? `/dashbord/manage-bookings/${targetBookingId}`
                    : role === 'vendor'
                    ? `/dashbord/vendor-bookings`
                    : `/dashbord/overview`
                }
                className="inline-flex items-center gap-2 bg-[#FF6014] hover:bg-[#E0530A] text-white text-xs font-black px-6 py-3 rounded-2xl shadow-md transition-all duration-200 cursor-pointer"
              >
                <span>{lang === "bn" ? `বুকিং #${targetBookingId} বিস্তারিত দেখুন` : `View Booking #${targetBookingId} Details`}</span>
                <ExternalLink size={16} />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
