"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  Category,
} from "@/redux/features/admin/category";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload";

export function useCategoryState() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";

  const { data: apiCategoriesRes, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
  const [createCategoryMut, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategoryMut, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategoryMut] = useDeleteCategoryMutation();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [icon, setIcon] = useState("");
  const [parentId, setParentId] = useState<string>("NONE");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setIcon(url);
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  useEffect(() => {
    const apiCategories = apiCategoriesRes?.data || (Array.isArray(apiCategoriesRes) ? apiCategoriesRes : []);
    setCategories(apiCategories);
  }, [apiCategoriesRes]);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setOrder(0);
    setIcon("");
    setParentId("NONE");
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description || "");
    setOrder(category.order || 0);
    setIcon(category.icon || "");
    setParentId(category.parent ? String(category.parent.id) : "NONE");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim() || undefined,
      order: Number(order) || 0,
      icon: icon.trim() || undefined,
      parentId: parentId === "NONE" ? undefined : Number(parentId),
    };

    try {
      if (editingCategory) {
        if (parentId !== "NONE" && Number(parentId) === editingCategory.id) {
          toast.error("A category cannot be its own parent");
          return;
        }

        await updateCategoryMut({
          id: editingCategory.id,
          data: {
            ...payload,
            parentId: parentId === "NONE" ? null : Number(parentId),
          },
        }).unwrap();
        toast.success("Category updated successfully!");
      } else {
        await createCategoryMut(payload).unwrap();
        toast.success("Category created successfully!");
      }
      setIsModalOpen(false);
    } catch (e: any) {
      console.error("Failed to save category:", e);
      toast.error(e.data?.message || e.message || "Failed to save category");
    }
  };

  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategoryMut(categoryToDelete.id).unwrap();
      toast.success("Category deleted successfully!");
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (e: any) {
      console.error("Failed to delete category:", e);
      toast.error(e.data?.message || e.message || "Failed to delete category");
    }
  };

  const parentOptions = [
    { value: "NONE", label: "None (Root Category)" },
    ...categories
      .filter((cat) => !editingCategory || cat.id !== editingCategory.id)
      .map((cat) => ({
        value: String(cat.id),
        label: cat.name,
        desc: cat.description,
      })),
  ];

  return {
    role,
    isCategoriesLoading,
    categories,
    isModalOpen,
    setIsModalOpen,
    editingCategory,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    categoryToDelete,
    setCategoryToDelete,
    name,
    setName,
    description,
    setDescription,
    order,
    setOrder,
    icon,
    setIcon,
    parentId,
    setParentId,
    isUploadingImage,
    handleImageChange,
    openCreateModal,
    openEditModal,
    handleSubmit,
    openDeleteModal,
    handleDelete,
    parentOptions,
    isCreating,
    isUpdating,
  };
}
