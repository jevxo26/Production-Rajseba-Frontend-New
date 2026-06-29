"use client";

import React from "react";
import { Package as PackageIcon, Wrench, Layers, DollarSign, Edit2, Trash2 } from "lucide-react";
import { CustomTable } from "@/components/ui/table";
import type { TableAction } from "@/components/ui/table";
import { Package } from "@/redux/features/vendor/packageApi";

interface PackageTableProps {
  packages: Package[];
  openEditModal: (item: Package) => void;
  openDeleteModal: (item: Package) => void;
}

export default function PackageTable({
  packages,
  openEditModal,
  openDeleteModal,
}: PackageTableProps) {
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
            {count} nested service{count !== 1 ? "s" : ""}
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
      onClick: openEditModal,
      variant: "secondary",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: openDeleteModal,
      variant: "destructive",
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={packages}
      actions={tableActions}
      searchKey="name"
      searchPlaceholder="Search packages by name..."
      pageSize={10}
    />
  );
}
