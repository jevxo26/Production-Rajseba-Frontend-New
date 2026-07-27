"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetAllBookingsQuery, useUpdateBookingStatusMutation } from "@/redux/features/admin/booking";

export function useEmployeeTasks() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";
  const authUser = useAppSelector((state) => state.auth.user);

  const { data: bookingsRes, isLoading } = useGetAllBookingsQuery();
  const [updateBookingStatus, { isLoading: isUpdating }] = useUpdateBookingStatusMutation();

  const allBookings = bookingsRes?.data || [];
  const myTasks = allBookings.filter((b: any) => {
    const isAssigned = b.employees?.some((emp: any) => emp.id === (authUser?.id || authUser?._id));
    return isAssigned && b.status !== "completed" && b.status !== "cancelled";
  });

  const handleMarkComplete = async (bookingId: number) => {
    try {
      await updateBookingStatus({ id: bookingId, status: "completed" }).unwrap();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return {
    role,
    myTasks,
    isLoading,
    isUpdating,
    handleMarkComplete,
  };
}
