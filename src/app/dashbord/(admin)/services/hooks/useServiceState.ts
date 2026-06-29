"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload";
import {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  Service,
} from "@/redux/features/admin/service";
import { useGetAllCategoriesQuery } from "@/redux/features/admin/category";
import { useGetAllUsersQuery } from "@/redux/features/admin/user";

export function useServiceState() {
  const rawRole = useAppSelector((state) => state.auth.role) || "superadmin";
  const role = typeof rawRole === "string" ? rawRole.toLowerCase().replace(/\s+/g, "") : "client";

  // APIs
  const {
    data: apiServicesRes,
    isLoading: isServicesLoading,
    refetch: refetchServices,
  } = useGetAllServicesQuery();
  const { data: apiCategoriesRes } = useGetAllCategoriesQuery();
  const { data: apiUsersRes } = useGetAllUsersQuery();

  const [createMut, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateMut, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteMut] = useDeleteServiceMutation();

  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Service | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [details, setDetails] = useState("");
  const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("NONE");
  const [vendorId, setVendorId] = useState("NONE");
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);
  const [agentCommissionPercentage, setAgentCommissionPercentage] = useState("0");

  const allCategories = apiCategoriesRes?.data || (Array.isArray(apiCategoriesRes) ? apiCategoriesRes : []);

  const categoryOptions = [
    { value: "NONE", label: "Select a Category" },
    ...allCategories.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })),
  ];

  const allUsers = apiUsersRes?.data || (Array.isArray(apiUsersRes) ? apiUsersRes : []);

  const vendorOptions = [
    { value: "NONE", label: "Select a Vendor" },
    ...allUsers
      .filter(
        (u: any) =>
          u.role?.name?.toLowerCase() === "vendor" ||
          (typeof u.role === "string" && u.role.toLowerCase() === "vendor")
      )
      .map((u: any) => ({
        value: String(u.id || u._id),
        label: u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unknown",
      })),
  ];

  const employeeOptions =
    categoryId === "NONE" || vendorId === "NONE"
      ? []
      : allUsers
          .filter((u: any) => u.role?.name === "Employee" || u.role === "Employee")
          .filter((u: any) => String(u.profile?.category?.id) === categoryId)
          .filter((u: any) => String(u.vendor?.id || u.vendor) === vendorId)
          .map((u: any) => ({
            id: Number(u.id || u._id),
            name: u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unknown",
          }));

  useEffect(() => {
    const all: Service[] = apiServicesRes?.data || (Array.isArray(apiServicesRes) ? apiServicesRes : []);
    setServices(all);
  }, [apiServicesRes]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setImage(url);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const resetForm = () => {
    setName("");
    setSubtitle("");
    setSlug("");
    setDescription("");
    setOverview("");
    setDetails("");
    setFaq([]);
    setImage("");
    setCategoryId("NONE");
    setVendorId("NONE");
    setEmployeeIds([]);
    setAgentCommissionPercentage("0");
  };

  const openCreateModal = () => {
    setEditingItem(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: Service) => {
    setEditingItem(item);
    setName(item.name);
    setSubtitle(item.subtitle || "");
    setSlug(item.slug);
    setDescription(item.description || "");
    setOverview(item.overview || "");
    setDetails(item.details || "");
    setFaq(item.faq || []);
    setImage(item.image || "");
    setCategoryId(item.category_id ? String(item.category_id) : "NONE");
    setVendorId(item.vendor ? String(item.vendor.id) : "NONE");
    setEmployeeIds(item.employees ? item.employees.map((e: any) => Number(e.id)) : []);
    setAgentCommissionPercentage(item.agent_commission_percentage ? String(item.agent_commission_percentage) : "0");
    setIsModalOpen(true);
  };

  const openDeleteModal = (item: Service) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Service name is required");
      return;
    }
    if (!slug.trim()) {
      toast.error("Slug is required");
      return;
    }
    try {
      if (editingItem) {
        await updateMut({
          id: editingItem.id!,
          data: {
            name: name.trim(),
            subtitle: subtitle.trim() || undefined,
            slug: slug.trim(),
            description: description.trim() || undefined,
            overview: overview.trim() || undefined,
            details: details.trim() || undefined,
            faq: faq.length > 0 ? faq : undefined,
            image: image || undefined,
            category_id: categoryId !== "NONE" ? Number(categoryId) : undefined,
            vendor_id: vendorId !== "NONE" ? Number(vendorId) : undefined,
            employee_ids: employeeIds.length > 0 ? employeeIds : undefined,
            agent_commission_percentage: Number(agentCommissionPercentage) || 0,
          },
        }).unwrap();
        toast.success("Service updated successfully!");
      } else {
        await createMut({
          name: name.trim(),
          subtitle: subtitle.trim() || undefined,
          slug: slug.trim(),
          description: description.trim() || undefined,
          overview: overview.trim() || undefined,
          details: details.trim() || undefined,
          faq: faq.length > 0 ? faq : undefined,
          image: image || undefined,
          category_id: categoryId !== "NONE" ? Number(categoryId) : undefined,
          vendor_id: vendorId !== "NONE" ? Number(vendorId) : undefined,
          employee_ids: employeeIds.length > 0 ? employeeIds : undefined,
          agent_commission_percentage: Number(agentCommissionPercentage) || 0,
        }).unwrap();
        toast.success("Service created successfully!");
      }
      setIsModalOpen(false);
      refetchServices();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to save service");
    }
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
    isModalOpen,
    setIsModalOpen,
    editingItem,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    itemToDelete,
    setItemToDelete,
    isUploadingImage,
    name,
    setName,
    slug,
    setSlug,
    subtitle,
    setSubtitle,
    categoryId,
    setCategoryId,
    agentCommissionPercentage,
    setAgentCommissionPercentage,
    vendorId,
    setVendorId,
    employeeIds,
    setEmployeeIds,
    description,
    setDescription,
    overview,
    setOverview,
    details,
    setDetails,
    faq,
    setFaq,
    image,
    setImage,
    categoryOptions,
    vendorOptions,
    employeeOptions,
    handleImageUpload,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    handleSubmit,
    handleDelete,
    isCreating,
    isUpdating,
  };
}
