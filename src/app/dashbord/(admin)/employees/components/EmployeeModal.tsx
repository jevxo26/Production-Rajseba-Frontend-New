"use client";

import React from "react";
import { XCircle } from "lucide-react";
import { LocationCascader } from "@/components/ui/LocationCascader";

interface EmployeeModalProps {
  mode: "create" | "edit";
  step?: 1 | 2;
  editingEmployee?: any;
  isAddModalOpen?: boolean;
  setIsAddModalOpen?: (val: boolean) => void;
  closeCreateModal?: () => void;
  handleCreateUser?: (e: React.FormEvent<HTMLFormElement>) => void;
  isCreating?: boolean;
  handleCreateProfile?: (e: React.FormEvent<HTMLFormElement>) => void;
  isCreatingProfile?: boolean;
  handleEditEmployee?: (e: React.FormEvent<HTMLFormElement>) => void;
  isUpdatingProfile?: boolean;
  role: string;
  vendorOptions: any[];
  isUsersLoading: boolean;
  isCategoriesLoading: boolean;
  allCategories: any[];
  selectedDevision: string;
  setSelectedDevision: (val: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (val: string) => void;
  selectedArea: string;
  setSelectedArea: (val: string) => void;
  setIsEditModalOpen?: (val: boolean) => void;
  setEditingEmployee?: (val: any) => void;
}

export default function EmployeeModal({
  mode,
  step = 1,
  editingEmployee,
  closeCreateModal,
  handleCreateUser,
  isCreating,
  handleCreateProfile,
  isCreatingProfile,
  handleEditEmployee,
  isUpdatingProfile,
  role,
  vendorOptions,
  isUsersLoading,
  isCategoriesLoading,
  allCategories,
  selectedDevision,
  setSelectedDevision,
  selectedDistrict,
  setSelectedDistrict,
  selectedArea,
  setSelectedArea,
  setIsEditModalOpen,
  setEditingEmployee,
}: EmployeeModalProps) {
  if (mode === "create") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 my-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              {step === 1 ? "Step 1: Employee Account" : "Step 2: Employee Profile"}
            </h2>
            <button
              onClick={closeCreateModal}
              className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full p-1.5 transition-all"
            >
              <XCircle size={24} />
            </button>
          </div>

          {step === 1 ? (
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all"
                  placeholder="01XXXXXXXXX"
                />
              </div>
              {role !== "vendor" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Vendor</label>
                  <select
                    name="vendor_id"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all"
                  >
                    <option value="">No Vendor (Optional)</option>
                    {isUsersLoading ? (
                      <option value="" disabled>
                        Loading vendors...
                      </option>
                    ) : (
                      vendorOptions.map((v: any) => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              )}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-dark rounded-xl transition-all disabled:opacity-50"
                >
                  {isCreating ? "Saving..." : "Next Step"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCreateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
                  Categories (Hold Ctrl/Cmd to select multiple)
                </label>
                <select
                  multiple
                  name="category_ids"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all h-24"
                >
                  {isCategoriesLoading ? (
                    <option value="" disabled>
                      Loading categories...
                    </option>
                  ) : (
                    allCategories.map((c: any) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <LocationCascader
                  selectedDevisionId={selectedDevision}
                  selectedDistrictId={selectedDistrict}
                  selectedAreaId={selectedArea}
                  onDevisionChange={setSelectedDevision}
                  onDistrictChange={setSelectedDistrict}
                  onAreaChange={setSelectedArea}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
                  Specific Location (Optional)
                </label>
                <input
                  name="location"
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                  placeholder="City, Region"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all resize-none"
                  placeholder="Briefly describe the employee's skills..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Min Starting Price</label>
                  <input
                    name="min_starting_price"
                    type="number"
                    step="0.01"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Google Map Link</label>
                  <input
                    name="google_map_link"
                    type="url"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#FF6014]/40 focus:ring-2 focus:ring-rose-100 transition-all"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isCreatingProfile}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-dark rounded-xl transition-all disabled:opacity-50"
                >
                  {isCreatingProfile ? "Saving..." : "Complete Profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Edit Employee</h2>
          <button
            onClick={() => {
              if (setIsEditModalOpen) setIsEditModalOpen(false);
              if (setEditingEmployee) setEditingEmployee(null);
            }}
            className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full p-1.5 transition-all"
          >
            <XCircle size={24} />
          </button>
        </div>

        <form onSubmit={handleEditEmployee} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <h3 className="font-bold text-slate-700 border-b pb-2 mb-2">Account Details</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Full Name</label>
            <input
              name="name"
              type="text"
              defaultValue={editingEmployee.name}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Email Address</label>
            <input
              name="email"
              type="email"
              defaultValue={editingEmployee.email}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Phone Number</label>
            <input
              name="phone"
              type="tel"
              defaultValue={editingEmployee.phone !== "No Phone" ? editingEmployee.phone : ""}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
            />
          </div>

          <h3 className="font-bold text-slate-700 border-b pb-2 mb-2 mt-4">Profile Details</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Categories (Hold Ctrl/Cmd to select multiple)
            </label>
            <select
              multiple
              name="category_ids"
              defaultValue={editingEmployee.categoryIds?.map(String)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all h-24"
            >
              {isCategoriesLoading ? (
                <option value="" disabled>
                  Loading categories...
                </option>
              ) : (
                allCategories.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Location</label>
            <input
              name="location"
              type="text"
              defaultValue={editingEmployee.location}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Description</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={editingEmployee.description}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all resize-none"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Min Starting Price</label>
              <input
                name="min_starting_price"
                type="number"
                step="0.01"
                defaultValue={editingEmployee.min_starting_price}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Google Map Link</label>
              <input
                name="google_map_link"
                type="url"
                defaultValue={editingEmployee.google_map_link}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                if (setIsEditModalOpen) setIsEditModalOpen(false);
                if (setEditingEmployee) setEditingEmployee(null);
              }}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="px-5 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-dark rounded-xl transition-all disabled:opacity-50"
            >
              {isUpdatingProfile ? "Saving..." : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
