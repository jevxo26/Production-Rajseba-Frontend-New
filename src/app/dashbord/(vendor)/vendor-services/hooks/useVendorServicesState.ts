"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  Service,
} from "@/redux/features/admin/service";
import { useGetAllCategoriesQuery } from "@/redux/features/admin/category";
import { useGetAllUsersQuery } from "@/redux/features/admin/user";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload";

export function useVendorServicesState() {
  const router = useRouter();
  const rawRole = useAppSelector((state) => state.auth.role) || "vendor";
  const role =
    typeof rawRole === "string"
      ? rawRole.toLowerCase().replace(/\s+/g, "")
      : "client";
  const currentUser = useAppSelector((state) => state.auth.user);
  const currentUserId = currentUser?.id || currentUser?._id || "";

  const {
    data: apiServicesRes,
    isLoading,
    refetch,
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

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [details, setDetails] = useState("");
  const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("NONE");
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);

  const allCategories =
    apiCategoriesRes?.data || (Array.isArray(apiCategoriesRes) ? apiCategoriesRes : []);

  const categoryOptions = [
    { value: "NONE", label: "Select a Category" },
    ...allCategories.map((c: any) => ({ value: String(c.id), label: c.name })),
  ];

  const allUsers = apiUsersRes?.data || (Array.isArray(apiUsersRes) ? apiUsersRes : []);

  const employeeOptions =
    categoryId === "NONE"
      ? []
      : allUsers
          .filter((u: any) => u.role?.name === "Employee" || u.role === "Employee")
          .filter((u: any) => String(u.vendor?.id || u.vendor) === String(currentUserId))
          .filter((u: any) => {
            const cats = u.profile?.categories;
            if (Array.isArray(cats)) {
              return cats.some((c: any) => String(c.id) === categoryId);
            }
            return false;
          })
          .map((u: any) => ({
            id: Number(u.id || u._id),
            name: u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unknown",
          }));

  useEffect(() => {
    const all: Service[] =
      apiServicesRes?.data || (Array.isArray(apiServicesRes) ? apiServicesRes : []);
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
    setEmployeeIds([]);
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
    setEmployeeIds(item.employees ? item.employees.map((e: any) => Number(e.id)) : []);
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
            employee_ids: employeeIds.length > 0 ? employeeIds : undefined,
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
          vendor_id: Number(currentUserId),
          employee_ids: employeeIds.length > 0 ? employeeIds : undefined,
        }).unwrap();
        toast.success("Service created successfully!");
      }
      setIsModalOpen(false);
      refetch();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to save service");
    }
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
    subtitle,
    setSubtitle,
    slug,
    setSlug,
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
    categoryId,
    setCategoryId,
    employeeIds,
    setEmployeeIds,
    categoryOptions,
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
