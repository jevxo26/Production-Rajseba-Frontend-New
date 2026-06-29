"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetAllBookingsQuery } from "@/redux/features/admin/booking";

export function useAgentOrders() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";
  const { data: bookingsRes, isLoading } = useGetAllBookingsQuery();
  const allBookings = (bookingsRes?.data || []) as any[];

  return {
    role,
    isLoading,
    allBookings,
  };
}
