"use client";

import React from "react";
import { Toaster } from "sonner";
import { CheckCircle2, AlertCircle, Loader2, Info } from "lucide-react";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      icons={{
        success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
        error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
        info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
        loading: <Loader2 className="w-5 h-5 text-slate-400 animate-spin shrink-0" />,
      }}
      toastOptions={{
        style: {
          fontFamily: "var(--font-bai-jamjuree)",
          borderRadius: "16px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          borderColor: "rgba(255,255,255,0.1)",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
        },
        classNames: {
          success: "!bg-emerald-950/80 !text-emerald-200 !border-emerald-800/60",
          error: "!bg-rose-950/80 !text-rose-200 !border-rose-800/60",
          info: "!bg-sky-950/80 !text-sky-200 !border-sky-800/60",
        }
      }}
    />
  );
}
