import React from "react";

export default function DashboardLoading(): React.JSX.Element {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-8 space-y-8 animate-pulse">
      {/* ── Top Header Placeholder ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          {/* Title bar */}
          <div className="h-8 w-48 bg-slate-200 rounded-xl" />
          {/* Subtitle bar */}
          <div className="h-4 w-72 bg-slate-200/80 rounded-lg" />
        </div>
        {/* Action Button placeholder */}
        <div className="h-10 w-32 bg-slate-200 rounded-xl self-start sm:self-auto" />
      </div>

      {/* ── Metric Cards Placeholder (Grid of 4) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              {/* Icon circle placeholder */}
              <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
              {/* Trend pill placeholder */}
              <div className="w-16 h-6 bg-slate-100 rounded-full" />
            </div>
            <div className="space-y-2">
              {/* Title bar */}
              <div className="h-4 w-24 bg-slate-200 rounded-lg" />
              {/* Number bar */}
              <div className="h-7 w-16 bg-slate-200 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Dashboard Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Table/Chart Card (Col span 2) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center">
            {/* Table title */}
            <div className="h-6 w-36 bg-slate-200 rounded-lg" />
            {/* Table action */}
            <div className="h-8 w-20 bg-slate-100 rounded-xl" />
          </div>
          {/* Table Header */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-4 gap-4 pb-2 border-b border-slate-100">
              <div className="h-4 bg-slate-200 rounded col-span-2" />
              <div className="h-4 bg-slate-200 rounded" />
              <div className="h-4 bg-slate-200 rounded" />
            </div>
            {/* Table Rows (5 rows) */}
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="grid grid-cols-4 gap-4 py-3 border-b border-slate-50 last:border-0 items-center">
                <div className="flex items-center gap-3 col-span-2">
                  {/* Avatar circle */}
                  <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0" />
                  {/* Name */}
                  <div className="h-4 w-24 bg-slate-200 rounded-lg" />
                </div>
                {/* Info Column */}
                <div className="h-4 w-16 bg-slate-100 rounded-lg" />
                {/* Status Column */}
                <div className="h-6 w-20 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Mini-feed / List Card */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-center">
            {/* Title */}
            <div className="h-6 w-32 bg-slate-200 rounded-lg" />
            {/* More link */}
            <div className="h-4 w-12 bg-slate-100 rounded-lg" />
          </div>
          {/* List items (4 items) */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                {/* Icon or image placeholder */}
                <div className="w-10 h-10 bg-slate-100 rounded-xl shrink-0" />
                <div className="space-y-2 flex-1">
                  {/* Title bar */}
                  <div className="h-4 w-4/5 bg-slate-200 rounded-lg" />
                  {/* Description bar */}
                  <div className="h-3 w-1/2 bg-slate-100 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
