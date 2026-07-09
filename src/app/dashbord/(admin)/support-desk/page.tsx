"use client";

import React, { useState } from "react";
import {
  Ticket,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Send,
  User,
  Shield,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetAdminTicketsQuery,
  useUpdateAdminTicketStatusMutation,
  useAddAdminTicketReplyMutation,
  useGetTicketDetailsQuery,
} from "@/redux/features/client/helpApi";
import { toast } from "sonner";

/* ── Helpers ──────────────────────────────────────────────── */
const statusConfig: Record<string, { labelEn: string; labelBn: string; icon: React.ComponentType<any>; badge: string }> = {
  pending:     { labelEn: "Pending",     labelBn: "পেন্ডিং",    icon: AlertCircle,  badge: "bg-amber-500/10 text-amber-600 border border-amber-200/30" },
  in_progress: { labelEn: "In Progress", labelBn: "চলমান",     icon: Clock,        badge: "bg-blue-500/10 text-blue-600 border border-blue-200/30" },
  resolved:    { labelEn: "Resolved",    labelBn: "সমাধানকৃত",   icon: CheckCircle2, badge: "bg-emerald-500/10 text-emerald-600 border border-emerald-200/30" },
  closed:      { labelEn: "Closed",      labelBn: "বন্ধ",        icon: XCircle,      badge: "bg-slate-100 text-slate-500 border border-slate-200" },
};

const priorityConfig: Record<string, { label: string; color: string; dot: string }> = {
  low:    { label: "Low",    color: "text-slate-500", dot: "bg-slate-400" },
  medium: { label: "Medium", color: "text-amber-600", dot: "bg-amber-400" },
  high:   { label: "High",   color: "text-rose-500", dot: "bg-rose-500" },
};

