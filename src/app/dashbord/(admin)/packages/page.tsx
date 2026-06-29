"use client";

import { ShieldAlert, PlusCircle, Package as PackageIcon } from "lucide-react";
import PackageModal from "./components/PackageModal";
import DeletePackageModal from "./components/DeletePackageModal";
import PackageTable from "./components/PackageTable";
import { usePackageState } from "./hooks/usePackageState";

export default function AdminPackagesManagementPage() {
  const {
    role,
    isPackagesLoading,
    packages,
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
    price,
    setPrice,
    featuresStr,
    setFeaturesStr,
    serviceId,
    setServiceId,
    selectedNestedIds,
    serviceOptions,
    availableNestedServices,
    openCreateModal,
    openEditModal,
    toggleNestedService,
    handleSubmit,
    openDeleteModal,
    handleDelete,
    isCreating,
    isUpdating,
  } = usePackageState();

  if (role !== "superadmin") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center animate-in fade-in duration-200">
        <div className="p-4 bg-[#FFF8F4] rounded-2xl text-[#FF6014] mb-4">
          <ShieldAlert size={48} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm">This panel is restricted to Administrators only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
            <PackageIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Package Directory</h1>
            <p className="text-xs text-slate-400 mt-0.5">Manage service packages across all vendors.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openCreateModal}
            className="bg-brand-primary hover:bg-brand-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-brand-primary/10"
          >
            <PlusCircle size={18} /> Add Package
          </button>
        </div>
      </div>

      {/* Table */}
      {isPackagesLoading ? (
        <div className="flex items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm">
          <div className="w-8 h-8 border-4 border-[#FF6014] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : packages.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100/50">
            <PackageIcon size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Packages Found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            No packages have been created yet across any vendor.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 bg-[#FFF8F4] hover:bg-[#FFF0EB] text-[#FF6014] font-bold px-4 py-2 rounded-xl text-xs transition-all"
          >
            Create New Package
          </button>
        </div>
      ) : (
        <PackageTable packages={packages} openEditModal={openEditModal} openDeleteModal={openDeleteModal} />
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <PackageModal
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
          description={description}
          setDescription={setDescription}
          featuresStr={featuresStr}
          setFeaturesStr={setFeaturesStr}
          selectedNestedIds={selectedNestedIds}
          toggleNestedService={toggleNestedService}
          availableNestedServices={availableNestedServices}
          isCreating={isCreating}
          isUpdating={isUpdating}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeletePackageModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        itemToDelete={itemToDelete}
        setItemToDelete={setItemToDelete}
        handleDelete={handleDelete}
      />
    </div>
  );
}
