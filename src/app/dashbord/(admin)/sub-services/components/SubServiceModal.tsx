"use client";

import React from "react";
import { X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/select";
import { SubService } from "@/redux/features/admin/service";

interface SubServiceModalProps {
  editingItem: SubService | null;
  setIsModalOpen: (val: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  nestedServiceOptions: any[];
  nestedServiceId: string;
  setNestedServiceId: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  isCreating: boolean;
  isUpdating: boolean;
}

export default function SubServiceModal({
  editingItem,
  setIsModalOpen,
  handleSubmit,
  nestedServiceOptions,
  nestedServiceId,
  setNestedServiceId,
  name,
  setName,
  price,
  setPrice,
  isCreating,
  isUpdating,
}: SubServiceModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Sparkles className="text-indigo-500" size={20} />
            {editingItem ? "Edit Sub-Service" : "Add New Sub-Service"}
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Parent Nested Service (create/edit) */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Parent Nested Service *
            </label>
            <CustomSelect options={nestedServiceOptions} value={nestedServiceId} onChange={setNestedServiceId} />
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Sub-Service Name *
            </label>
            <Input
              placeholder="e.g. Filter Replacement"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Starting Price */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Price (৳) *
            </label>
            <Input
              type="number"
              placeholder="e.g. 500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
              required
            />
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="bg-brand-primary hover:bg-brand-dark disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98] shadow-md shadow-brand-primary/10"
            >
              {editingItem ? "Update Sub-Service" : "Create Sub-Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
