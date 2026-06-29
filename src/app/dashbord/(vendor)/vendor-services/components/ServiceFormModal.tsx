"use client";

import React from "react";
import { Sparkles, X, PlusCircle, Trash2, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomSelect } from "@/components/ui/select";
import { Service } from "@/redux/features/admin/service";

interface ServiceFormModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  editingItem: Service | null;
  name: string;
  setName: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  subtitle: string;
  setSubtitle: (val: string) => void;
  categoryId: string;
  setCategoryId: (val: string) => void;
  categoryOptions: any[];
  employeeIds: number[];
  setEmployeeIds: (ids: number[]) => void;
  employeeOptions: any[];
  description: string;
  setDescription: (val: string) => void;
  overview: string;
  setOverview: (val: string) => void;
  details: string;
  setDetails: (val: string) => void;
  faq: { question: string; answer: string }[];
  setFaq: (faqs: { question: string; answer: string }[]) => void;
  image: string;
  setImage: (val: string) => void;
  isUploadingImage: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isCreating: boolean;
  isUpdating: boolean;
}

export default function ServiceFormModal({
  isModalOpen,
  setIsModalOpen,
  editingItem,
  name,
  setName,
  slug,
  setSlug,
  subtitle,
  setSubtitle,
  categoryId,
  setCategoryId,
  categoryOptions,
  employeeIds,
  setEmployeeIds,
  employeeOptions,
  description,
  setDescription,
  overview,
  setOverview,
  details,
  setDetails,
  faq,
  setFaq,
  image,
  setImage,
  isUploadingImage,
  handleImageUpload,
  handleSubmit,
  isCreating,
  isUpdating,
}: ServiceFormModalProps) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="text-[#FF6014]" size={20} />
            {editingItem ? "Edit Service" : "Add New Service"}
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Service Name *
            </label>
            <Input placeholder="e.g. AC Repairing" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Slug *</label>
            <Input placeholder="e.g. ac-repairing" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Subtitle</label>
            <Input placeholder="Short tagline" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Category</label>
            <CustomSelect
              options={categoryOptions}
              value={categoryId}
              onChange={(val) => {
                setCategoryId(val);
                setEmployeeIds([]); // Clear employees on category change
              }}
            />
          </div>
          {categoryId !== "NONE" ? (
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Employees
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border border-slate-200 rounded-xl bg-slate-50">
                {employeeOptions.length > 0 ? (
                  employeeOptions.map((emp: any) => (
                    <label key={emp.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/30"
                        checked={employeeIds.includes(emp.id)}
                        onChange={(e) => {
                          if (e.target.checked) setEmployeeIds([...employeeIds, emp.id]);
                          else setEmployeeIds(employeeIds.filter((id) => id !== emp.id));
                        }}
                      />
                      <span className="text-sm text-slate-700">{emp.name}</span>
                    </label>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 col-span-2">
                    No employees found for this category. Please add employees to your account first.
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-center">
              <p className="text-xs font-medium text-slate-500">Please select a Category to assign employees.</p>
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Description
            </label>
            <Textarea
              placeholder="Describe this service..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6014]/20/10 focus-visible:border-rose-400/80 transition-all w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Overview</label>
            <Textarea
              placeholder="Service overview..."
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={2}
              className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6014]/20/10 focus-visible:border-rose-400/80 transition-all w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Details</label>
            <Textarea
              placeholder="Detailed information..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              className="rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6014]/20/10 focus-visible:border-rose-400/80 transition-all w-full"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">FAQs</label>
              <button
                type="button"
                onClick={() => setFaq([...faq, { question: "", answer: "" }])}
                className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1"
              >
                <PlusCircle size={12} /> Add FAQ
              </button>
            </div>
            <div className="space-y-3">
              {faq.map((f, i) => (
                <div key={i} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 relative">
                  <button
                    type="button"
                    onClick={() => setFaq(faq.filter((_, idx) => idx !== i))}
                    className="absolute -top-2 -right-2 bg-[#FFF0EB] text-[#FF6014] hover:bg-[#FF6014] hover:text-white rounded-full p-1 transition-colors"
                  >
                    <X size={12} />
                  </button>
                  <Input
                    placeholder="Question"
                    value={f.question}
                    onChange={(e) => {
                      const newFaq = [...faq];
                      newFaq[i].question = e.target.value;
                      setFaq(newFaq);
                    }}
                  />
                  <Textarea
                    placeholder="Answer"
                    rows={2}
                    value={f.answer}
                    onChange={(e) => {
                      const newFaq = [...faq];
                      newFaq[i].answer = e.target.value;
                      setFaq(newFaq);
                    }}
                    className="text-sm rounded-xl"
                  />
                </div>
              ))}
              {faq.length === 0 && <p className="text-xs text-slate-400 italic">No FAQs added yet.</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Service Image</label>
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
              <label className="cursor-pointer bg-brand-primary hover:bg-brand-dark text-white text-[10px] font-bold px-3 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all active:scale-[0.98]">
                {isUploadingImage ? "Uploading..." : "Browse Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>
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
              {editingItem ? "Update Service" : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
