"use client";

import React from "react";
import Link from "next/link";
import { CustomTable } from "@/components/ui/table";
import { Calendar, User, Package as PkgIcon, MapPin, Clock, Trash2, Briefcase } from "lucide-react";

interface BookingTableProps {
  filteredBookings: any[];
  setDeleteModalBookingId: (id: number) => void;
}

export default function BookingTable({ filteredBookings, setDeleteModalBookingId }: BookingTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "assigned":
        return "bg-blue-50 text-blue-600 border border-blue-200";
      case "on_the_way":
        return "bg-purple-50 text-purple-600 border border-purple-200";
      case "completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "cancelled":
        return "bg-[#FFF8F4] text-[#E0530A] border border-[#FF6014]/30";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const columns = [
    {
      key: "date",
      header: "Schedule",
      render: (item: any) => (
        <div className="flex flex-col">
          <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap border border-slate-200/50">
            <Calendar size={14} className="text-slate-400" />
            {item.date
              ? new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "N/A"}
          </span>
          {item.time && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-lg text-[10px] font-bold mt-1 ml-1 border border-amber-100/50">
              <Clock size={10} /> {item.time}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "user",
      header: "Client & Location",
      accessorKey: "user",
      render: (item: any) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
            <User size={14} className="text-slate-400" />
            {item.user?.name || "Unknown"}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin size={12} />
            <span className="truncate max-w-[150px]">{item.location}</span>
          </div>
        </div>
      ),
    },
    {
      key: "service",
      header: "Service Details",
      render: (item: any) => (
        <div className="flex flex-col gap-1">
          {item.subServices && item.subServices.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {item.subServices.map((ss: any) => {
                const qty = item.sub_service_items?.find(
                  (entry: any) => entry.sub_service_id === ss.id
                )?.quantity;
                return (
                  <span
                    key={ss.id}
                    className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg text-xs font-semibold"
                  >
                    <Briefcase size={12} /> {ss.name}
                    {qty && qty > 1 ? ` ×${qty}` : ""}
                  </span>
                );
              })}
            </div>
          ) : item.pkg ? (
            <span className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-lg text-xs font-semibold">
              <PkgIcon size={12} /> {item.pkg.name}
              {item.quantity && item.quantity > 1 ? ` ×${item.quantity}` : ""}
            </span>
          ) : (
            <span className="text-slate-400 italic text-xs font-medium">No service selected</span>
          )}
        </div>
      ),
    },
    {
      key: "price",
      header: "Total Price",
      accessorKey: "total_price",
      render: (item: any) => <span className="font-bold text-slate-800">৳{item.total_price || 0}</span>,
    },
    {
      key: "status",
      header: "Status",
      accessorKey: "status",
      render: (item: any) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      accessorKey: "actions",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/dashbord/manage-bookings/${item.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            View Details
          </Link>
          <button
            onClick={() => setDeleteModalBookingId(item.id)}
            className="p-1.5 rounded-lg border border-rose-200 hover:border-rose-500 hover:text-white hover:bg-rose-500 text-rose-500 bg-rose-50 transition-all shadow-sm"
            title="Delete Booking"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return <CustomTable columns={columns} data={filteredBookings} />;
}
