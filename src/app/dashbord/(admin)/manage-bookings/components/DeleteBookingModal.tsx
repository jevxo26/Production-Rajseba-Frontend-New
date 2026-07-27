"use client";

import React from "react";
import { Trash2 } from "lucide-react";

interface DeleteBookingModalProps {
  deleteModalBookingId: number | null;
  setDeleteModalBookingId: (id: number | null) => void;
  handleDeleteConfirm: () => void;
  isDeleting: boolean;
}

export default function DeleteBookingModal({
  deleteModalBookingId,
  setDeleteModalBookingId,
  handleDeleteConfirm,
  isDeleting,
}: DeleteBookingModalProps) {
  if (!deleteModalBookingId) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 p-6 text-center border border-slate-100">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-sm">
          <Trash2 size={28} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Booking?</h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Are you sure you want to permanently delete this booking? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setDeleteModalBookingId(null)}
            className="flex-1 px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl transition-all shadow-sm"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
            className="flex-1 px-5 py-2.5 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
