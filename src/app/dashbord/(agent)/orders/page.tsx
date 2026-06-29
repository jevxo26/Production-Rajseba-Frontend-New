"use client";

import React from "react";
import { Loader2, ShoppingCart } from "lucide-react";
import { CustomTable } from "@/components/ui/table";
import AccessDenied from "../../(client)/components/AccessDenied";
import { useAgentOrders } from "./hooks/useAgentOrders";

export default function AgentOrdersPage() {
  const state = useAgentOrders();

  if (state.role !== "agent") {
    return <AccessDenied roleRequired="Agent" />;
  }

  const columns = [
    {
      key: "id",
      header: "Order ID",
      render: (o: any) => <span className="font-bold text-brand-primary">#{o.id}</span>,
    },
    {
      key: "user",
      header: "Client",
      render: (o: any) => (
        <div>
          <p className="font-bold text-slate-900 leading-none">{o.user?.name || "—"}</p>
          <p className="text-xs text-slate-400 mt-1">{o.user?.phone || ""}</p>
        </div>
      ),
    },
    {
      key: "nestedService",
      header: "Service Info",
      render: (o: any) => <span>{o.nestedService?.name || o.pkg?.name || "—"}</span>,
    },
    {
      key: "vendor",
      header: "Assigned Provider",
      render: (o: any) => <span>{o.vendor?.name || "—"}</span>,
    },
    {
      key: "location",
      header: "Location",
      render: (o: any) => <span className="text-xs">{o.location || "—"}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (o: any) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
            o.status === "completed"
              ? "bg-emerald-50 text-emerald-700"
              : o.status === "assigned" || o.status === "on_the_way"
              ? "bg-indigo-50 text-indigo-700"
              : o.status === "cancelled"
              ? "bg-red-50 text-red-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {o.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (o: any) => <span>{new Date(o.createdAt).toLocaleDateString("en-BD")}</span>,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Recent Orders</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Full transaction ledger of all bookings managed by your agent profile.
            </p>
          </div>
        </div>
      </div>

      {state.isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={32} className="animate-spin text-[#FF6014]" />
        </div>
      ) : (
        <CustomTable
          columns={columns}
          data={state.allBookings}
          searchKey="id"
          searchPlaceholder="Search orders by ID..."
          filterKey="status"
          filterPlaceholder="All Statuses"
          filterOptions={[
            { label: "Completed", value: "completed" },
            { label: "Assigned", value: "assigned" },
            { label: "Pending", value: "pending" },
            { label: "On the Way", value: "on_the_way" },
            { label: "Cancelled", value: "cancelled" },
          ]}
          pageSize={10}
        />
      )}
    </div>
  );
}
