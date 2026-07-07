"use client";

import React, { useState } from "react";
import { X, Ticket, AlertCircle, Info, Zap, Flame } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createTicket, TicketPriority } from "@/redux/features/admin/ticketSlice";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const priorities: { value: TicketPriority; label: string; icon: React.ComponentType<any>; color: string; bg: string }[] = [
  { value: "low", label: "Low", icon: Info, color: "text-slate-500", bg: "bg-slate-100 border-slate-200" },
  { value: "medium", label: "Medium", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  { value: "high", label: "High", icon: Zap, color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  { value: "urgent", label: "Urgent", icon: Flame, color: "text-red-600", bg: "bg-red-50 border-red-200" },
];

const categories = [
  "Technical Issue",
  "Billing & Payment",
  "Booking Problem",
  "Account & Access",
  "Vendor Complaint",
  "Service Quality",
  "Feature Request",
  "Other",
];

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium" as TicketPriority,
    category: "Technical Issue",
    assignedTo: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title ও Description দিন");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate async
    dispatch(
      createTicket({
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        category: form.category,
        assignedTo: form.assignedTo.trim() || undefined,
        reportedBy: authUser?.name || authUser?.email || "Admin",
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
      })
    );
    toast.success("Ticket successfully open হয়েছে! 🎫");
    setForm({ title: "", description: "", priority: "medium", category: "Technical Issue", assignedTo: "", tags: "" });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {/* Modal Header */}
            <div className="relative px-6 pt-6 pb-4 border-b border-slate-100 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#FF6014]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6014] to-[#E0530A] flex items-center justify-center shadow-lg shadow-[#FF6014]/25">
                  <Ticket size={18} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">New Support Ticket</h2>
                  <p className="text-xs text-slate-400 font-medium">নতুন সাপোর্ট টিকেট তৈরি করুন</p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-auto w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Ticket Title <span className="text-[#FF6014]">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="সমস্যার সংক্ষিপ্ত বিবরণ..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-4 focus:ring-[#FF6014]/10 transition-all"
                />
              </div>

              {/* Category + Priority row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#FF6014] focus:ring-4 focus:ring-[#FF6014]/10 transition-all"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Priority</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {priorities.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setForm({ ...form, priority: p.value })}
                        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-black border transition-all ${
                          form.priority === p.value
                            ? `${p.bg} ${p.color} scale-[1.02] shadow-sm`
                            : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        <p.icon size={12} />
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Description <span className="text-[#FF6014]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="সমস্যার বিস্তারিত বিবরণ দিন..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-4 focus:ring-[#FF6014]/10 transition-all resize-none"
                />
              </div>

              {/* Assign To */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Assign To <span className="text-slate-400 normal-case font-medium">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.assignedTo}
                  onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                  placeholder="Team member নাম..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-4 focus:ring-[#FF6014]/10 transition-all"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Tags <span className="text-slate-400 normal-case font-medium">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="payment, refund, urgent..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-4 focus:ring-[#FF6014]/10 transition-all"
                />
              </div>
            </form>

            {/* Footer Buttons */}
            <div className="px-6 pb-6 pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF6014] to-[#E0530A] text-white text-sm font-black shadow-lg shadow-[#FF6014]/25 hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    <Ticket size={15} />
                    Open Ticket
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
