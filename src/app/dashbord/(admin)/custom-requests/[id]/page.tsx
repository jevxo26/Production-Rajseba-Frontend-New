"use client";

import React, { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  User,
  Phone,
  Mail,
  Wrench,
  Clock,
  CheckCircle2,
  PhoneCall,
  XCircle,
  Trash2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Loader2,
  ExternalLink,
} from "lucide-react";
import {
  useGetCustomRequestByIdQuery,
  useUpdateCustomRequestStatusMutation,
  useDeleteCustomRequestMutation,
} from "@/redux/features/admin/customRequestApi";
import { toast } from "sonner";

export default function CustomRequestDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data: response, isLoading, isError } = useGetCustomRequestByIdQuery(id);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateCustomRequestStatusMutation();
  const [deleteRequest, { isLoading: isDeleting }] = useDeleteCustomRequestMutation();

  const request = response?.data || response;

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateStatus({ id: Number(id), status: newStatus }).unwrap();
      toast.success(`Request status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this custom request?")) return;
    try {
      await deleteRequest(Number(id)).unwrap();
      toast.success("Request deleted successfully.");
      router.push("/dashbord/custom-requests");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete request.");
    }
  };

  const getStatusBadge = (status: string) => {
    const s = (status || "pending").toLowerCase();
    switch (s) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-extrabold">
            <Clock size={14} /> Pending
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold">
            <PhoneCall size={14} /> Contacted
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold">
            <CheckCircle2 size={14} /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-extrabold">
            <XCircle size={14} /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold">
            {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 font-sans">
        <Loader2 size={36} className="animate-spin text-[#FF6014]" />
        <p className="text-slate-400 text-xs font-bold">Loading request details...</p>
      </div>
    );
  }

  if (isError || !request) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-4 font-sans">
        <FileText size={48} className="text-slate-300 mx-auto" />
        <h2 className="text-lg font-black text-slate-800">Request Not Found</h2>
        <p className="text-xs text-slate-400 font-medium">
          The requested custom service request with ID #{id} could not be found or has been removed.
        </p>
        <Link
          href="/dashbord/custom-requests"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF6014] text-white text-xs font-bold rounded-xl shadow-md shadow-[#FF6014]/20"
        >
          <ArrowLeft size={15} /> Back to Custom Requests
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto font-sans">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/dashbord/custom-requests"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 hover:text-[#FF6014] bg-white border border-slate-200/80 px-4 py-2 rounded-xl transition-all shadow-sm w-fit"
        >
          <ArrowLeft size={16} /> Back to Requests List
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Trash2 size={15} /> Delete Request
          </button>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-[#FF6014]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF6014]/20 border border-[#FF6014]/40 text-[#FF7A3D] text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={13} /> Custom Request Details
              </span>
              <span className="text-slate-400 text-xs font-bold">
                ID: #{request.id}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              {request.title || "Custom Service Request"}
            </h1>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <Calendar size={14} className="text-slate-500" />
              Submitted on{" "}
              {new Date(request.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Status Control */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl flex flex-col gap-2 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Update Request Status
            </span>
            <div className="flex items-center gap-3">
              {getStatusBadge(request.status)}
              <select
                value={request.status || "pending"}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdating}
                className="bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-bold py-1.5 px-3 outline-none focus:border-[#FF6014] cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer Profile Info */}
        <div className="space-y-6">
          {/* Customer Details Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4EE] text-[#FF6014] flex items-center justify-center font-black text-lg">
                {request.name ? request.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">{request.name}</h3>
                <span className="text-xs font-semibold text-slate-400">Customer Details</span>
              </div>
            </div>

            <div className="space-y-3.5">
              {/* Phone */}
              <div className="p-3.5 bg-slate-50/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone size={13} className="text-[#FF6014]" /> Phone Number
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${request.phone}`}
                    className="text-sm font-extrabold text-[#FF6014] hover:underline"
                  >
                    {request.phone}
                  </a>
                  <a
                    href={`tel:${request.phone}`}
                    className="px-3 py-1 rounded-lg bg-[#FF6014] text-white text-[11px] font-bold hover:bg-[#E0530A] transition-all flex items-center gap-1"
                  >
                    <PhoneCall size={12} /> Call
                  </a>
                </div>
              </div>

              {/* Email */}
              {request.email ? (
                <div className="p-3.5 bg-slate-50/70 rounded-2xl space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail size={13} className="text-[#FF6014]" /> Email Address
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800 truncate max-w-[200px]">
                      {request.email}
                    </p>
                    <a
                      href={`mailto:${request.email}`}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-white text-[11px] font-bold hover:bg-slate-900 transition-all flex items-center gap-1"
                    >
                      <Mail size={12} /> Email
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-slate-50/50 rounded-2xl text-slate-400 text-xs font-medium italic">
                  No email address provided.
                </div>
              )}

              {/* Account linkage */}
              <div className="p-3.5 bg-slate-50/70 rounded-2xl space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#FF6014]" /> Account Status
                </span>
                <p className="text-xs font-bold text-slate-800">
                  {request.user_id ? (
                    <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                      <CheckCircle2 size={13} /> Registered User (ID #{request.user_id})
                    </span>
                  ) : (
                    <span className="text-slate-500 font-bold">Guest Submission</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Full Requirements & Service Specs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Requirements Card */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF4EE] text-[#FF6014] flex items-center justify-center font-bold">
                  <Wrench size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Service Requirements & Specifications
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">
                    Detailed breakdown of user custom request
                  </p>
                </div>
              </div>
            </div>

            {/* Requested Title */}
            <div className="p-4 bg-[#FFF8F4] border border-[#FF6014]/15 rounded-2xl space-y-1">
              <span className="text-[10px] font-black text-[#FF6014] uppercase tracking-wider">
                Category / Service Requested
              </span>
              <p className="text-sm font-black text-slate-900">
                {request.title || "Custom Service Request"}
              </p>
            </div>

            {/* Full Requirement Description */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={14} className="text-[#FF6014]" /> Custom Description
              </label>
              <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/60 text-slate-800 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-line min-h-[160px]">
                {request.description}
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-2">Quick Status Action:</span>
              <button
                onClick={() => handleStatusChange("contacted")}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall size={13} /> Mark Contacted
              </button>
              <button
                onClick={() => handleStatusChange("completed")}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 size={13} /> Mark Completed
              </button>
              <button
                onClick={() => handleStatusChange("cancelled")}
                className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle size={13} /> Mark Cancelled
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
