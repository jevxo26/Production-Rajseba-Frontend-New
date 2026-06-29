"use client";

import React from "react";
import { XCircle, Calendar, Briefcase, Package as PkgIcon } from "lucide-react";
import { CustomSelect } from "@/components/ui/select";

interface BookingModalProps {
  setIsAddModalOpen: (val: boolean) => void;
  handleCreateSubmit: (e: React.FormEvent) => void;
  isCreating: boolean;
  newBooking: any;
  setNewBooking: (val: any) => void;
  clients: any[];
  vendors: any[];
  roleName: string;
  selectedVendorServices: any[];
  selectedService: any;
  selectedNestedService: any;
  estimatedTotalPrice: number;
}

export default function BookingModal({
  setIsAddModalOpen,
  handleCreateSubmit,
  isCreating,
  newBooking,
  setNewBooking,
  clients,
  vendors,
  roleName,
  selectedVendorServices,
  selectedService,
  selectedNestedService,
  estimatedTotalPrice,
}: BookingModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Calendar size={20} className="text-brand-primary" />
            Create New Booking
          </h2>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors"
          >
            <XCircle size={20} />
          </button>
        </div>

        <form onSubmit={handleCreateSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Client *</label>
              <CustomSelect
                options={clients.map((c: any) => ({ value: String(c.id), label: `${c.name} (${c.email})` }))}
                value={newBooking.user_id}
                onChange={(val) => setNewBooking({ ...newBooking, user_id: val })}
                placeholder="-- Choose a Client --"
              />
            </div>

            {roleName !== "vendor" && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Vendor *</label>
                <CustomSelect
                  options={vendors.map((v: any) => ({ value: String(v.id), label: v.profile?.companyName || v.name }))}
                  value={newBooking.vendor_id}
                  onChange={(val) =>
                    setNewBooking({
                      ...newBooking,
                      vendor_id: val,
                      service_id: "",
                      sub_service_ids: [],
                      package_id: "",
                    })
                  }
                  placeholder="-- Choose a Vendor --"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Booking Date *</label>
              <input
                type="date"
                required
                value={newBooking.date}
                onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-brand-primary focus:border-brand-primary block p-3 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Booking Time</label>
              <input
                type="time"
                value={newBooking.time}
                onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-brand-primary focus:border-brand-primary block p-3 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location *</label>
            <input
              type="text"
              required
              placeholder="E.g., 123 Main St, City, State"
              value={newBooking.location}
              onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-brand-primary focus:border-brand-primary block p-3 outline-none transition-all"
            />
          </div>

          {newBooking.vendor_id && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-700 text-sm mb-2">Service Details (Optional)</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Service</label>
                  <CustomSelect
                    options={selectedVendorServices.map((s: any) => ({ value: String(s.id), label: s.name }))}
                    value={newBooking.service_id}
                    onChange={(val) =>
                      setNewBooking({
                        ...newBooking,
                        service_id: val,
                        nested_service_id: "",
                        sub_service_ids: [],
                        package_id: "",
                      })
                    }
                    placeholder="-- Choose a Service --"
                  />
                </div>

                {newBooking.service_id && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Nested Service</label>
                    <CustomSelect
                      options={selectedService?.nestedServices?.map((ns: any) => ({ value: String(ns.id), label: ns.name })) || []}
                      value={newBooking.nested_service_id}
                      onChange={(val) => setNewBooking({ ...newBooking, nested_service_id: val, sub_service_ids: [] })}
                      placeholder="-- Choose a Nested Service --"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <input
                      type="radio"
                      name="selection_type"
                      value="nested"
                      checked={newBooking.selection_type === "nested"}
                      onChange={(e) => setNewBooking({ ...newBooking, selection_type: e.target.value, package_id: "" })}
                    />
                    Sub-Services Options (Multi-select)
                  </label>
                  <CustomSelect
                    isMulti
                    disabled={newBooking.selection_type !== "nested" || !newBooking.nested_service_id}
                    options={
                      selectedNestedService?.subServices?.map((ss: any) => ({
                        value: String(ss.id),
                        label: `${ss.name} - ৳${ss.price}`,
                      })) || []
                    }
                    value={newBooking.sub_service_ids}
                    onChange={(val) => setNewBooking({ ...newBooking, sub_service_ids: val })}
                    placeholder="-- Choose Sub-Services --"
                  />
                  {!newBooking.nested_service_id && newBooking.selection_type === "nested" && (
                    <p className="text-[10px] text-amber-600 mt-1">Please select a Nested Service first.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <input
                      type="radio"
                      name="selection_type"
                      value="package"
                      checked={newBooking.selection_type === "package"}
                      onChange={(e) => setNewBooking({ ...newBooking, selection_type: e.target.value, sub_service_ids: [] })}
                    />
                    Service Package
                  </label>
                  <CustomSelect
                    disabled={newBooking.selection_type !== "package"}
                    options={
                      selectedService
                        ? (selectedService.packages || []).map((p: any) => ({
                            value: String(p.id),
                            label: `${p.name} - ৳${p.price}`,
                          }))
                        : selectedVendorServices
                            .flatMap((s: any) => s.packages || [])
                            .map((p: any) => ({ value: String(p.id), label: `${p.name} - ৳${p.price}` }))
                    }
                    value={newBooking.package_id}
                    onChange={(val) => setNewBooking({ ...newBooking, package_id: val })}
                    placeholder="-- Choose Package --"
                  />
                  {newBooking.selection_type === "package" && newBooking.package_id && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Package Quantity</label>
                      <input
                        type="number"
                        min={1}
                        value={newBooking.quantity}
                        onChange={(e) =>
                          setNewBooking({
                            ...newBooking,
                            quantity: Math.max(1, Number(e.target.value) || 1),
                          })
                        }
                        className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-brand-primary focus:border-brand-primary block p-3 outline-none transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-200 flex items-center gap-2">
                  <span className="font-bold text-sm">Estimated Total:</span>
                  <span className="font-black text-lg">৳{estimatedTotalPrice}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Additional Notes</label>
            <textarea
              rows={3}
              placeholder="Any special instructions or notes for the vendor..."
              value={newBooking.notes}
              onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-brand-primary focus:border-brand-primary block p-3 outline-none transition-all resize-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-6 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-dark rounded-xl transition-colors shadow-md disabled:opacity-70 flex items-center gap-2"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating...
                </>
              ) : (
                "Create Booking"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
