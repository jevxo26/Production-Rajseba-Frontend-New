"use client";

import { useRole } from "@/context/RoleContext";
import { ShieldAlert, DollarSign, Wallet, ArrowDownRight, Check, Send } from "lucide-react";
import { useState } from "react";
import { CustomTable } from "@/components/ui/table";
import { CustomSelect } from "@/components/ui/select";

interface PayoutLog {
  id: string;
  amount: string;
  method: string;
  account: string;
  status: "Completed" | "Pending";
  date: string;
}

export default function CommissionPage() {
  const { role } = useRole();
  const [payoutBalance, setPayoutBalance] = useState(3200);
  const [success, setSuccess] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferMethod, setTransferMethod] = useState("bKash Mobile Wallet");

  const logs: PayoutLog[] = [
    { id: "PAY-104", amount: "৳5,400", method: "bKash Transfer", account: "01712 ****78", status: "Completed", date: "June 01, 2026" },
    { id: "PAY-084", amount: "৳3,000", method: "bKash Transfer", account: "01712 ****78", status: "Completed", date: "May 15, 2026" },
  ];

  const columns = [
    {
      key: "id",
      header: "Payout ID",
      render: (log: PayoutLog) => (
        <span className="font-mono text-slate-500 font-bold text-xs">{log.id}</span>
      )
    },
    {
      key: "amount",
      header: "Amount",
      render: (log: PayoutLog) => (
        <span className="font-bold text-slate-800">{log.amount}</span>
      )
    },
    {
      key: "method",
      header: "Method"
    },
    {
      key: "account",
      header: "Account Detail"
    },
    {
      key: "status",
      header: "Status",
      render: (log: PayoutLog) => (
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
          {log.status}
        </span>
      )
    },
    {
      key: "date",
      header: "Date Completed"
    }
  ];

  const transferOptions = [
    { value: "bKash Mobile Wallet", label: "bKash Mobile Wallet", desc: "Instant mobile bank transfer" },
    { value: "Nagad Mobile Wallet", label: "Nagad Mobile Wallet", desc: "Instant mobile bank transfer" },
    { value: "Bank Cashout", label: "Bank Cashout", desc: "2-3 business days transfer" },
  ];

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) return;
    const amountNum = Number(withdrawAmount);
    if (amountNum > payoutBalance) {
      alert("Insufficient balance!");
      return;
    }
    setPayoutBalance(payoutBalance - amountNum);
    setSuccess(true);
    setWithdrawAmount("");
    setTimeout(() => setSuccess(false), 3000);
  };

  if (role !== "agent") {
    return <AccessDenied roleRequired="Agent" />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Commission Tracking</h1>
          <p className="text-slate-500 mt-1">Track your agent bookings earnings and request payouts to your personal account.</p>
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
            <Check size={16} /> Withdrawal request submitted!
          </div>
        )}
      </div>

      {/* Stats and Withdraw Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Earnings */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-600/15 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full" />
          <span className="text-sm font-semibold tracking-wider text-emerald-100 uppercase">Pending Withdraw Payout</span>
          <h2 className="text-4xl font-black mt-2">৳{payoutBalance.toLocaleString()}</h2>

          <div className="flex gap-8 mt-8 text-xs font-semibold text-emerald-100">
            <div>
              <span className="opacity-75">Life-Time Earnings</span>
              <span className="text-sm text-white mt-1 block font-bold">৳14,500</span>
            </div>
            <div>
              <span className="opacity-75">Commission Tier</span>
              <span className="text-sm text-white mt-1 block bg-white/20 px-2 py-0.5 rounded-lg w-max font-bold">Silver 15%</span>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Withdraw form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Submit Withdrawal Request</h3>

          <form onSubmit={handleWithdrawSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomSelect
                label="Transfer Method"
                options={transferOptions}
                value={transferMethod}
                onChange={setTransferMethod}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Wallet / Account Number</label>
                <input
                  type="text"
                  defaultValue="01712345678"
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-semibold cursor-not-allowed"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Withdrawal Amount (৳)</label>
                <input
                  type="number"
                  placeholder="Enter amount to withdraw"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-semibold"
                  max={payoutBalance}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
              >
                <Send size={16} /> Request Payout
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Withdraw Logs */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Payout History</h3>
        <CustomTable
          columns={columns}
          data={logs}
          searchKey="id"
          searchPlaceholder="Search payout logs by ID..."
          pageSize={5}
        />
      </div>
    </div>
  );
}

function AccessDenied({ roleRequired }: { roleRequired: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center animate-in fade-in duration-200">
      <div className="p-4 bg-rose-50 rounded-2xl text-rose-500 mb-4">
        <ShieldAlert size={48} />
      </div>
      <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">
        This subpage is only accessible to users with the <strong className="text-slate-800">{roleRequired}</strong> role.
        Please toggle your preview role using the selector at the top.
      </p>
    </div>
  );
}
