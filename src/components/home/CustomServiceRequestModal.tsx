"use client";

import React, { useState, useEffect } from "react";
import { X, Wrench, Send, Loader2, Sparkles, User, Phone, Mail, FileText, CheckCircle2 } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useCreateCustomRequestMutation } from "@/redux/features/admin/customRequestApi";
import { toast } from "sonner";

interface CustomServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export default function CustomServiceRequestModal({
  isOpen,
  onClose,
  categoryName = "Custom Service Request",
}: CustomServiceRequestModalProps) {
  const authUser = useAppSelector((state) => state.auth.user);
  const [createCustomRequest, { isLoading }] = useCreateCustomRequestMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    title: categoryName || "",
    description: "",
  });

  // Auto-fill user details if logged in
  useEffect(() => {
    if (isOpen) {
      const uName = authUser?.name || authUser?.profile?.name || "";
      const uPhone = authUser?.phone || authUser?.profile?.phone || "";
      const uEmail = authUser?.email || authUser?.profile?.email || "";

      setFormData((prev) => ({
        ...prev,
        name: uName || prev.name,
        phone: uPhone || prev.phone,
        email: uEmail || prev.email,
        title: categoryName || prev.title || "Custom Service Request",
      }));
    }
  }, [isOpen, authUser, categoryName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.description.trim()) {
      toast.error("Please fill in your name, phone number, and requirements.");
      return;
    }

    try {
      await createCustomRequest({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        title: formData.title.trim() || categoryName,
        description: formData.description.trim(),
        user_id: authUser?.id ? Number(authUser.id) : undefined,
      }).unwrap();

      toast.success("Custom service request submitted successfully! Our team will contact you shortly.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        title: "",
        description: "",
      });
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to submit request. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pt-16 pb-20 sm:p-4 bg-slate-900/40 backdrop-blur-[2px] animate-fadeIn font-sans transition-all"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF6014] to-[#FF7A3D] p-4 sm:p-6 text-white relative shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Sparkles size={16} />
            </span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/90">Custom Service</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black tracking-tight leading-tight pr-8">
            Book Custom Service Request
          </h2>
          <p className="text-[11px] sm:text-xs text-white/85 mt-0.5 sm:mt-1 font-medium leading-relaxed">
            Tell us what customized services or assistance you need, and our experts will arrange it for you.
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto flex-1">
          {authUser && (
            <div className="flex items-center gap-2 bg-[#FFF4EE] border border-[#FF6014]/20 rounded-xl px-3 py-2 text-[11px] sm:text-xs font-bold text-[#FF6014]">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>Logged in as {authUser.name || authUser.email || "User"}. Details auto-filled!</span>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <User size={13} className="text-[#FF6014]" /> Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Tanvir Ahmed"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition-all bg-slate-50/50 focus:bg-white"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Phone size={13} className="text-[#FF6014]" /> Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 01700000000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition-all bg-slate-50/50 focus:bg-white"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Mail size={13} className="text-[#FF6014]" /> Email Address <span className="text-slate-400 font-normal text-[10px]">(Optional)</span>
            </label>
            <input
              type="email"
              placeholder="e.g. user@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition-all bg-slate-50/50 focus:bg-white"
            />
          </div>

          {/* Title / Category Context */}
          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Wrench size={13} className="text-[#FF6014]" /> Requested Service Title / Category
            </label>
            <input
              type="text"
              placeholder="e.g. Custom AC Installation & Wiring"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition-all bg-slate-50/50 focus:bg-white"
            />
          </div>

          {/* Description / Requirements */}
          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={13} className="text-[#FF6014]" /> Custom Service Description & Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Please describe what specific custom service or setup you require in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition-all bg-slate-50/50 focus:bg-white resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-4 rounded-xl bg-[#FF6014] hover:bg-[#E0530A] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#FF6014]/25 hover:shadow-none transition-all disabled:opacity-60 active:scale-[0.98] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Book Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
