"use client";

import React from "react";
import { ShieldAlert, Wallet, CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react";
import { CustomTable } from "@/components/ui/table";
import { Withdraw } from "@/redux/features/shared/withdrawApi";
import { useVendorWalletState } from "./hooks/useVendorWalletState";
import PaymentMethodsList from "./components/PaymentMethodsList";
import AddGatewayModal from "./components/AddGatewayModal";
import RequestWithdrawModal from "./components/RequestWithdrawModal";

export default function VendorWalletPage() {
  const state = useVendorWalletState();

  if (!state.isAuthenticated || (state.normalizedRole !== "vendor" && state.normalizedRole !== "agent")) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center animate-in fade-in duration-200">
        <div className="p-4 bg-[#FFF8F4] rounded-2xl text-[#FF6014] mb-4">
          <ShieldAlert size={48} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm">This panel is restricted to Vendors only.</p>
      </div>
    );
  }

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-amber-50 text-amber-700 border-amber-100",
      approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
      rejected: "bg-[#FFF8F4] text-[#E0530A] border-[#FFF0EB]",
    };
    const icons: Record<string, React.ReactNode> = {
      pending: <Clock size={11} />,
      approved: <CheckCircle2 size={11} />,
      rejected: <XCircle size={11} />,
    };
    const cls = map[status] || "bg-slate-100 text-slate-600 border-slate-200";
    return (
      <span className={`inline-flex items-center gap-1.5 font-bold text-xs px-2.5 py-1 rounded-xl border ${cls}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const columns = [
    {
      key: "id",
      header: "Request ID",
      render: (item: Withdraw) => <span className="text-slate-600 font-medium">#{item.id}</span>,
    },
    {
      key: "booking",
      header: "Booking ID",
      render: (item: Withdraw) => (
        <span className="text-slate-800 font-bold">{item.booking?.id ? `#${item.booking.id}` : "—"}</span>
      ),
    },
    {
      key: "service",
      header: "Service & Client",
      render: (item: Withdraw) => (
        <div className="flex flex-col">
          <span className="text-slate-800 font-bold text-sm">
            {item.booking?.service?.name || item.booking?.pkg?.name || "—"}
          </span>
          <span className="text-xs text-slate-500">{item.booking?.user?.name || "—"}</span>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (item: Withdraw) => (
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-xl border border-emerald-100/50">
          ৳{(item.amount || 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: Withdraw) => statusBadge(item.status),
    },
    {
      key: "admin_note",
      header: "Admin Note",
      render: (item: Withdraw) => (
        <span className="text-slate-500 text-xs truncate max-w-[150px] inline-block" title={item.admin_note}>
          {item.admin_note || "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (item: Withdraw) => (
        <span className="text-slate-400 text-xs font-medium">
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}
        </span>
      ),
    },
  ];

  const withdrawableColumns = [
    {
      key: "id",
      header: "Booking ID",
      render: (item: any) => <span className="text-slate-600 font-bold">#{item.id}</span>,
    },
    {
      key: "service",
      header: "Service & Client",
      render: (item: any) => (
        <div className="flex flex-col">
          <span className="text-slate-800 font-bold text-sm">{item.service?.name || item.pkg?.name || "Service"}</span>
          <span className="text-xs text-slate-500">{item.user?.name || "Client"}</span>
        </div>
      ),
    },
    {
      key: "total_price",
      header: "Total Price",
      render: (item: any) => <span className="text-slate-600">৳{Number(item.total_price || 0).toLocaleString()}</span>,
    },
    {
      key: "earnings",
      header: "Your Earnings",
      render: (item: any) => {
        let amount = 0;
        if (state.normalizedRole === "agent") {
          const agentCommission = Number(item.service?.agent_commission_percentage || 0);
          amount = Number(item.total_price || 0) * (agentCommission / 100);
        } else {
          const platformCut = state.commissionPct;
          const vendorSharePct = 100 - Number(platformCut);
          amount = Number(item.total_price || 0) * (vendorSharePct / 100);
        }
        return <span className="text-emerald-600 font-bold">৳{amount.toLocaleString()}</span>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: any) => (
        <button
          onClick={() => state.handleRequestWithdrawClick(item.id)}
          disabled={state.isRequesting}
          className="bg-brand-primary hover:bg-brand-dark text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-sm shadow-[#FF6014]/20 disabled:opacity-50"
        >
          {state.isRequesting ? "Wait..." : "Request Commission"}
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Wallet & Earnings</h1>
            <p className="text-xs text-slate-400 mt-0.5">Manage your commissions and withdrawal requests.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => state.refetchWithdraws()}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-4 py-2.5 rounded-xl text-sm transition-all border border-slate-200"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 rounded-2xl shadow-premium p-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet size={80} />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider relative z-10">
            Current Wallet Balance
          </p>
          <p className="text-4xl font-black mt-2 relative z-10">৳{state.walletBalance.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Commission Rate</p>
          <p className="text-3xl font-bold text-[#FF6014] mt-1">{state.commissionPct}%</p>
          <p className="text-xs text-slate-400 mt-1">Per completed booking</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Withdrawals</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">৳{state.totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Approved (Lifetime)</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">৳{state.totalWithdrawn.toLocaleString()}</p>
        </div>
      </div>

      {/* Payment Methods Section */}
      <PaymentMethodsList
        gateways={state.gateways}
        isGatewaysLoading={state.isGatewaysLoading}
        setIsAddGatewayModalOpen={state.setIsAddGatewayModalOpen}
        handleDeleteGateway={state.handleDeleteGateway}
      />

      {/* Withdrawable Bookings Table */}
      <div className="pt-4">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Earnings Ready to Withdraw</h2>
        {state.isBookingsLoading ? (
          <div className="flex items-center justify-center py-10 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <div className="w-8 h-8 border-4 border-[#FF6014] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : state.withdrawableBookings.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-10 text-center shadow-sm">
            <h3 className="text-base font-bold text-slate-800">No Earnings Available</h3>
            <p className="text-sm text-slate-400 mt-1">Complete more bookings to earn commissions.</p>
          </div>
        ) : (
          <CustomTable
            columns={withdrawableColumns}
            data={state.withdrawableBookings}
            searchKey="id"
            filterKey=""
            filterOptions={[]}
            pageSize={5}
          />
        )}
      </div>

      {/* Withdrawal Requests Table */}
      <div className="pt-4 border-t border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Withdrawal History</h2>
        {state.isWithdrawsLoading ? (
          <div className="flex items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <div className="w-8 h-8 border-4 border-[#FF6014] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : state.withdraws.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100/50">
              <Wallet size={28} />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Withdraw Requests</h3>
            <p className="text-sm text-slate-400 mt-1">You haven't requested any commissions yet.</p>
          </div>
        ) : (
          <CustomTable
            columns={columns}
            data={state.withdraws}
            searchKey="status"
            filterKey="status"
            filterPlaceholder="All Statuses"
            filterOptions={[
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ]}
            pageSize={10}
          />
        )}
      </div>

      {/* Add Gateway Modal */}
      <AddGatewayModal
        isAddGatewayModalOpen={state.isAddGatewayModalOpen}
        setIsAddGatewayModalOpen={state.setIsAddGatewayModalOpen}
        newGatewayType={state.newGatewayType}
        setNewGatewayType={state.setNewGatewayType}
        newGatewayInfo={state.newGatewayInfo}
        setNewGatewayInfo={state.setNewGatewayInfo}
        handleAddGateway={state.handleAddGateway}
        isCreatingGateway={state.isCreatingGateway}
      />

      {/* Request Withdraw Modal */}
      <RequestWithdrawModal
        isWithdrawModalOpen={state.isWithdrawModalOpen}
        setIsWithdrawModalOpen={state.setIsWithdrawModalOpen}
        gateways={state.gateways}
        selectedGatewayId={state.selectedGatewayId}
        setSelectedGatewayId={state.setSelectedGatewayId}
        handleRequestWithdrawConfirm={state.handleRequestWithdrawConfirm}
        isRequesting={state.isRequesting}
      />
    </div>
  );
}
