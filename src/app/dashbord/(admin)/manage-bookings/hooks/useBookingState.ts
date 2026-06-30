"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
  useCreateBookingMutation,
} from "@/redux/features/admin/booking";
import { useGetAllServicesQuery } from "@/redux/features/admin/service";
import { useGetAllUsersQuery } from "@/redux/features/admin/user";

export function useBookingState() {
  const { data: bookingsRes, isLoading } = useGetAllBookingsQuery();
  const { data: servicesRes } = useGetAllServicesQuery();

  const rawRole = useAppSelector((state) => state.auth.role) || "superadmin";
  const currentUser = useAppSelector((state) => state.auth.user);

  const roleName = typeof rawRole === "string" ? rawRole.toLowerCase() : (rawRole as any)?.name?.toLowerCase() || "superadmin";

  const [updateStatus] = useUpdateBookingStatusMutation();
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();
  const [createBooking, { isLoading: isCreating }] = useCreateBookingMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteModalBookingId, setDeleteModalBookingId] = useState<number | null>(null);

  const [newBooking, setNewBooking] = useState<any>({
    user_id: "",
    vendor_id: "",
    service_id: "",
    nested_service_id: "",
    selection_type: "nested", // 'nested' or 'package'
    sub_service_ids: [] as string[],
    package_id: "",
    quantity: 1,
    date: "",
    time: "",
    location: "",
    notes: "",
  });

  const { data: vendorsRes } = useGetAllUsersQuery({ role: "Vendor" });
  const { data: clientsRes } = useGetAllUsersQuery({ role: "Client" });

  const bookings = bookingsRes?.data || [];
  const services = servicesRes?.data || [];
  const vendors = vendorsRes?.data || [];
  const clients = clientsRes?.data || [];

  // Filtering dependent dropdowns
  const selectedVendorServices = services.filter(
    (s: any) =>
      s.vendor_id?.toString() === newBooking.vendor_id ||
      s.vendor?.id?.toString() === newBooking.vendor_id
  );
  const selectedService = services.find((s: any) => s.id?.toString() === newBooking.service_id);
  const selectedNestedService = selectedService?.nestedServices?.find(
    (ns: any) => ns.id?.toString() === newBooking.nested_service_id
  );

  // Calculate estimated total
  let estimatedTotalPrice = 0;
  if (newBooking.selection_type === "nested") {
    const allSubServices = selectedNestedService?.subServices || [];
    estimatedTotalPrice = newBooking.sub_service_ids.reduce((sum: number, id: string) => {
      const match = allSubServices.find((s: any) => s.id?.toString() === id);
      return sum + (match ? Number(match.price || 0) : 0);
    }, 0);
  } else if (newBooking.selection_type === "package" && newBooking.package_id) {
    const allPackages = selectedService
      ? selectedService.packages || []
      : selectedVendorServices.flatMap((s: any) => s.packages || []);
    const match = allPackages.find((p: any) => p.id?.toString() === newBooking.package_id);
    estimatedTotalPrice = match ? Number(match.price || 0) * Number(newBooking.quantity || 1) : 0;
  }

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Booking status updated to ${status}`);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update booking status");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModalBookingId) return;
    try {
      await deleteBooking(deleteModalBookingId).unwrap();
      toast.success("Booking deleted successfully");
      setDeleteModalBookingId(null);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to delete booking");
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.user_id || !newBooking.vendor_id || !newBooking.date || !newBooking.location) {
      toast.error("Client, Vendor, Date, and Location are required!");
      return;
    }

    const payload: any = {
      user_id: Number(newBooking.user_id),
      vendor_id: Number(newBooking.vendor_id),
      service_id: newBooking.service_id ? Number(newBooking.service_id) : undefined,
      date: newBooking.date,
      time: newBooking.time || undefined,
      location: newBooking.location,
      notes: newBooking.notes || undefined,
    };
    if (newBooking.selection_type === "nested" && newBooking.sub_service_ids.length > 0) {
      payload.sub_service_items = newBooking.sub_service_ids.map((id: string) => ({
        sub_service_id: Number(id),
        quantity: 1,
      }));
    }
    if (newBooking.selection_type === "package" && newBooking.package_id) {
      payload.package_id = Number(newBooking.package_id);
      payload.quantity = Number(newBooking.quantity || 1);
    }

    try {
      await createBooking(payload).unwrap();
      toast.success("Booking created successfully!");
      setIsAddModalOpen(false);
      setNewBooking({
        user_id: "",
        vendor_id: roleName === "vendor" ? String(currentUser?.id || "") : "",
        service_id: "",
        nested_service_id: "",
        selection_type: "nested",
        sub_service_ids: [],
        package_id: "",
        quantity: 1,
        date: "",
        time: "",
        location: "",
        notes: "",
      });
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to create booking");
    }
  };

  const filteredBookings = bookings.filter((b: any) => {
    // Role-based filtering
    if (roleName === "vendor" || roleName === "Vendor") {
      const vendorIdStr = b.vendor?.id?.toString() || b.vendor_id?.toString();
      const currentUserIdStr = currentUser?.id?.toString();

      if (vendorIdStr !== currentUserIdStr) {
        return false;
      }
    }

    const matchesSearch =
      b.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  }).sort((a: any, b: any) => {
    if (a.id && b.id) return b.id - a.id;
    return new Date(b.created_at || b.createdAt || 0).getTime() - new Date(a.created_at || a.createdAt || 0).getTime();
  });

  return {
    isLoading,
    roleName,
    currentUser,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    isAddModalOpen,
    setIsAddModalOpen,
    deleteModalBookingId,
    setDeleteModalBookingId,
    newBooking,
    setNewBooking,
    clients,
    vendors,
    selectedVendorServices,
    selectedService,
    selectedNestedService,
    estimatedTotalPrice,
    filteredBookings,
    handleStatusChange,
    handleDeleteConfirm,
    handleCreateSubmit,
    isDeleting,
    isCreating,
  };
}
