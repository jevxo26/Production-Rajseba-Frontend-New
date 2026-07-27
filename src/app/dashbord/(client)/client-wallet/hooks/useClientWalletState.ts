"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import { useGetAllBookingsQuery } from "@/redux/features/admin/booking";

export function useClientWalletState() {
  const rawRole = useAppSelector((state) => state.auth.role);
  const role = typeof rawRole === "string" ? rawRole.toLowerCase().replace(/\s+/g, "") : "client";
  const [copied, setCopied] = useState(false);
  const [autoRecharge, setAutoRecharge] = useState(true);

  const { data: profileData, isLoading: isProfileLoading } = useGetUserProfileQuery();
  const { data: bookingsRes, isLoading: isBookingsLoading } = useGetAllBookingsQuery(undefined);

  const myCompletedBookings =
    bookingsRes?.data?.filter(
      (b: any) =>
        b.status === "completed" &&
        (b.user?.id === profileData?.data?.id || b.user?._id === profileData?.data?._id)
    ) || [];

  const totalExpense = myCompletedBookings.reduce((sum: number, b: any) => sum + Number(b.total_price || 0), 0);
  const walletBalance = (profileData as any)?.data?.wallet_balance ?? (profileData as any)?.wallet_balance ?? 0;

  const handleCopyCode = () => {
    navigator.clipboard.writeText("RAJSEBA500");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    role,
    copied,
    autoRecharge,
    setAutoRecharge,
    profileData,
    myCompletedBookings,
    totalExpense,
    walletBalance,
    handleCopyCode,
    isLoading: isProfileLoading || isBookingsLoading,
  };
}
