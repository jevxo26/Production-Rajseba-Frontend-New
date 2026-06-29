"use client";

import React from "react";
import Link from "next/link";
import { MoreVertical, Eye, ShieldCheck, XCircle, Trash2 } from "lucide-react";
import { CustomTable } from "@/components/ui/table";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
  phone?: string;
  rating?: string;
}

interface UserTableProps {
  users: UserItem[];
  role: string;
  openDropdownId: string | null;
  setOpenDropdownId: (val: string | null) => void;
  handleActivate: (id: string) => void;
  handleDeactivate: (id: string) => void;
  handleBlock: (id: string) => void;
  handleDelete: (id: string) => void;
}

export default function UserTable({
  users,
  role,
  openDropdownId,
  setOpenDropdownId,
  handleActivate,
  handleDeactivate,
  handleBlock,
  handleDelete,
}: UserTableProps) {
  const columns = [
    {
      key: "name",
      header: "User Details",
      render: (user: UserItem) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 text-slate-700 font-bold rounded-xl flex items-center justify-center">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
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
      key: "id",
      header: "ID",
      render: (user: UserItem) => <span className="font-mono text-slate-500 font-bold text-xs">{user.id}</span>,
    },
    {
      key: "role",
      header: "Role",
      render: (user: UserItem) => (
        <span
          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
            user.role === "Customer" ? "bg-indigo-50 text-indigo-700" : "bg-teal-50 text-teal-700"
          }`}
        >
          {user.role}
        </span>
      ),
    },
    {
      key: "joined",
      header: "Joined Date",
    },
    {
      key: "status",
      header: "Status",
      render: (user: UserItem) => (
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
      render: (user: UserItem) => (
        <div className="relative flex justify-end">
          <button
            onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <MoreVertical size={16} />
          </button>

          {openDropdownId === user.id && (
            <>
              {/* Click outside overlay */}
              <div className="fixed inset-0 z-40" onClick={() => setOpenDropdownId(null)} />

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <Link
                  href={`/dashbord/users/${user.id}`}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                >
                  <Eye size={14} className="text-slate-400" /> View Details
                </Link>

                {user.status !== "active" && (
                  <button
                    onClick={() => {
                      handleActivate(user.id);
                      setOpenDropdownId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 font-medium"
                  >
                    <ShieldCheck size={14} /> Activate User
                  </button>
                )}

                {user.status !== "inactive" && (
                  <button
                    onClick={() => {
                      handleDeactivate(user.id);
                      setOpenDropdownId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2 font-medium"
                  >
                    <XCircle size={14} /> Deactivate User
                  </button>
                )}

                {user.status !== "blocked" && (
                  <button
                    onClick={() => {
                      handleBlock(user.id);
                      setOpenDropdownId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#E0530A] hover:bg-[#FFF8F4] flex items-center gap-2 font-medium"
                  >
                    <XCircle size={14} /> Block User
                  </button>
                )}

                {role !== "agent" && (
                  <>
                    <div className="h-px bg-slate-100 my-1 mx-2" />
                    <button
                      onClick={() => {
                        handleDelete(user.id);
                        setOpenDropdownId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-[#E0530A] hover:bg-[#FFF8F4] flex items-center gap-2 font-medium"
                    >
                      <Trash2 size={14} /> Delete User
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={users}
      searchKey="name"
      searchPlaceholder="Search users by name..."
      filterKey="status"
      filterPlaceholder="All Statuses"
      filterOptions={[
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Blocked", value: "blocked" },
      ]}
      pageSize={5}
    />
  );
}
