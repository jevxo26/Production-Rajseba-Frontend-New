"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetAllPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  Package,
} from "@/redux/features/vendor/packageApi";
import {
  useGetAllServicesQuery,
  useGetAllNestedServicesQuery,
  Service,
  NestedService,
} from "@/redux/features/admin/service";
import { toast } from "sonner";

export function useVendorPackagesState() {
  const rawRole = useAppSelector((state) => state.auth.role) || "superadmin";
  const role =
    typeof rawRole === "string"
      ? rawRole.toLowerCase().replace(/\s+/g, "")
      : "client";
  const currentUser = useAppSelector((state) => state.auth.user);
  const currentUserId = currentUser?.id || currentUser?._id || "";

  // APIs
  const {
    data: apiPackagesRes,
    isLoading: isPackagesLoading,
    refetch: refetchPackages,
  } = useGetAllPackagesQuery();
  const { data: apiServicesRes } = useGetAllServicesQuery();
  const { data: apiNestedRes } = useGetAllNestedServicesQuery();

  const [createMut, { isLoading: isCreating }] = useCreatePackageMutation();
  const [updateMut, { isLoading: isUpdating }] = useUpdatePackageMutation();
  const [deleteMut] = useDeletePackageMutation();

  const [packages, setPackages] = useState<Package[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Package | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Package | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [featuresList, setFeaturesList] = useState<string[]>([]);
  const [serviceId, setServiceId] = useState("NONE");
  const [selectedNestedIds, setSelectedNestedIds] = useState<number[]>([]);
  const [packageType, setPackageType] = useState<"one_time" | "weekly" | "monthly">("one_time");

  // All services for the dropdown
  const allServices: Service[] =
    apiServicesRes?.data || (Array.isArray(apiServicesRes) ? apiServicesRes : []);

  // All nested services
  const allNestedServices: NestedService[] =
    apiNestedRes?.data || (Array.isArray(apiNestedRes) ? apiNestedRes : []);

  // Filter services for vendor — only their own
  const serviceOptions = (() => {
    const base =
      role === "vendor"
        ? allServices.filter(
            (s) => String(s.vendor?.id || s.vendor_id) === String(currentUserId)
          )
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

  // Filter nested services based on selected parent service
  const availableNestedServices =
    serviceId !== "NONE"
      ? allNestedServices.filter(
          (ns) => ns.service && String(ns.service.id) === serviceId
        )
      : [];

  // Filter packages for vendor
  useEffect(() => {
    const all: Package[] =
      apiPackagesRes?.data || (Array.isArray(apiPackagesRes) ? apiPackagesRes : []);
      
    const services: Service[] = 
      apiServicesRes?.data || (Array.isArray(apiServicesRes) ? apiServicesRes : []);

    if (role === "vendor") {
      const vendorServiceIds = services
        .filter((s) => String(s.vendor?.id || s.vendor_id) === String(currentUserId))
        .map((s) => s.id);
      setPackages(
        all.filter((pkg) => pkg.service && vendorServiceIds.includes(pkg.service.id))
      );
    } else {
      setPackages(all);
    }
  }, [apiPackagesRes, apiServicesRes, role, currentUserId]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setFeaturesList([]);
    setServiceId("NONE");
    setSelectedNestedIds([]);
    setPackageType("one_time");
  };

  const openCreateModal = () => {
    setEditingItem(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: Package) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description || "");
    setPrice(item.price != null ? String(item.price) : "");
    setFeaturesList(item.features ? [...item.features] : []);
    setServiceId(item.service ? String(item.service.id) : "NONE");
    setSelectedNestedIds(
      item.items?.map((i) => i.nestedService?.id).filter(Boolean) as number[] || []
    );
    setPackageType(item.package_type || "one_time");
    setIsModalOpen(true);
  };

  const toggleNestedService = (id: number) => {
    setSelectedNestedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Package name is required");
      return;
    }

    if (!editingItem && serviceId === "NONE") {
      toast.error("Please select a parent service");
      return;
    }

    try {
      if (editingItem) {
        await updateMut({
          id: editingItem.id,
          data: {
            name: name.trim(),
            description: description.trim() || undefined,
            price: price !== "" ? Number(price) : undefined,
            features: featuresList,
            nested_service_ids:
              selectedNestedIds.length > 0 ? selectedNestedIds : undefined,
            package_type: packageType,
          },
        }).unwrap();
        toast.success("Package updated successfully!");
      } else {
        await createMut({
          service_id: Number(serviceId),
          name: name.trim(),
          description: description.trim() || undefined,
          price: price !== "" ? Number(price) : undefined,
          features: featuresList,
          nested_service_ids:
            selectedNestedIds.length > 0 ? selectedNestedIds : undefined,
          package_type: packageType,
        }).unwrap();
        toast.success("Package created successfully!");
      }
      setIsModalOpen(false);
      refetchPackages();
    } catch (err: any) {
      toast.error(
        err.data?.message || err.message || "Failed to save package"
      );
    }
  };

  const openDeleteModal = (item: Package) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMut(itemToDelete.id).unwrap();
      toast.success("Package deleted successfully!");
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      refetchPackages();
    } catch (err: any) {
      toast.error(
        err.data?.message || err.message || "Failed to delete package"
      );
    }
  };

  return {
    role,
    packages,
    isPackagesLoading,
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
    price,
    setPrice,
    featuresList,
    setFeaturesList,
    serviceId,
    setServiceId,
    selectedNestedIds,
    serviceOptions,
    availableNestedServices,
    isCreating,
    isUpdating,
    openCreateModal,
    openEditModal,
    toggleNestedService,
    handleSubmit,
    openDeleteModal,
    handleDelete,
    packageType,
    setPackageType,
  };
}
