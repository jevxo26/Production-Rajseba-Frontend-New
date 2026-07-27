"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import {
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  Service,
} from "@/redux/features/admin/service";
import { toast } from "sonner";

export function useVendorServicesState() {
  const router = useRouter();
  const rawRole = useAppSelector((state) => state.auth.role) || "vendor";
  const role =
    typeof rawRole === "string"
      ? rawRole.toLowerCase().replace(/\s+/g, "")
      : "client";

  const {
    data: apiServicesRes,
    isLoading,
    refetch,
  } = useGetAllServicesQuery();

  const [deleteMut] = useDeleteServiceMutation();

  const [services, setServices] = useState<Service[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Service | null>(null);

  useEffect(() => {
    const all: Service[] =
      apiServicesRes?.data || (Array.isArray(apiServicesRes) ? apiServicesRes : []);
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
      toast.success("Service deleted!");
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to delete");
    }
  };

  return {
    router,
    role,
    services,
    isLoading,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    itemToDelete,
    setItemToDelete,
    openDeleteModal,
    handleDelete,
  };
}
