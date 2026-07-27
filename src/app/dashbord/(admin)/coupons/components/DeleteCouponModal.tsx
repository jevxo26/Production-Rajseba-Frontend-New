"use client";

import React from "react";
import { Coupon } from "@/redux/features/admin/coupon";

interface DeleteCouponModalProps {
  deleteTarget: Coupon | null;
  setDeleteTarget: (val: Coupon | null) => void;
  handleDelete: () => void;
}

export default function DeleteCouponModal({ deleteTarget, setDeleteTarget, handleDelete }: DeleteCouponModalProps) {
  if (!deleteTarget) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-bold text-slate-800">Delete Coupon?</h3>
        <p className="text-sm text-slate-500 mt-2">
          Are you sure you want to delete <strong>{deleteTarget.code}</strong>?
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 text-sm font-bold text-slate-500">
            Cancel
          </button>
          <button onClick={handleDelete} className="px-4 py-2 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