/* ── Stat Card ─────────────────────────────────────────────── */
function StatCard({ label, count, accent, icon: Icon }: { label: string; count: number; accent: string; icon: React.ComponentType<any> }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex items-center gap-4 hover:shadow-md hover:border-[#FF6014]/15 transition-all duration-300">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${accent}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-none">{count}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{label}</p>
      </div>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────── */
export default function SupportDeskPage() {
  const lang = useAppSelector((state) => state.lang.value);
  const role = useAppSelector((state) => state.auth.role) || "superadmin";

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // RTK Queries
  const { data: ticketsData, isLoading: isTicketsLoading, refetch: refetchTickets } = useGetAdminTicketsQuery(undefined, {
    skip: role !== "superadmin",
  });

  const { data: activeTicketData, isLoading: isActiveTicketLoading } = useGetTicketDetailsQuery(
    selectedTicketId!,
    { skip: !selectedTicketId }
  );

  const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateAdminTicketStatusMutation();
  const [addAdminReply, { isLoading: isSendingReply }] = useAddAdminTicketReplyMutation();

  // Access restriction
  if (role !== "superadmin") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
        <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
      </div>
    );
  }

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(lang === "bn" ? `টিকেটের স্ট্যাটাস পরিবর্তন সফল` : `Ticket status updated to ${status}`);
    } catch (err) {
      toast.error(lang === "bn" ? `স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে` : `Failed to update status`);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicketId) return;

    try {
      await addAdminReply({
        id: selectedTicketId,
        message: replyMessage,
      }).unwrap();
      setReplyMessage("");
      toast.success(lang === "bn" ? `বার্তা সফলভাবে পাঠানো হয়েছে` : `Reply sent successfully`);
    } catch (err) {
      toast.error(lang === "bn" ? `বার্তা পাঠাতে ব্যর্থ হয়েছে` : `Failed to send reply`);
    }
  };

  const ticketsList = ticketsData?.data || [];

  // Filter logic
  const filteredTickets = ticketsList.filter((t: any) => {
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    const matchPriority = filterPriority === "all" || t.priority === filterPriority;
    
    const clientName = t.user?.name || "";
    const clientEmail = t.user?.email || "";
    const subject = t.subject || "";
    const ticketId = t.ticketId || "";

    const matchSearch =
      !searchQuery ||
      subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clientEmail.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchPriority && matchSearch;
  });

  // Calculate statistics
  const stats = {
    total: ticketsList.length,
    pending: ticketsList.filter((t: any) => t.status === "pending").length,
    inProgress: ticketsList.filter((t: any) => t.status === "in_progress").length,
    resolved: ticketsList.filter((t: any) => t.status === "resolved").length,
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Header */}
      <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-xs px-7 py-6">
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-gradient-to-br from-[#FF6014]/10 to-[#FFB3AD]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFF8F4] border border-[#FF6014]/20 text-[#FF6014] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
              <Ticket size={10} />
              {lang === "bn" ? "হেল্পডেস্ক ও টিকিট" : "Support Desk"}
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {lang === "bn" ? "সাপোর্ট টিকিট ম্যানেজমেন্ট" : "Support Ticket Management"}
            </h1>
            <p className="text-slate-400 mt-0.5 text-xs font-semibold">
              {lang === "bn"
                ? "গ্রাহক, এজেন্ট ও পার্টনারদের উত্থাপিত সমস্যার সমাধান করুন।"
                : "Manage and resolve issues submitted by clients, vendors, and agents."}
            </p>
          </div>

          <button
            onClick={() => refetchTickets()}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all active:scale-[0.98] self-start sm:self-auto shadow-xs"
          >
            <RefreshCw size={14} />
            {lang === "bn" ? "রিফ্রেশ" : "Refresh"}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={lang === "bn" ? "মোট টিকিট" : "Total Tickets"} count={stats.total} accent="bg-slate-700" icon={Ticket} />
        <StatCard label={lang === "bn" ? "পেন্ডিং" : "Pending"} count={stats.pending} accent="bg-[#FF6014]" icon={AlertCircle} />
        <StatCard label={lang === "bn" ? "চলমান" : "In Progress"} count={stats.inProgress} accent="bg-blue-500" icon={Clock} />
        <StatCard label={lang === "bn" ? "সমাধানকৃত" : "Resolved"} count={stats.resolved} accent="bg-emerald-500" icon={CheckCircle2} />
      </div>

      {/* Main Support Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tickets List Area */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3 shadow-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "bn" ? "টিকিট আইডি, বিষয় অথবা নাম খুঁজুন..." : "Search by ID, client or subject..."}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#FF6014] transition-all"
            />
            
            <div className="grid grid-cols-2 gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-600 outline-none focus:border-[#FF6014]"
              >
                <option value="all">{lang === "bn" ? "সকল স্ট্যাটাস" : "All Status"}</option>
                <option value="pending">{lang === "bn" ? "পেন্ডিং" : "Pending"}</option>
                <option value="in_progress">{lang === "bn" ? "চলমান" : "In Progress"}</option>
                <option value="resolved">{lang === "bn" ? "সমাধানকৃত" : "Resolved"}</option>
                <option value="closed">{lang === "bn" ? "বন্ধ" : "Closed"}</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-600 outline-none focus:border-[#FF6014]"
              >
                <option value="all">{lang === "bn" ? "সকল গুরুত্ব" : "All Priority"}</option>
                <option value="low">{lang === "bn" ? "স্বল্প" : "Low"}</option>
                <option value="medium">{lang === "bn" ? "মাঝারি" : "Medium"}</option>
                <option value="high">{lang === "bn" ? "উচ্চ" : "High"}</option>
              </select>
            </div>
          </div>

          {/* Tickets list */}
          {isTicketsLoading ? (
            <div className="flex justify-center py-12 bg-white rounded-3xl border border-slate-100">
              <Loader2 className="w-8 h-8 text-[#FF6014] animate-spin" />
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400 font-semibold text-xs">
              {lang === "bn" ? "কোনো টিকিট পাওয়া যায়নি।" : "No support tickets found matching current filters."}
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredTickets.map((ticket: any) => {
                const isSelected = selectedTicketId === ticket.id;
                const sc = statusConfig[ticket.status] || { labelEn: ticket.status, badge: "bg-slate-100" };
                const pc = priorityConfig[ticket.priority] || { label: ticket.priority, color: "text-slate-400", dot: "bg-slate-300" };

                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? "bg-slate-950 border-slate-950 text-white shadow-md"
                        : "bg-white border-slate-100 text-slate-800 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className={`text-[9px] font-black uppercase tracking-wider ${isSelected ? "text-slate-400" : "text-slate-450"}`}>
                        {ticket.ticketId}
                      </span>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 ${
                        isSelected ? "bg-white/10 text-white border-white/20" : sc.badge
                      }`}>
                        {lang === "bn" ? sc.labelBn : sc.labelEn}
                      </span>
                    </div>

                    <h4 className="text-xs font-black mt-2 leading-snug line-clamp-1">{ticket.subject}</h4>
                    
                    <div className="flex justify-between items-center gap-4 mt-3 pt-3 border-t border-slate-50/10 text-[10px] font-semibold">
                      <span className={isSelected ? "text-slate-400" : "text-slate-500"}>
                        {ticket.user?.name || "Anonymous Client"}
                      </span>
                      <span className={`flex items-center gap-1 ${pc.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
                        {pc.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Ticket Chat / Detail Area */}
        <div className="lg:col-span-7">
          {selectedTicketId ? (
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[550px]">
              
              {/* Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTicketData?.data?.ticketId}</span>
                    <span className="text-[8px] font-bold text-red-500 uppercase bg-red-55 px-1.5 py-0.5 rounded">
                      {activeTicketData?.data?.priority} priority
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-800 mt-1">{activeTicketData?.data?.subject}</h3>
                </div>

                {/* Status Update dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Status:</label>
                  <select
                    value={activeTicketData?.data?.status || "pending"}
                    onChange={(e) => handleStatusChange(selectedTicketId, e.target.value)}
                    disabled={isUpdatingStatus}
                    className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              {/* Client Info Bar */}
              {activeTicketData?.data?.user && (
                <div className="px-5 py-3.5 border-b border-slate-100 bg-[#FFF8F4]/10 flex flex-wrap gap-4 text-[10px] font-bold text-slate-500">
                  <span className="flex items-center gap-1.5"><User size={13} className="text-[#FF6014]" /> {activeTicketData.data.user.name}</span>
                  <span className="flex items-center gap-1.5"><Mail size={13} className="text-[#FF6014]" /> {activeTicketData.data.user.email}</span>
                  {activeTicketData.data.user.phone && (
                    <span className="flex items-center gap-1.5"><Phone size={13} className="text-[#FF6014]" /> {activeTicketData.data.user.phone}</span>
                  )}
                </div>
              )}

              {/* Messages Trail */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[350px]">
                {isActiveTicketLoading ? (
                  <div className="flex justify-center items-center h-48">
                    <Loader2 className="w-6 h-6 text-[#FF6014] animate-spin" />
                  </div>
                ) : (
                  <>
                    {/* Customer description */}
                    <div className="flex gap-3 max-w-xl">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        <User size={14} />
                      </div>
                      <div className="bg-slate-50 border border-slate-100/80 p-3 rounded-2xl rounded-tl-none">
                        <span className="text-[10px] font-bold text-slate-800 block mb-1">
                          {activeTicketData?.data?.user?.name || "Client"} (Customer Description)
                        </span>
                        <p className="text-xs text-slate-600 font-medium whitespace-pre-wrap">{activeTicketData?.data?.description}</p>
                        <span className="text-[9px] text-slate-400 block mt-2 text-right">
                          {activeTicketData?.data ? new Date(activeTicketData.data.createdAt).toLocaleString() : ""}
                        </span>
                      </div>
                    </div>

                    {/* Replies conversation trail */}
                    {activeTicketData?.data?.replies?.map((rep: any, rIdx: number) => {
                      const isClient = rep.sender === "user";
                      return (
                        <div
                          key={rIdx}
                          className={`flex gap-3 max-w-xl ${isClient ? "" : "ml-auto flex-row-reverse"}`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isClient ? "bg-slate-100 text-slate-500" : "bg-orange-100 text-[#FF6014]"
                          }`}>
                            {isClient ? <User size={14} /> : <Shield size={14} />}
                          </div>
                          <div className={`p-3 rounded-2xl ${
                            isClient 
                              ? "bg-slate-50 border border-slate-100/85 rounded-tl-none"
                              : "bg-orange-50/50 border border-orange-100/60 rounded-tr-none text-right"
                          }`}>
                            <span className="text-[10px] font-bold text-slate-800 block mb-1">
                              {rep.name}
                            </span>
                            <p className="text-xs text-slate-600 font-medium whitespace-pre-wrap">{rep.message}</p>
                            <span className="text-[9px] text-slate-400 block mt-2">
                              {new Date(rep.createdAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-slate-100 bg-slate-50/40 flex gap-2">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={lang === "bn" ? "অ্যাডমিন উত্তর লিখুন..." : "Type admin/support desk message reply..."}
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF6014]"
                />
                <button
                  type="submit"
                  disabled={isSendingReply || !replyMessage.trim()}
                  className="p-2.5 bg-[#FF6014] text-white rounded-xl hover:opacity-90 transition-all shrink-0 cursor-pointer disabled:opacity-40"
                >
                  {isSendingReply ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>

            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center space-y-3 min-h-[550px] flex flex-col justify-center items-center">
              <Ticket className="w-12 h-12 text-[#FF6014]/20" />
              <h3 className="text-base font-bold text-slate-800">
                {lang === "bn" ? "কোনো টিকেট নির্বাচিত করা হয়নি" : "No Support Ticket Selected"}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs">
                {lang === "bn"
                  ? "ডিটেইল চ্যাট দেখতে এবং গ্রাহককে রিপ্লাই করতে বাম পাশের টিকেট লিস্ট থেকে একটি টিকেট নির্বাচন করুন।"
                  : "Select a support ticket from the list on the left to see the message history, change status, or reply to the client."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
