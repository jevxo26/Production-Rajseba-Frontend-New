"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload";
import {
  useGetAllNestedServicesQuery,
  useCreateNestedServiceMutation,
  useUpdateNestedServiceMutation,
  useDeleteNestedServiceMutation,
  NestedService,
} from "@/redux/features/admin/service";
import { useGetAllServicesQuery, Service } from "@/redux/features/admin/service";

export function useNestedServiceState() {
  const rawRole = useAppSelector((state) => state.auth.role) || "superadmin";
  const role = typeof rawRole === "string" ? rawRole.toLowerCase().replace(/\s+/g, "") : "client";
  const currentUser = useAppSelector((state) => state.auth.user);
  const currentUserId = currentUser?.id || currentUser?._id || "";

  // APIs
  const {
    data: apiNestedRes,
    isLoading: isNestedLoading,
    refetch: refetchNested,
  } = useGetAllNestedServicesQuery();
  const { data: apiServicesRes } = useGetAllServicesQuery();

  const [deleteMut] = useDeleteNestedServiceMutation();

  const [nestedServices, setNestedServices] = useState<NestedService[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<NestedService | null>(null);

  // All services for the dropdown
  const allServices: Service[] = apiServicesRes?.data || (Array.isArray(apiServicesRes) ? apiServicesRes : []);

  // Filter nested services for vendor
  useEffect(() => {
    const all: NestedService[] = apiNestedRes?.data || (Array.isArray(apiNestedRes) ? apiNestedRes : []);

    if (role === "vendor") {
      const vendorServiceIds = allServices
        .filter((s) => String(s.vendor?.id || s.vendor_id) === String(currentUserId))
        .map((s) => s.id);
      setNestedServices(all.filter((ns) => ns.service && vendorServiceIds.includes(ns.service.id)));
    } else {
      setNestedServices(all);
    }
  }, [apiNestedRes, allServices, role, currentUserId]);

  const openDeleteModal = (item: NestedService) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMut(itemToDelete.id).unwrap();
      toast.success("Nested service deleted successfully!");
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      refetchNested();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to delete nested service");
    }
  };

  return {
    role,
    isNestedLoading,
    nestedServices,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    itemToDelete,
    setItemToDelete,
    openDeleteModal,
    handleDelete,
  };
}
