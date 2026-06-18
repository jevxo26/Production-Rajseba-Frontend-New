"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

interface Booking {
  id: string;
  service: string;
  provider: string;
  date: string;
  time: string;
  price: string;
  status: BookingStatus;
  icon: string;
}

const BOOKINGS: Booking[] = [
  {
    id: "1",
    service: "Home Cleaning Service",
    provider: "CleanPro BD",
    date: "20 Jun",
    time: "10:00 AM",
    price: "৳2,500",
    status: "confirmed",
    icon: "🏠",
  },
  {
    id: "2",
    service: "AC Repair & Maintenance",
    provider: "CoolTech Services",
    date: "22 Jun",
    time: "2:00 PM",
    price: "৳3,800",
    status: "confirmed",
    icon: "❄️",
  },
  {
    id: "3",
    service: "Plumbing Repair",
    provider: "PipeFix Dhaka",
    date: "25 Jun",
    time: "11:00 AM",
    price: "৳1,200",
    status: "pending",
    icon: "🔧",
  },
  {
    id: "4",
    service: "Furniture Assembly",
    provider: "HomeAssist Pro",
    date: "28 Jun",
    time: "9:00 AM",
    price: "৳950",
    status: "pending",
    icon: "🪑",
  },
  {
    id: "5",
    service: "Pest Control Treatment",
    provider: "SafeHome Pest",
    date: "30 Jun",
    time: "8:30 AM",
    price: "৳1,800",
    status: "confirmed",
    icon: "🐛",
  },
  {
    id: "6",
    service: "Deep Cleaning Service",
    provider: "CleanPro BD",
    date: "10 Jun",
    time: "9:00 AM",
    price: "৳3,200",
    status: "completed",
    icon: "✨",
  },
  {
    id: "7",
    service: "Electrical Wiring Check",
    provider: "Volt Masters",
    date: "5 Jun",
    time: "3:00 PM",
    price: "৳1,050",
    status: "completed",
    icon: "⚡",
  },
  {
    id: "8",
    service: "Painting Service",
    provider: "Brush & Roll Co.",
    date: "3 Jun",
    time: "10:00 AM",
    price: "৳4,500",
    status: "cancelled",
    icon: "🎨",
  },
];

const STATUS_CONFIG: Record<
  BookingStatus,
  {
    label: string;
    pillBg: string;
    pillText: string;
    borderColor: string;
    iconBg: string;
    iconText: string;
  }
> = {
  confirmed: {
    label: "Confirmed",
    pillBg: "bg-[#FFF0F1]",
    pillText: "text-[#D6363B]",
    borderColor: "border-l-[#FF5A5F]",
    iconBg: "bg-[#FFF0F1]",
    iconText: "text-[#D6363B]",
  },
  pending: {
    label: "Pending",
    pillBg: "bg-amber-50",
    pillText: "text-amber-700",
    borderColor: "border-l-amber-400",
    iconBg: "bg-amber-50",
    iconText: "text-amber-700",
  },
  completed: {
    label: "Completed",
    pillBg: "bg-gray-100",
    pillText: "text-gray-500",
    borderColor: "border-l-gray-300",
    iconBg: "bg-gray-100",
    iconText: "text-gray-500",
  },
  cancelled: {
    label: "Cancelled",
    pillBg: "bg-red-50",
    pillText: "text-red-400",
    borderColor: "border-l-red-300",
    iconBg: "bg-red-50",
    iconText: "text-red-400",
  },
};

const FILTERS: { label: string; value: "all" | BookingStatus }[] = [
  { label: "All", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const STATS = [
  { label: "Confirmed", value: "3", sub: "Upcoming" },
  { label: "Pending", value: "2", sub: "Awaiting approval" },
  { label: "Completed", value: "2", sub: "This month" },
  { label: "Total spent", value: "৳14,500", sub: "June 2026" },
];

export default function BookingsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | BookingStatus>(
    "all",
  );
  const [search, setSearch] = useState("");

  const filtered = BOOKINGS.filter((b) => {
    const matchFilter = activeFilter === "all" || b.status === activeFilter;
    const matchSearch =
      !search ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.provider.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <section className="min-h-screen bg-[var(--background)] px-4 py-8 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-[url('/bg-icons-design.png')] bg-repeat opacity-10 pointer-events-none z-0" />
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
              Bookings
            </h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              June 2026 — {BOOKINGS.length} bookings total
            </p>
          </motion.div>
          <button className="flex shrink-0 items-center gap-2 rounded-xl bg-[#FF5A5F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D6363B] active:scale-[0.98]">
            + New booking
          </button>
        </div>

        <motion.div
          className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-xl bg-[#FFF0F1] px-4 py-3"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[#D6363B] opacity-70">
                {stat.label}
              </p>
              <p className="mt-1 text-xl font-semibold text-[#D6363B]">
                {stat.value}
              </p>
              <p className="text-xs text-[#FF5A5F] opacity-60">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-4 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${activeFilter === f.value ? "bg-[#FF5A5F] text-white shadow-sm" : "bg-[#FFF0F1] text-[#D6363B] hover:bg-[#FFE4E6]"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center gap-3 rounded-xl border border-[var(--border-light)] bg-white px-4 py-2.5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by service or provider..."
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <p className="text-4xl">📋</p>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  No bookings match your filter.
                </p>
              </motion.div>
            ) : (
              filtered.map((booking) => {
                const cfg = STATUS_CONFIG[booking.status];
                return (
                  <motion.div
                    key={booking.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`flex items-center gap-4 rounded-r-xl border border-l-4 bg-white px-4 py-4 transition-shadow hover:shadow-md ${cfg.borderColor}`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${cfg.iconBg}`}
                    >
                      {booking.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                        {booking.service}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[var(--text-secondary)]">
                        <span>
                          📅 {booking.date}, {booking.time}
                        </span>
                        <span>👤 {booking.provider}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.pillBg} ${cfg.pillText}`}
                      >
                        {cfg.label}
                      </span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        {booking.price}
                      </span>
                      <button className="rounded-lg border border-[var(--border-light)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:border-[#FF5A5F] hover:text-[#FF5A5F]">
                        {booking.status === "completed"
                          ? "Review"
                          : booking.status === "cancelled"
                            ? "Rebook"
                            : "Details"}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
