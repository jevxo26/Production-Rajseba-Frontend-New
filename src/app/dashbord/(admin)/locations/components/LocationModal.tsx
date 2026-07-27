"use client";

import React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/select";

interface LocationModalProps {
  editingItem: any;
  activeTab: "divisions" | "districts" | "areas";
  setIsModalOpen: (val: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (val: string) => void;
  banglaName: string;
  setBanglaName: (val: string) => void;
  code: string;
  setCode: (val: string) => void;
  latitude: string;
  setLatitude: (val: string) => void;
  longitude: string;
  setLongitude: (val: string) => void;
  parentId: string;
  setParentId: (val: string) => void;
  divOptions: any[];
  distOptions: any[];
}

export default function LocationModal({
  editingItem,
  activeTab,
  setIsModalOpen,
  handleSubmit,
  name,
  setName,
  banglaName,
  setBanglaName,
  code,
  setCode,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  parentId,
  setParentId,
  divOptions,
  distOptions,
}: LocationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {editingItem ? "Edit" : "Create"} {activeTab.slice(0, -1)}
          </h2>
          <button onClick={() => setIsModalOpen(false)}>
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500">Name (EN) *</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500">Name (BN)</label>
              <Input value={banglaName} onChange={(e) => setBanglaName(e.target.value)} />
            </div>
          </div>

          {activeTab === "districts" && (
            <div>
              <label className="text-xs font-bold text-slate-500">Division *</label>
              <CustomSelect options={divOptions} value={parentId} onChange={setParentId} />
            </div>
          )}
          {activeTab === "areas" && (
            <div>
              <label className="text-xs font-bold text-slate-500">District *</label>
              <CustomSelect options={distOptions} value={parentId} onChange={setParentId} />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-500">Code</label>
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500">Latitude</label>
              <Input value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500">Longitude</label>
              <Input value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 font-bold text-slate-500"
            >
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 bg-brand-primary text-white font-bold rounded-xl">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
