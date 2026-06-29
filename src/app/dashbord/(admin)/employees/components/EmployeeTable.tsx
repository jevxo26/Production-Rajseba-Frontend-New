"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import { CustomTable } from "@/components/ui/table";
import EmployeeActionMenu from "./EmployeeActionMenu";

interface EmployeeItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
  phone?: string;
  rating?: string;
  categoryName?: string;
  profileId?: number;
  categoryIds?: number[];
  location?: string;
  description?: string;
  min_starting_price?: number;
  google_map_link?: string;
}

interface EmployeeTableProps {
  employees: EmployeeItem[];
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
  setSelectedUser: (user: EmployeeItem) => void;
  setEditingEmployee: (user: EmployeeItem) => void;
  setIsEditModalOpen: (val: boolean) => void;
  handleActivate: (id: string) => void;
  handleDeactivate: (id: string) => void;
  handleBlock: (id: string) => void;
  handleDelete: (id: string) => void;
}

export default function EmployeeTable({
  employees,
  openDropdownId,
  setOpenDropdownId,
  setSelectedUser,
  setEditingEmployee,
  setIsEditModalOpen,
  handleActivate,
  handleDeactivate,
  handleBlock,
  handleDelete,
}: EmployeeTableProps) {
  const columns = [
    {
      key: "name",
      header: "Employee Details",
      render: (user: EmployeeItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 text-slate-700 font-bold rounded-xl flex items-center justify-center">
            {user.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-none">{user.name}</p>
            <p className="text-xs text-slate-400 mt-1">{user.email}</p>
            {user.phone && user.phone !== "No Phone" && (
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">{user.phone}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "categoryName",
      header: "Category",
      render: (user: EmployeeItem) => <span className="font-bold text-slate-600 text-xs">{user.categoryName}</span>,
    },
    { key: "joined", header: "Joined Date" },
    {
      key: "status",
      header: "Status",
      render: (user: EmployeeItem) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
            user.status === "active"
              ? "bg-emerald-50 text-emerald-700"
              : user.status === "blocked"
              ? "bg-[#FFF8F4] text-[#E0530A]"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : ""}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user: EmployeeItem) => (
        <div className="relative flex justify-end">
          <button
            onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <MoreVertical size={16} />
          </button>
          <EmployeeActionMenu
            user={user}
            openDropdownId={openDropdownId}
            setOpenDropdownId={setOpenDropdownId}
            setSelectedUser={setSelectedUser}
            setEditingEmployee={setEditingEmployee}
            setIsEditModalOpen={setIsEditModalOpen}
            handleActivate={handleActivate}
            handleDeactivate={handleDeactivate}
            handleBlock={handleBlock}
            handleDelete={handleDelete}
          />
        </div>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={employees}
      searchKey="name"
      searchPlaceholder="Search employees by name..."
      filterKey="status"
      filterPlaceholder="All Statuses"
      filterOptions={[
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Blocked", value: "blocked" },
      ]}
      pageSize={10}
    />
  );
}
