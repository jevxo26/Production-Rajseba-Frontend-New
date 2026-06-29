"use client";

import React from "react";
import { Zap, Loader2 } from "lucide-react";
import { CustomSelect } from "@/components/ui/select";
import { CustomCalendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import AccessDenied from "../../(client)/components/AccessDenied";
import { useQuickBooking } from "./hooks/useQuickBooking";

export default function AgentQuickBookingPage() {
  const state = useQuickBooking();

  if (state.role !== "agent") {
    return <AccessDenied roleRequired="Agent" />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Quick Booking Console</h1>
            <p className="text-xs text-slate-400 mt-0.5">Book services instantly on behalf of your leads/clients.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <form onSubmit={state.handleBookingSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Service & Schedule */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-50 pb-2">1. Service & Schedule</h3>

              <CustomSelect
                label="Service Category"
                options={state.loadingServices ? [{ value: "", label: "Loading..." }] : state.serviceOptions}
                value={state.selectedServiceId}
                onChange={(val) => {
                  state.setSelectedServiceId(val);
                  state.setSelectedNestedServiceId("");
                }}
                placeholder="Select a service"
              />

              {state.selectedServiceId && state.nestedOptions.length > 0 && (
                <CustomSelect
                  label="Sub-Service"
                  options={state.nestedOptions}
                  value={state.selectedNestedServiceId}
                  onChange={(val) => state.setSelectedNestedServiceId(val)}
                  placeholder="Select sub-service"
                />
              )}

              <CustomSelect
                label="Preferred Expert Provider (Vendor)"
                options={state.vendorOptions}
                value={state.selectedVendorId}
                onChange={(val) => state.setSelectedVendorId(val)}
                placeholder="Select vendor"
              />

              <CustomCalendar
                label="Schedule Date"
                value={state.scheduleDate ? dayjs(state.scheduleDate) : null}
                onChange={(date) => state.setScheduleDate(date ? date.format("YYYY-MM-DD") : "")}
                placeholder="Select schedule date"
              />
            </div>

            {/* Address & Notes */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-50 pb-2">2. Location & Notes</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Service Address *</label>
                <textarea
                  rows={4}
                  placeholder="Street address, house number, area..."
                  value={state.clientAddress}
                  onChange={(e) => state.setClientAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all font-semibold resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Notes (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any special instructions..."
                  value={state.notes}
                  onChange={(e) => state.setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all font-semibold resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-50">
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-[#FF6014] hover:bg-[#E0530A] disabled:opacity-70 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md shadow-[#FF6014]/10 transition-all active:scale-[0.98] flex items-center gap-2"
            >
              {state.submitting ? <Loader2 size={16} className="animate-spin" /> : null}
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
