"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  PhoneCall,
  XCircle,
  Eye,
  Loader2,
  Calendar,
  User,
  Phone,
  Mail,
  Wrench,
  ChevronRight,
  X
} from "lucide-react";
import {
  useGetAllCustomRequestsQuery,
  useUpdateCustomRequestStatusMutation,
  useDeleteCustomRequestMutation
} from "@/redux/features/admin/customRequestApi";
import { toast } from "sonner";

import Link from "next/link";

export default function AdminCustomRequestsPage() {
  const { data: requestsRes, isLoading, isError, refetch } = useGetAllCustomRequestsQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateCustomRequestStatusMutation();
  const [deleteRequest, { isLoading: isDeleting }] = useDeleteCustomRequestMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const rawRequests = requestsRes?.data || (Array.isArray(requestsRes) ? requestsRes : []);

  // Filter requests
  const filteredRequests = rawRequests.filter((req: any) => {
    const matchesQuery =
      (req.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.phone || "").includes(searchQuery) ||
      (req.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.description || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || (req.status || "pending").toLowerCase() === statusFilter.toLowerCase();

    return matchesQuery && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: rawRequests.length,
    pending: rawRequests.filter((r: any) => (r.status || "pending").toLowerCase() === "pending").length,
    contacted: rawRequests.filter((r: any) => (r.status || "").toLowerCase() === "contacted").length,
    completed: rawRequests.filter((r: any) => (r.status || "").toLowerCase() === "completed").length,
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      toast.success(`Request #${id} status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this custom service request?")) return;
    try {
      await deleteRequest(id).unwrap();
      toast.success("Request deleted successfully.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete request.");
    }
  };

  const getStatusBadge = (status: string) => {
    const s = (status || "pending").toLowerCase();
    switch (s) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-extrabold">
            <Clock size={12} /> Pending
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-extrabold">
            <PhoneCall size={12} /> Contacted
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-extrabold">
            <CheckCircle2 size={12} /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF0F0] border border-red-200 text-red-600 text-[11px] font-extrabold">
            <XCircle size={12} /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-extrabold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF6014] uppercase tracking-wider mb-1">
            <FileText size={16} /> Operations Console
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Custom Service Requests
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium mt-0.5">
            Manage custom service request submissions, customer callback logs, and service status.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="self-start md:self-auto px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
        >
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-700 flex items-center justify-center font-bold shrink-0">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Total Requests</p>
            <h3 className="text-xl font-black text-slate-900">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-amber-100/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-[11px] font-black text-amber-600/80 uppercase tracking-wider">Pending</p>
            <h3 className="text-xl font-black text-slate-900">{stats.pending}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-blue-100/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <PhoneCall size={20} />
          </div>
          <div>
            <p className="text-[11px] font-black text-blue-600/80 uppercase tracking-wider">Contacted</p>
            <h3 className="text-xl font-black text-slate-900">{stats.contacted}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-emerald-100/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-[11px] font-black text-emerald-600/80 uppercase tracking-wider">Completed</p>
            <h3 className="text-xl font-black text-slate-900">{stats.completed}</h3>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, phone, title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition-all"
            />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {["all", "pending", "contacted", "completed", "cancelled"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black capitalize transition-all shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#FF6014] text-white shadow-sm"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Phone / Contact</th>
                <th className="py-3.5 px-4">Requested Service</th>
                <th className="py-3.5 px-4">Requirements</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#FF6014] mx-auto mb-2" />
                    <p className="text-slate-400 text-xs font-bold">Loading custom requests...</p>
                  </td>
                </tr>
              ) : filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm font-bold">No custom service requests found.</p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req: any) => (
                  <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-black text-slate-900">#{req.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900">{req.name}</div>
                      {req.email && <div className="text-[10px] text-slate-400 font-medium">{req.email}</div>}
                    </td>
                    <td className="py-3.5 px-4">
                      <a href={`tel:${req.phone}`} className="text-[#FF6014] font-extrabold hover:underline flex items-center gap-1">
                        <Phone size={12} /> {req.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {req.title || "Custom Service Request"}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="line-clamp-2 text-slate-500 text-[11px] font-medium leading-relaxed">
                        {req.description}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(req.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Details Link */}
                        <Link
                          href={`/dashbord/custom-requests/${req.id}`}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#FFF4EE] hover:text-[#FF6014] text-slate-600 transition-all flex items-center justify-center"
                          title="View Full Details Page"
                        >
                          <Eye size={15} />
                        </Link>

                        {/* Status Select */}
                        <select
                          value={req.status || "pending"}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 py-1 px-2 outline-none focus:border-[#FF6014]"
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(req.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all cursor-pointer"
                          title="Delete Request"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
