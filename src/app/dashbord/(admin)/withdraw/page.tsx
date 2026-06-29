"use client";

import { ShieldAlert, Wallet, RefreshCw } from "lucide-react";
import WithdrawDetailModal from "./components/WithdrawDetailModal";
import WithdrawActionModal from "./components/WithdrawActionModal";
import WithdrawTable from "./components/WithdrawTable";
import { useWithdrawState } from "./hooks/useWithdrawState";

export default function AdminWithdrawPage() {
  const {
    role,
    isLoading,
    refetch,
    withdraws,
    selectedItem,
    setSelectedItem,
    actionModal,
    setActionModal,
    handleUpdateStatus,
    handleDelete,
    totalPending,
    totalApproved,
    totalAmount,
    isUpdating,
  } = useWithdrawState();

  if (role !== "superadmin") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center animate-in fade-in duration-200">
        <div className="p-4 bg-[#FFF8F4] rounded-2xl text-[#FF6014] mb-4">
          <ShieldAlert size={48} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm">This panel is restricted to Administrators only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Withdraw Requests</h1>
            <p className="text-xs text-slate-400 mt-0.5">Review and manage vendor payout requests.</p>
          </div>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-4 py-2.5 rounded-xl text-sm transition-all border border-slate-200"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">{totalPending}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approved</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">{totalApproved}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Paid Out</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">৳{totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm">
          <div className="w-8 h-8 border-4 border-[#FF6014] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : withdraws.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100/50">
            <Wallet size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Withdraw Requests</h3>
          <p className="text-sm text-slate-400 mt-1">No vendors have made withdrawal requests yet.</p>
        </div>
      ) : (
        <WithdrawTable
          withdraws={withdraws}
          setSelectedItem={setSelectedItem}
          setActionModal={setActionModal}
        />
      )}

      {/* Detail Modal */}
      <WithdrawDetailModal
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        isUpdating={isUpdating}
        handleUpdateStatus={handleUpdateStatus}
        handleDelete={handleDelete}
      />

      {/* Action Modal (Approve/Reject from Table) */}
      <WithdrawActionModal
        actionModal={actionModal}
        setActionModal={setActionModal}
        isUpdating={isUpdating}
        handleUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
