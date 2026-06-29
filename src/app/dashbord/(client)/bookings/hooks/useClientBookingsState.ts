"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useGetAllBookingsQuery } from "@/redux/features/admin/booking";

export type BookingStatus = "All" | "Pending" | "Assigned" | "On The Way" | "Completed" | "Cancelled";

export const STATUS_MAP: Record<string, BookingStatus> = {
  pending: "Pending",
  assigned: "Assigned",
  on_the_way: "On The Way",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const STATUS_TEXT: Record<string, string> = {
  pending: "Pending",
  assigned: "Assigned",
  on_the_way: "On the way",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function useClientBookingsState() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";
  const authUser = useAppSelector((state) => state.auth.user);
  const [filter, setFilter] = useState<BookingStatus>("All");

  const { data: bookingsRes, isLoading } = useGetAllBookingsQuery();

  const allBookings = bookingsRes?.data || [];
  const myBookings = allBookings.filter((b: any) => {
    const userId = authUser?.id || authUser?._id;
    return b.user?.id === userId || b.user?.id === Number(userId);
  });

  const filteredBookings = myBookings.filter((b: any) => {
    if (filter === "All") return true;
    const mappedStatus = STATUS_MAP[b.status] || "Pending";
    return mappedStatus === filter;
  });

  return {
    role,
    filter,
    setFilter,
    isLoading,
    filteredBookings,
  };
}
