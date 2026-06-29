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

  const [createMut, { isLoading: isCreating }] = useCreateNestedServiceMutation();
  const [updateMut, { isLoading: isUpdating }] = useUpdateNestedServiceMutation();
  const [deleteMut] = useDeleteNestedServiceMutation();

  const [nestedServices, setNestedServices] = useState<NestedService[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NestedService | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<NestedService | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [subServices, setSubServices] = useState<{ name: string; price: string }[]>([]);
  const [serviceId, setServiceId] = useState("NONE");

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // All services for the dropdown
  const allServices: Service[] = apiServicesRes?.data || (Array.isArray(apiServicesRes) ? apiServicesRes : []);

  // Filter services for vendor — only their own
  const serviceOptions = (() => {
    const base =
      role === "vendor"
        ? allServices.filter((s) => String(s.vendor?.id || s.vendor_id) === String(currentUserId))
        : allServices;
    return [
      { value: "NONE", label: "Select a Parent Service" },
      ...base.map((s) => ({
        value: String(s.id),
        label: s.name,
        desc: s.subtitle || s.slug,
      })),
    ];
  })();

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setImage(url);
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage("");
    setPrice("");
    setSubServices([]);
    setServiceId("NONE");
  };

  const openCreateModal = () => {
    setEditingItem(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: NestedService) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description || "");
    setImage(item.image || "");
    setPrice(item.starting_price != null ? String(item.starting_price) : "");
    setSubServices(item.subServices ? item.subServices.map((s) => ({ name: s.name, price: String(s.price) })) : []);
    setServiceId(item.service ? String(item.service.id) : "NONE");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nested service name is required");
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim() || undefined,
      image: image.trim() || undefined,
      starting_price: price !== "" ? Number(price) : undefined,
      sub_services: subServices
        .filter((s) => s.name.trim() !== "")
        .map((s) => ({
          name: s.name.trim(),
          price: Number(s.price || 0),
        })),
      ...(!editingItem ? { service_id: serviceId === "NONE" ? 0 : Number(serviceId) } : {}),
    };

    if (!editingItem && serviceId === "NONE") {
      toast.error("Please select a parent service");
      return;
    }

    try {
      if (editingItem) {
        await updateMut({
          id: editingItem.id,
          data: {
            name: payload.name,
            description: payload.description,
            image: payload.image,
            starting_price: payload.starting_price,
            sub_services: payload.sub_services,
          },
        }).unwrap();
        toast.success("Nested service updated successfully!");
      } else {
        await createMut({
          service_id: Number(serviceId),
          name: payload.name,
          description: payload.description,
          image: payload.image,
          starting_price: payload.starting_price,
          sub_services: payload.sub_services,
        }).unwrap();
        toast.success("Nested service created successfully!");
      }
      setIsModalOpen(false);
      refetchNested();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to save nested service");
    }
  };

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
    isModalOpen,
    setIsModalOpen,
    editingItem,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    itemToDelete,
    setItemToDelete,
    name,
    setName,
    description,
    setDescription,
    image,
    setImage,
    price,
    setPrice,
    subServices,
    setSubServices,
    serviceId,
    setServiceId,
    isUploadingImage,
    serviceOptions,
    handleImageUpload,
    openCreateModal,
    openEditModal,
    handleSubmit,
    openDeleteModal,
    handleDelete,
    isCreating,
    isUpdating,
  };
}
