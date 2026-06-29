"use client";

import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { CustomTable } from "@/components/ui/table";
import type { TableAction } from "@/components/ui/table";

interface LocationTableProps {
  activeTab: "divisions" | "districts" | "areas";
  divisions: any[];
  districts: any[];
  areas: any[];
  openEdit: (item: any) => void;
  handleDelete: (item: any) => void;
}

export default function LocationTable({
  activeTab,
  divisions,
  districts,
  areas,
  openEdit,
  handleDelete,
}: LocationTableProps) {
  const getColumns = () => {
    const cols: any = [
      { key: "name", header: "Name (EN)", render: (i: any) => <span className="font-bold">{i.name}</span> },
      { key: "banglaName", header: "Name (BN)", render: (i: any) => i.banglaName || "—" },
      { key: "code", header: "Code", render: (i: any) => i.code || "—" },
      {
        key: "coords",
        header: "Coordinates",
        render: (i: any) => (
          <span className="text-xs text-slate-500">
            {i.latitude || "—"}, {i.longitude || "—"}
          </span>
        ),
      },
    ];
    if (activeTab === "districts") {
      cols.splice(2, 0, { key: "parent", header: "Division", render: (i: any) => i.devision?.name || "—" });
    }
    if (activeTab === "areas") {
      cols.splice(2, 0, { key: "parent", header: "District", render: (i: any) => i.district?.name || "—" });
    }
    return cols;
  };

  const actions: TableAction<any>[] = [
    { label: "Edit", icon: Edit2, onClick: openEdit, variant: "secondary" },
    { label: "Delete", icon: Trash2, onClick: handleDelete, variant: "destructive" },
  ];

  const data = activeTab === "divisions" ? divisions : activeTab === "districts" ? districts : areas;

  return (
    <CustomTable
      columns={getColumns()}
      data={data}
      actions={actions}
      searchKey="name"
      searchPlaceholder={`Search ${activeTab}...`}
      pageSize={15}
    />
  );
}
