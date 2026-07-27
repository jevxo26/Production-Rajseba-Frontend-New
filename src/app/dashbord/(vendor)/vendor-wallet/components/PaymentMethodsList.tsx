"use client";

import React from "react";
import { Plus, CreditCard, Building, Trash2 } from "lucide-react";
import { Getway } from "@/redux/features/shared/getwayApi";

interface PaymentMethodsListProps {
  gateways: Getway[];
  isGatewaysLoading: boolean;
  setIsAddGatewayModalOpen: (open: boolean) => void;
  handleDeleteGateway: (id: number) => void;
}

export default function PaymentMethodsList({
  gateways,
  isGatewaysLoading,
  setIsAddGatewayModalOpen,
  handleDeleteGateway,
}: PaymentMethodsListProps) {
  return (
    <div className="pt-4 border-t border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Payment Methods</h2>
        <button
          onClick={() => setIsAddGatewayModalOpen(true)}
          className="flex items-center gap-1.5 bg-brand-primary text-white font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-brand-dark transition-all shadow-sm"
        >
          <Plus size={14} /> Add Method
        </button>
      </div>

      {isGatewaysLoading ? (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : gateways.length === 0 ? (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
          <CreditCard size={24} className="mx-auto text-slate-400 mb-2" />
          <p className="text-sm text-slate-500">No payment methods added. Please add one to withdraw commissions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gateways.map((g) => (
            <div
              key={g.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                  {g.getway_type === "bank" ? (
                    <Building size={18} className="text-slate-600" />
                  ) : (
                    <CreditCard size={18} className="text-slate-600" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm uppercase">{g.getway_type}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5 truncate max-w-[120px]">
                    {g.info?.details || g.info?.accountNumber || JSON.stringify(g.info)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteGateway(g.id)}
                className="text-slate-400 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
