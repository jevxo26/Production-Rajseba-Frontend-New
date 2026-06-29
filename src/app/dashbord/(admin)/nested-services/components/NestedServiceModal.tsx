"use client";

import React from "react";
import { X, Sparkles, PlusCircle, Trash2, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomSelect } from "@/components/ui/select";
import { NestedService } from "@/redux/features/admin/service";

interface NestedServiceModalProps {
  editingItem: NestedService | null;
  setIsModalOpen: (val: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  serviceOptions: any[];
  serviceId: string;
  setServiceId: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  subServices: { name: string; price: string }[];
  setSubServices: (val: { name: string; price: string }[]) => void;
  description: string;
  setDescription: (val: string) => void;
  image: string;
  setImage: (val: string) => void;
  isUploadingImage: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCreating: boolean;
  isUpdating: boolean;
}

export default function NestedServiceModal({
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
  subServices,
  setSubServices,
  description,
  setDescription,
  image,
  setImage,
  isUploadingImage,
  handleImageUpload,
  isCreating,
  isUpdating,
}: NestedServiceModalProps) {
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
          {/* Parent Service (create only) */}
          {!editingItem && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Parent Service *
              </label>
              <CustomSelect options={serviceOptions} value={serviceId} onChange={setServiceId} />
            </div>
          )}

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
              Starting Price (৳)
            </label>
            <Input
              type="number"
              placeholder="e.g. 500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
            />
          </div>

          {/* Sub Services */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Options / Sub-Services
              </label>
              <button
                type="button"
                onClick={() => setSubServices([...subServices, { name: "", price: "" }])}
                className="text-xs font-bold text-brand-primary flex items-center gap-1 hover:underline"
              >
                <PlusCircle size={14} /> Add Option
              </button>
            </div>
            {subServices.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No options added yet. Click 'Add Option' above.</p>
            ) : (
              <div className="space-y-3">
                {subServices.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Input
                      placeholder="Option Name (e.g. 1 Ton)"
                      value={sub.name}
                      onChange={(e) => {
                        const newSubs = [...subServices];
                        newSubs[idx].name = e.target.value;
                        setSubServices(newSubs);
                      }}
                      className="flex-1 bg-white"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={sub.price}
                      onChange={(e) => {
                        const newSubs = [...subServices];
                        newSubs[idx].price = e.target.value;
                        setSubServices(newSubs);
                      }}
                      className="w-24 bg-white"
                      min={0}
                    />
                    <button
                      type="button"
                      onClick={() => setSubServices(subServices.filter((_, i) => i !== idx))}
                      className="p-2 text-[#FF6014] hover:bg-[#FFF0EB] rounded-lg transition-all shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Description
            </label>
            <Textarea
              placeholder="Describe what this sub-service includes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/10 focus-visible:border-indigo-400/80 disabled:cursor-not-allowed disabled:opacity-50 transition-all w-full"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sub-Service Image
            </label>
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="w-14 h-14 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 relative group shadow-sm">
                {image ? (
                  <>
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-150 rounded-2xl"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                ) : (
                  <ImageIcon className="text-slate-400" size={20} />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <label className="cursor-pointer bg-brand-primary hover:bg-brand-dark text-white text-[10px] font-bold px-3 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-md shadow-brand-primary/10">
                  {isUploadingImage ? "Uploading..." : "Browse Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="hidden"
                  />
                </label>
                <p className="text-[9px] text-slate-400">Square size recommended.</p>
              </div>
            </div>
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
              disabled={isCreating || isUpdating || isUploadingImage}
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
