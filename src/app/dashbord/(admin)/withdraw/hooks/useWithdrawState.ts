"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import {
  useGetAllWithdrawsQuery,
  useUpdateWithdrawStatusMutation,
  useDeleteWithdrawMutation,
  Withdraw,
} from "@/redux/features/shared/withdrawApi";

export function useWithdrawState() {
  const rawRole = useAppSelector((state) => state.auth.role) || "superadmin";
  const role = typeof rawRole === "string" ? rawRole.toLowerCase().replace(/\s+/g, "") : "client";

  const { data: apiWithdrawsRes, isLoading, refetch } = useGetAllWithdrawsQuery();
  const [updateStatusMut, { isLoading: isUpdating }] = useUpdateWithdrawStatusMutation();
  const [deleteMut] = useDeleteWithdrawMutation();

  const [selectedItem, setSelectedItem] = useState<Withdraw | null>(null);
  const [actionModal, setActionModal] = useState<{ type: "approved" | "rejected"; item: Withdraw } | null>(null);

  const withdraws: Withdraw[] = apiWithdrawsRes?.data || (Array.isArray(apiWithdrawsRes) ? apiWithdrawsRes : []);

  const handleUpdateStatus = async (
    id: number | string,
    status: "approved" | "rejected" | "pending",
    admin_note?: string
  ) => {
    try {
      await updateStatusMut({ id, data: { status, admin_note } }).unwrap();
      toast.success(`Request ${status} successfully!`);
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to update status");
    }
  };

  const handleDelete = async (item: Withdraw) => {
    try {
      await deleteMut(item.id).unwrap();
      toast.success("Withdraw request deleted!");
      setSelectedItem(null);
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to delete");
    }
  };

  // Summary stats
  const totalPending = withdraws.filter((w) => w.status === "pending").length;
  const totalApproved = withdraws.filter((w) => w.status === "approved").length;
  const totalAmount = withdraws
    .filter((w) => w.status === "approved")
    .reduce((sum, w) => sum + Number(w.amount || 0), 0);

  return {
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
  };
}
