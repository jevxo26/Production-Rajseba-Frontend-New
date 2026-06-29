"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useGetAllServicesQuery } from "@/redux/features/admin/service";
import { useGetAllUsersQuery } from "@/redux/features/admin/user";
import { useCreateBookingMutation } from "@/redux/features/admin/booking";
import { useGetAllNestedServicesQuery } from "@/redux/features/admin/service";

export function useQuickBooking() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";
  const authUser = useAppSelector((state) => state.auth.user);

  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedNestedServiceId, setSelectedNestedServiceId] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [notes, setNotes] = useState("");

  const { data: servicesRes, isLoading: loadingServices } = useGetAllServicesQuery();
  const { data: nestedRes } = useGetAllNestedServicesQuery();
  const { data: usersRes } = useGetAllUsersQuery();
  const [createBooking, { isLoading: submitting }] = useCreateBookingMutation();

  const services = (servicesRes?.data || []) as any[];
  const nestedServices = (nestedRes?.data || []) as any[];
  const allUsers = (usersRes?.data || Array.isArray(usersRes) ? (usersRes?.data || usersRes) : []) as any[];

  const serviceOptions = services.map((s: any) => ({ value: String(s.id), label: s.name }));
  const nestedOptions = nestedServices
    .filter((ns: any) => !selectedServiceId || String(ns.service?.id) === selectedServiceId)
    .map((ns: any) => ({ value: String(ns.id), label: ns.name }));
  const vendorOptions = allUsers
    .filter((u: any) => u.role?.name === "Vendor" || u.role === "Vendor")
    .map((u: any) => ({ value: String(u.id), label: u.name }));

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendorId) {
      toast.error("Please select a vendor.");
      return;
    }

    try {
      const payload: any = {
        vendor_id: Number(selectedVendorId),
        location: clientAddress,
        notes,
        date: scheduleDate || undefined,
        user_id: authUser?.id,
      };
      if (selectedNestedServiceId) {
        payload.nested_service_id = Number(selectedNestedServiceId);
      }

      await createBooking(payload).unwrap();
      toast.success("Booking placed successfully!");

      // Reset
      setSelectedServiceId("");
      setSelectedNestedServiceId("");
      setSelectedVendorId("");
      setScheduleDate("");
      setClientAddress("");
      setNotes("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to place booking. Please try again.");
    }
  };

  return {
    role,
    selectedServiceId,
    setSelectedServiceId,
    selectedNestedServiceId,
    setSelectedNestedServiceId,
    selectedVendorId,
    setSelectedVendorId,
    scheduleDate,
    setScheduleDate,
    clientAddress,
    setClientAddress,
    notes,
    setNotes,
    loadingServices,
    serviceOptions,
    nestedOptions,
    vendorOptions,
    submitting,
    handleBookingSubmit,
  };
}
