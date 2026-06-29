"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetAllWithdrawsQuery, useRequestWithdrawMutation } from "@/redux/features/shared/withdrawApi";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

export function useAgentCommissions() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";
  const authUser = useAppSelector((state) => state.auth.user);

  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transferMethod, setTransferMethod] = useState("bKash Mobile Wallet");

  // Get current user's wallet balance
  const { data: profileData } = useGetUserProfileQuery();
  const walletBalance = (profileData as any)?.data?.wallet_balance ?? (profileData as any)?.wallet_balance ?? 0;

  // Vendor withdrawals — agent uses wallet_balance, so use userId as vendorId
  const userId = authUser?.id || authUser?._id;
  const { data: withdrawsRes, isLoading: loadingWithdraws } = useGetAllWithdrawsQuery();
  const [requestWithdraw, { isLoading: requesting }] = useRequestWithdrawMutation();

  // Filter my withdrawals
  const allWithdraws = withdrawsRes?.data || [];
  const myWithdraws = allWithdraws.filter((w: any) =>
    w.vendor?.id === userId || w.vendor?.id === Number(userId)
  );

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    if (!amount || amount <= 0 || amount > Number(walletBalance)) {
      toast.error("Please enter a valid amount within your withdrawable balance.");
      return;
    }

    try {
      await requestWithdraw({ amount }).unwrap();
      toast.success("Withdrawal request submitted successfully!");
      setWithdrawAmount("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit withdrawal request.");
    }
  };

  return {
    role,
    withdrawAmount,
    setWithdrawAmount,
    transferMethod,
    setTransferMethod,
    walletBalance,
    myWithdraws,
    loadingWithdraws,
    requesting,
    handleWithdraw,
  };
}
