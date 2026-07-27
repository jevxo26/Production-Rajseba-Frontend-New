"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetAllBookingsQuery } from "@/redux/features/admin/booking";

export function useEmployeeHistory() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";
  const authUser = useAppSelector((state) => state.auth.user);

  const { data: bookingsRes, isLoading } = useGetAllBookingsQuery();

  const allBookings = bookingsRes?.data || [];
  const myCompletedTasks = allBookings.filter((b: any) => {
    const isAssigned = b.employees?.some((emp: any) => emp.id === (authUser?.id || authUser?._id));
    return isAssigned && b.status === "completed";
  });

  return {
    role,
    myCompletedTasks,
    isLoading,
  };
}
