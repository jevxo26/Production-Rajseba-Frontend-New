"use client";

import React, { useEffect, useState } from "react";
import {
  Ticket,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Flame,
  Zap,
  Info,
  Trash2,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  hydrateTickets,
  updateTicketStatus,
  deleteTicket,
  SupportTicket,
  TicketStatus,
} from "@/redux/features/admin/ticketSlice";
import TicketModal from "./components/TicketModal";
import { toast } from "sonner";
import { format } from "date-fns";

/* ── Helpers ──────────────────────────────────────────────── */
const statusConfig: Record<TicketStatus, { label: string; icon: React.ComponentType<any>; badge: string }> = {
  open:        { label: "Open",        icon: AlertCircle,  badge: "bg-[#FFF8F4] text-[#FF6014] border border-[#FF6014]/25" },
  in_progress: { label: "In Progress", icon: Clock,        badge: "bg-amber-50 text-amber-700 border border-amber-200"     },
  resolved:    { label: "Resolved",    icon: CheckCircle2, badge: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  closed:      { label: "Closed",      icon: XCircle,      badge: "bg-slate-100 text-slate-500 border border-slate-200"    },
};

const priorityConfig = {
  low:    { label: "Low",    icon: Info,         color: "text-slate-500", dot: "bg-slate-400" },
  medium: { label: "Medium", icon: AlertCircle,  color: "text-amber-600", dot: "bg-amber-400" },
  high:   { label: "High",   icon: Zap,          color: "text-orange-600", dot: "bg-orange-500" },
  urgent: { label: "Urgent", icon: Flame,        color: "text-red-600",  dot: "bg-red-500"   },
};

const statuses: TicketStatus[] = ["open", "in_progress", "resolved", "closed"];

/* ── Stat Card ─────────────────────────────────────────────── */
function StatCard({ label, count, accent, icon: Icon }: { label: string; count: number; accent: string; icon: React.ComponentType<any> }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-[#FF6014]/15 transition-all duration-300">
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${accent}`}>
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-none">{count}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</p>
      </div>
    </div>
  );
}

/* ── Ticket Card ───────────────────────────────────────────── */
function TicketCard({ ticket, onStatusChange, onDelete }: {
  ticket: SupportTicket;
  onStatusChange: (id: string, status: TicketStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const sc = statusConfig[ticket.status];
  const pc = priorityConfig[ticket.priority];
  const StatusIcon = sc.icon;
  const PriorityIcon = pc.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#FF6014]/15 transition-all duration-300 p-5 group">
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-black text-slate-400 tracking-widest">{ticket.id}</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${sc.badge}`}>
              <StatusIcon size={10} />
              {sc.label}
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${pc.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${pc.dot}`} />
              {pc.label}
            </span>
          </div>
          <h3 className="font-black text-slate-900 text-sm leading-snug truncate">{ticket.title}</h3>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 rounded-xl transition-all"
            >
              Status <ChevronDown size={12} className={`transition-transform ${showStatusMenu ? "rotate-180" : ""}`} />
            </button>
            {showStatusMenu && (
              <div className="absolute right-0 top-9 z-50 bg-white rounded-2xl border border-slate-100 shadow-xl p-1.5 min-w-[140px]">
                {statuses.map((s) => {
                  const sc2 = statusConfig[s];
                  const Ic = sc2.icon;
                  return (
                    <button
                      key={s}
                      onClick={() => { onStatusChange(ticket.id, s); setShowStatusMenu(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:bg-slate-50 ${ticket.status === s ? "text-[#FF6014] bg-[#FFF8F4]" : "text-slate-600"}`}
                    >
                      <Ic size={13} /> {sc2.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {/* Delete */}
          <button
            onClick={() => onDelete(ticket.id)}
            className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 mb-3">{ticket.description}</p>

      {/* Tags */}
      {ticket.tags && ticket.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {ticket.tags.map((tag, i) => (
            <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-100 rounded-lg px-2 py-0.5">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-50 text-[11px] font-semibold text-slate-400">
        <div className="flex items-center gap-3">
          <span className="bg-slate-100 text-slate-600 font-bold rounded-lg px-2 py-0.5">{ticket.category}</span>
          {ticket.assignedTo && (
            <span>→ <span className="text-slate-600">{ticket.assignedTo}</span></span>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span>{format(new Date(ticket.createdAt), "MMM d, yyyy")}</span>
          <span className="text-slate-300 text-[10px]">{format(new Date(ticket.createdAt), "hh:mm a")}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────────────────── */
export default function SupportDeskPage() {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector((state) => state.tickets.tickets);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<TicketStatus | "all">("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(hydrateTickets());
  }, [dispatch]);

  const handleStatusChange = (id: string, status: TicketStatus) => {
    dispatch(updateTicketStatus({ id, status }));
    toast.success(`Ticket status → ${statusConfig[status].label}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("এই ticket টি delete করবেন?")) {
      dispatch(deleteTicket(id));
      toast.success("Ticket deleted");
    }
  };

  const filtered = tickets.filter((t) => {
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    const matchPriority = filterPriority === "all" || t.priority === filterPriority;
    const matchSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchPriority && matchSearch;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* ── Header ── */}
      <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-sm px-7 py-6">
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-gradient-to-br from-[#FF6014]/10 to-[#FFB3AD]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FFF8F4] border border-[#FF6014]/20 text-[#FF6014] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
              <Ticket size={10} />
              Support Desk
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Ticket Management
            </h1>
            <p className="text-slate-400 mt-1 text-sm font-medium">
              সকল support ticket manage করুন এবং নতুন ticket open করুন
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6014] to-[#E0530A] text-white font-black px-5 py-3 rounded-2xl shadow-lg shadow-[#FF6014]/25 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
          >
            <Plus size={18} />
            Open New Ticket
          </button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Tickets" count={stats.total} accent="bg-gradient-to-br from-slate-600 to-slate-800" icon={LayoutGrid} />
        <StatCard label="Open" count={stats.open} accent="bg-gradient-to-br from-[#FF6014] to-[#E0530A]" icon={AlertCircle} />
        <StatCard label="In Progress" count={stats.inProgress} accent="bg-gradient-to-br from-amber-500 to-amber-600" icon={Clock} />
        <StatCard label="Resolved" count={stats.resolved} accent="bg-gradient-to-br from-emerald-500 to-emerald-600" icon={CheckCircle2} />
      </div>

      {/* ── Filters ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ticket search করুন..."
          className="flex-1 min-w-[180px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-4 focus:ring-[#FF6014]/10 transition-all"
        />
        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as TicketStatus | "all")}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-[#FF6014] transition-all"
        >
          <option value="all">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{statusConfig[s].label}</option>
          ))}
        </select>
        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-[#FF6014] transition-all"
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <span className="text-xs font-bold text-slate-400">{filtered.length} tickets</span>
      </div>

      {/* ── Ticket List ── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-16 text-center">
          <div className="w-14 h-14 bg-[#FFF8F4] border border-[#FF6014]/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Ticket size={24} className="text-[#FF6014]/60" />
          </div>
          <h3 className="font-black text-slate-800 mb-2">কোনো Ticket নেই</h3>
          <p className="text-sm text-slate-400 font-medium mb-5">
            {tickets.length === 0
              ? "এখনো কোনো support ticket তৈরি হয়নি। প্রথম ticket open করুন।"
              : "এই filter-এ কোনো ticket পাওয়া যায়নি।"}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FF6014] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-md shadow-[#FF6014]/20"
          >
            <Plus size={16} /> Open First Ticket
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Ticket Modal */}
      <TicketModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
