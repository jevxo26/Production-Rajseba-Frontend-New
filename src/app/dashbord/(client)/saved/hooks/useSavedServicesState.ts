"use client";

import { useAppSelector } from "@/redux/hooks";
import { useGetSavedServicesQuery, useToggleSavedServiceMutation } from "@/redux/features/admin/user";
import { toast } from "sonner";

export function useSavedServicesState() {
  const role = useAppSelector((state) => state.auth.role) || "client";
  const authUser = useAppSelector((state) => state.auth.user);

  const { data: savedRes, isLoading } = useGetSavedServicesQuery(undefined, {
    skip: !authUser,
  });
  const savedServices: any[] = savedRes?.data || [];

  const [toggleSaved] = useToggleSavedServiceMutation();

  const handleUnsave = async (id: string | number, title: string) => {
    try {
      await toggleSaved(id).unwrap();
      toast.success(`"${title}" removed from wishlist`);
    } catch {
      toast.error("Failed to remove from wishlist");
    }
  };

  return {
    role,
    authUser,
    savedServices,
    isLoading,
    handleUnsave,
  };
}
