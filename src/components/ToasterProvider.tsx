"use client";

import React from "react";
import { Toaster } from "sonner";
import { CheckCircle2, AlertCircle, Loader2, Info, AlertTriangle } from "lucide-react";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      theme="light"
      richColors
      closeButton
      expand={true}
      duration={3500}
      style={{ zIndex: 99999 }}
      icons={{
        success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.5]" />,
        error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 stroke-[2.5]" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 stroke-[2.5]" />,
        info: <Info className="w-5 h-5 text-sky-600 shrink-0 stroke-[2.5]" />,
        loading: <Loader2 className="w-5 h-5 text-[#FF6014] animate-spin shrink-0 stroke-[2.5]" />,
      }}
      toastOptions={{
        style: {
          fontFamily: "var(--font-bai-jamjuree)",
          borderRadius: "16px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "#ffffff",
          color: "#0f172a",
          borderColor: "#e2e8f0",
          boxShadow: "0 20px 30px -8px rgba(0, 0, 0, 0.12), 0 8px 12px -6px rgba(0, 0, 0, 0.06)",
          zIndex: 99999,
        },
        classNames: {
          toast: "!z-[99999] font-semibold text-sm shadow-xl transition-all duration-200 backdrop-blur-md",
          title: "text-slate-900 font-bold text-sm tracking-tight",
          description: "text-slate-500 font-medium text-xs mt-0.5",
          actionButton: "!bg-[#FF6014] !text-white hover:!bg-[#E0530A] !font-bold !rounded-xl !px-3 !py-1.5 !text-xs transition-all",
          cancelButton: "!bg-slate-100 !text-slate-700 hover:!bg-slate-200 !font-semibold !rounded-xl !px-3 !py-1.5 !text-xs",
          closeButton: "!bg-white !border-slate-200 !text-slate-400 hover:!text-slate-700 shadow-sm",
          success: "!bg-emerald-50/90 !text-emerald-950 !border-emerald-200/90",
          error: "!bg-rose-50/90 !text-rose-950 !border-rose-200/90",
          warning: "!bg-amber-50/90 !text-amber-950 !border-amber-200/90",
          info: "!bg-sky-50/90 !text-sky-950 !border-sky-200/90",
          loading: "!bg-orange-50/90 !text-slate-900 !border-orange-200/90",
        }
      }}
    />
  );
}
