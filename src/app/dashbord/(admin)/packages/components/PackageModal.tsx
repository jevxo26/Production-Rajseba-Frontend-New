"use client";

import React from "react";
import { X, Sparkles, Check, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomSelect } from "@/components/ui/select";
import { Package } from "@/redux/features/vendor/packageApi";
import { NestedService } from "@/redux/features/admin/service";

interface PackageModalProps {
  editingItem: Package | null;
  setIsModalOpen: (val: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  serviceOptions: any[];
  serviceId: string;
  setServiceId: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  featuresStr: string;
  setFeaturesStr: (val: string) => void;
  selectedNestedIds: number[];
  toggleNestedService: (id: number) => void;
  availableNestedServices: NestedService[];
  isCreating: boolean;
  isUpdating: boolean;
}

export default function PackageModal({
  editingItem,
  setIsModalOpen,
  handleSubmit,
  serviceOptions,
  serviceId,
  setServiceId,
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  featuresStr,
  setFeaturesStr,
  selectedNestedIds,
  toggleNestedService,
  availableNestedServices,
  isCreating,
  isUpdating,
}: PackageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Sparkles className="text-violet-500" size={20} />
            {editingItem ? "Edit Package" : "Create New Package"}
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
          {/* Parent Service (create only) */}
          {!editingItem && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Parent Service *
              </label>
              <CustomSelect
                options={serviceOptions}
                value={serviceId}
                onChange={(val) => {
                  setServiceId(val);
                }}
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Package Name *
            </label>
            <Input
              placeholder="e.g. Standard AC Servicing Package"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Price (৳)
            </label>
            <Input
              type="number"
              placeholder="e.g. 800"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Description
            </label>
            <Textarea
              placeholder="Describe what this package includes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/10 focus-visible:border-violet-400/80 disabled:cursor-not-allowed disabled:opacity-50 transition-all w-full"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Features (Comma Separated)
            </label>
            <Textarea
              placeholder="e.g. Free Checkup, 24/7 Support, Premium Parts"
              value={featuresStr}
              onChange={(e) => setFeaturesStr(e.target.value)}
              rows={2}
              className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/10 focus-visible:border-violet-400/80 disabled:cursor-not-allowed disabled:opacity-50 transition-all w-full"
            />
          </div>

          {/* Nested Service Multi-Select */}
          {(serviceId !== "NONE" || editingItem) && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Include Nested Services ({selectedNestedIds.length} selected)
              </label>
              {availableNestedServices.length === 0 && !editingItem ? (
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 text-center">
                  <Layers className="text-slate-300 mx-auto mb-1" size={24} />
                  <p className="text-xs text-slate-400 font-medium">No nested services found for this service.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/50 p-2">
                  {(editingItem && availableNestedServices.length === 0
                    ? editingItem.items?.map((i) => i.nestedService) || []
                    : availableNestedServices
                  ).map((ns) => {
                    if (!ns) return null;
                    const isSelected = selectedNestedIds.includes(ns.id);
                    return (
                      <button
                        key={ns.id}
                        type="button"
                        onClick={() => toggleNestedService(ns.id)}
                        className={`flex items-center gap-3 w-full p-2.5 rounded-xl text-left transition-all text-sm ${
                          isSelected
                            ? "bg-violet-50 border border-violet-200/80 text-violet-700 font-bold"
                            : "bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? "bg-violet-500 text-white" : "border-2 border-slate-200 bg-white"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span className="truncate">{ns.name}</span>
                        {ns.starting_price != null && (
                          <span className="ml-auto text-xs text-slate-400 font-medium shrink-0">
                            ৳{ns.starting_price.toLocaleString()}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

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
              {editingItem ? "Update Package" : "Create Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
