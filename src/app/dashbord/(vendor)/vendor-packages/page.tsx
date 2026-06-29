"use client";

import React from "react";
import {
  ShieldAlert,
  Trash2,
  PlusCircle,
  Edit2,
  Package as PackageIcon,
  DollarSign,
  Wrench,
  Layers,
} from "lucide-react";
import type { TableAction } from "@/components/ui/table";
import { CustomTable } from "@/components/ui/table";
import { Package } from "@/redux/features/vendor/packageApi";
import { useVendorPackagesState } from "./hooks/useVendorPackagesState";
import PackageFormModal from "./components/PackageFormModal";
import DeletePackageModal from "./components/DeletePackageModal";

export default function PackagesManagementPage() {
  const state = useVendorPackagesState();

  if (state.role !== "superadmin" && state.role !== "vendor") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center animate-in fade-in duration-200">
        <div className="p-4 bg-[#FFF8F4] rounded-2xl text-[#FF6014] mb-4">
          <ShieldAlert size={48} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm">
          This panel is restricted to Administrators and Registered Vendors.
        </p>
      </div>
    );
  }

  const columns = [
    {
      key: "name",
      header: "Package Details",
      render: (item: Package) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-violet-50 text-violet-500 font-bold rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-violet-100/40">
            <PackageIcon size={20} />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-none">{item.name}</p>
            {item.description && (
              <p className="text-xs text-slate-400 font-medium mt-1 max-w-[200px] truncate">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "service",
      header: "Parent Service",
      render: (item: Package) => (
        <span className="inline-flex items-center gap-1.5 bg-[#FFF8F4]/70 text-[#E0530A] font-bold text-xs px-2.5 py-1 rounded-xl border border-[#FFF0EB]/50">
          <Wrench size={12} />
          {item.service?.name || "—"}
        </span>
      ),
    },
    {
      key: "items",
      header: "Included Items",
      render: (item: Package) => {
        const count = item.items?.length || 0;
        return (
          <span className="inline-flex items-center gap-1.5 bg-indigo-50/70 text-indigo-700 font-bold text-xs px-2.5 py-1 rounded-xl border border-indigo-100/50">
            <Layers size={12} />
            {count} sub-service{count !== 1 ? "s" : ""}
          </span>
        );
      },
    },
    {
      key: "price",
      header: "Price",
      render: (item: Package) => (
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-xl border border-emerald-100/50">
          <DollarSign size={12} />
          {item.price != null ? `৳${item.price.toLocaleString()}` : "Free"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (item: Package) => (
        <span className="text-slate-400 text-xs font-medium">
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}
        </span>
      ),
    },
  ];

  const tableActions: TableAction<Package>[] = [
    {
      label: "Edit",
      icon: Edit2,
      onClick: state.openEditModal,
      variant: "secondary",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: state.openDeleteModal,
      variant: "destructive",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
            <PackageIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              {state.role === "vendor" ? "My Packages" : "Package Directory"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {state.role === "vendor"
                ? "Bundle your sub-services into packages and offer them to clients."
                : "Manage service packages across all vendors."}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={state.openCreateModal}
            className="bg-[#FF6014] hover:bg-[#E0530A] text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-[#FF6014]/10"
          >
            <PlusCircle size={18} /> Add Package
          </button>
        </div>
      </div>

      {/* Table */}
      {state.isPackagesLoading ? (
        <div className="flex items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl shadow-premium">
          <div className="w-8 h-8 border-4 border-[#FF6014] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : state.packages.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100/50">
            <PackageIcon size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Packages Found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            Create your first package by bundling sub-services together.
          </p>
          <button
            onClick={state.openCreateModal}
            className="mt-4 bg-[#FFF8F4] hover:bg-[#FFF0EB] text-[#FF6014] font-bold px-4 py-2 rounded-xl text-xs transition-all"
          >
            Create New Package
          </button>
        </div>
      ) : (
        <CustomTable
          columns={columns}
          data={state.packages}
          actions={tableActions}
          searchKey="name"
          searchPlaceholder="Search packages by name..."
          pageSize={10}
        />
      )}

      {/* Create / Edit Modal */}
      <PackageFormModal
        isModalOpen={state.isModalOpen}
        setIsModalOpen={state.setIsModalOpen}
        editingItem={state.editingItem}
        serviceId={state.serviceId}
        setServiceId={state.setServiceId}
        serviceOptions={state.serviceOptions}
        name={state.name}
        setName={state.setName}
        price={state.price}
        setPrice={state.setPrice}
        description={state.description}
        setDescription={state.setDescription}
        featuresStr={state.featuresStr}
        setFeaturesStr={state.setFeaturesStr}
        selectedNestedIds={state.selectedNestedIds}
        availableNestedServices={state.availableNestedServices}
        toggleNestedService={state.toggleNestedService}
        handleSubmit={state.handleSubmit}
        isCreating={state.isCreating}
        isUpdating={state.isUpdating}
      />

      {/* Delete Confirmation Modal */}
      <DeletePackageModal
        isDeleteModalOpen={state.isDeleteModalOpen}
        setIsDeleteModalOpen={state.setIsDeleteModalOpen}
        itemToDelete={state.itemToDelete}
        setItemToDelete={state.setItemToDelete}
        handleDelete={state.handleDelete}
      />
    </div>
  );
}
