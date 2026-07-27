"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import {
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  Service,
} from "@/redux/features/admin/service";

export function useServiceState() {
  const rawRole = useAppSelector((state) => state.auth.role) || "superadmin";
  const role = typeof rawRole === "string" ? rawRole.toLowerCase().replace(/\s+/g, "") : "client";

  const {
    data: apiServicesRes,
    isLoading: isServicesLoading,
    refetch: refetchServices,
  } = useGetAllServicesQuery();

  const [deleteMut] = useDeleteServiceMutation();

  const [services, setServices] = useState<Service[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Service | null>(null);

  useEffect(() => {
    const all: Service[] = apiServicesRes?.data || (Array.isArray(apiServicesRes) ? apiServicesRes : []);
    setServices(all);
  }, [apiServicesRes]);

  const openDeleteModal = (item: Service) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMut(itemToDelete.id!).unwrap();
      toast.success("Service deleted successfully!");
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      refetchServices();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to delete service");
    }
  };

  return {
    role,
    isServicesLoading,
    services,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    itemToDelete,
    setItemToDelete,
    openDeleteModal,
    handleDelete,
  };
}
