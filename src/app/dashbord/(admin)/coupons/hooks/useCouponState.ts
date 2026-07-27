"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  Coupon,
  CouponApplicableTo,
  CouponDiscountType,
} from "@/redux/features/admin/coupon";
import { useGetAllServicesQuery } from "@/redux/features/admin/service";

const defaultForm = {
  code: "",
  description: "",
  discount_type: "percentage" as CouponDiscountType,
  discount_value: "",
  max_discount: "",
  min_order_amount: "0",
  usage_limit: "",
  valid_from: "",
  valid_until: "",
  is_active: true,
  applicable_to: "all" as CouponApplicableTo,
  service_id: "",
  package_id: "",
};

export function useCouponState() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";
  const { data: couponsRes, isLoading } = useGetAllCouponsQuery();
  const { data: servicesRes } = useGetAllServicesQuery();
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const coupons = couponsRes?.data || [];
  const services = servicesRes?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null);
  const [form, setForm] = useState(defaultForm);

  const selectedService = services.find((s: any) => String(s.id) === form.service_id);
  const packageOptions =
    selectedService?.packages?.map((p: any) => ({
      value: String(p.id),
      label: p.name,
    })) || [];

  const openCreate = () => {
    setEditingCoupon(null);
    setForm(defaultForm);
    setIsModalOpen(true);
  };

  const openEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      description: coupon.description || "",
      discount_type: coupon.discount_type,
      discount_value: String(coupon.discount_value),
      max_discount: coupon.max_discount ? String(coupon.max_discount) : "",
      min_order_amount: String(coupon.min_order_amount || 0),
      usage_limit: coupon.usage_limit ? String(coupon.usage_limit) : "",
      valid_from: coupon.valid_from || "",
      valid_until: coupon.valid_until || "",
      is_active: coupon.is_active,
      applicable_to: coupon.applicable_to,
      service_id: coupon.service?.id ? String(coupon.service.id) : "",
      package_id: coupon.pkg?.id ? String(coupon.pkg.id) : "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) {
      toast.error("Coupon code is required");
      return;
    }
    if (!form.discount_value || Number(form.discount_value) <= 0) {
      toast.error("Discount value must be greater than 0");
      return;
    }

    const payload: any = {
      code: form.code.trim().toUpperCase(),
      description: form.description.trim() || undefined,
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      max_discount: form.max_discount ? Number(form.max_discount) : undefined,
      min_order_amount: Number(form.min_order_amount || 0),
      usage_limit: form.usage_limit ? Number(form.usage_limit) : undefined,
      valid_from: form.valid_from || undefined,
      valid_until: form.valid_until || undefined,
      is_active: form.is_active,
      applicable_to: form.applicable_to,
      service_id:
        form.applicable_to === "service" && form.service_id ? Number(form.service_id) : undefined,
      package_id:
        form.applicable_to === "package" && form.package_id ? Number(form.package_id) : undefined,
    };

    try {
      if (editingCoupon) {
        await updateCoupon({ id: editingCoupon.id, data: payload }).unwrap();
        toast.success("Coupon updated successfully");
      } else {
        await createCoupon(payload).unwrap();
        toast.success("Coupon created successfully");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save coupon");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCoupon(deleteTarget.id).unwrap();
      toast.success("Coupon deleted successfully");
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete coupon");
    }
  };

  return {
    role,
    isLoading,
    coupons,
    services,
    isModalOpen,
    setIsModalOpen,
    editingCoupon,
    deleteTarget,
    setDeleteTarget,
    form,
    setForm,
    packageOptions,
    isCreating,
    isUpdating,
    openCreate,
    openEdit,
    handleSubmit,
    handleDelete,
  };
}
