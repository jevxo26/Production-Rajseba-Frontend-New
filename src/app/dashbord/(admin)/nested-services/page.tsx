"use client";

import { ShieldAlert, PlusCircle, Layers } from "lucide-react";
import NestedServiceModal from "./components/NestedServiceModal";
import DeleteNestedServiceModal from "./components/DeleteNestedServiceModal";
import NestedServiceTable from "./components/NestedServiceTable";
import { useNestedServiceState } from "./hooks/useNestedServiceState";

export default function NestedServicesManagementPage() {
  const {
    role,
    isNestedLoading,
    nestedServices,
    isModalOpen,
    setIsModalOpen,
    editingItem,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    itemToDelete,
    setItemToDelete,
    name,
    setName,
    description,
    setDescription,
    image,
    setImage,
    price,
    setPrice,
    subServices,
    setSubServices,
    serviceId,
    setServiceId,
    isUploadingImage,
    serviceOptions,
    handleImageUpload,
    openCreateModal,
    openEditModal,
    handleSubmit,
    openDeleteModal,
    handleDelete,
    isCreating,
    isUpdating,
  } = useNestedServiceState();

  if (role !== "superadmin" && role !== "vendor") {
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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 font-display">
              {role === "vendor" ? "My Sub-Services" : "Nested Service Directory"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {role === "vendor"
                ? "Add and manage sub-services under your main service offerings."
                : "Manage sub-services linked to parent services across all vendors."}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openCreateModal}
            className="bg-brand-primary hover:bg-brand-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-brand-primary/10"
          >
            <PlusCircle size={18} /> Add Sub-Service
          </button>
        </div>
      </div>

      {/* Table */}
      {isNestedLoading ? (
        <div className="flex items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm">
          <div className="w-8 h-8 border-4 border-[#FF6014] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : nestedServices.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100/50">
            <Layers size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Sub-Services Found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            Start by adding a sub-service under one of your existing services.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 bg-[#FFF8F4] hover:bg-[#FFF0EB] text-[#FF6014] font-bold px-4 py-2 rounded-xl text-xs transition-all"
          >
            Add New Sub-Service
          </button>
        </div>
      ) : (
        <NestedServiceTable
          nestedServices={nestedServices}
          openEditModal={openEditModal}
          openDeleteModal={openDeleteModal}
        />
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <NestedServiceModal
          editingItem={editingItem}
          setIsModalOpen={setIsModalOpen}
          handleSubmit={handleSubmit}
          serviceOptions={serviceOptions}
          serviceId={serviceId}
          setServiceId={setServiceId}
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          subServices={subServices}
          setSubServices={setSubServices}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
          isUploadingImage={isUploadingImage}
          handleImageUpload={handleImageUpload}
          isCreating={isCreating}
          isUpdating={isUpdating}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteNestedServiceModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        itemToDelete={itemToDelete}
        setItemToDelete={setItemToDelete}
        handleDelete={handleDelete}
      />
    </div>
  );
}
