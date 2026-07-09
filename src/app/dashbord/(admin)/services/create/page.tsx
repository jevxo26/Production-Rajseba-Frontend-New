"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { uploadImage } from "@/lib/upload";
import { useCreateServiceMutation } from "@/redux/features/admin/service";
import { useGetAllCategoriesQuery } from "@/redux/features/admin/category";
import { useGetAllUsersQuery } from "@/redux/features/admin/user";
import { Sparkles, PlusCircle, Trash2, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/select";
import RichTextEditor from "@/components/ui/RichTextEditor";
import Link from "next/link";

export default function CreateServicePage() {
  const router = useRouter();
  const rawRole = useAppSelector((state) => state.auth.role) || "superadmin";
  const role = typeof rawRole === "string" ? rawRole.toLowerCase().replace(/\s+/g, "") : "client";

  const { data: apiCategoriesRes } = useGetAllCategoriesQuery();
  const { data: apiUsersRes } = useGetAllUsersQuery();
  const [createMut, { isLoading: isCreating }] = useCreateServiceMutation();

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [overview, setOverview] = useState("");
  const [details, setDetails] = useState("");
  const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("NONE");
  const [vendorId, setVendorId] = useState("NONE");
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);
  const [agentCommissionPercentage, setAgentCommissionPercentage] = useState("0");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const allCategories = apiCategoriesRes?.data || (Array.isArray(apiCategoriesRes) ? apiCategoriesRes : []);
  const categoryOptions = [
    { value: "NONE", label: "Select a Category" },
    ...allCategories.map((c: any) => ({
      value: String(c.id),
      label: c.name,
    })),
  ];

  const allUsers = apiUsersRes?.data || (Array.isArray(apiUsersRes) ? apiUsersRes : []);
  const vendorOptions = [
    { value: "NONE", label: "Select a Vendor" },
    ...allUsers
      .filter(
        (u: any) =>
          u.role?.name?.toLowerCase() === "vendor" ||
          (typeof u.role === "string" && u.role.toLowerCase() === "vendor")
      )
      .map((u: any) => ({
        value: String(u.id || u._id),
        label: u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unknown",
      })),
  ];

  const employeeOptions =
    categoryId === "NONE" || vendorId === "NONE"
      ? []
      : allUsers
          .filter((u: any) => u.role?.name === "Employee" || u.role === "Employee")
          .filter((u: any) => String(u.profile?.category?.id) === categoryId)
          .filter((u: any) => String(u.vendor?.id || u.vendor) === vendorId)
          .map((u: any) => ({
            id: Number(u.id || u._id),
            name: u.name || `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unknown",
          }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setImage(url);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Service name is required");
      return;
    }
    if (!slug.trim()) {
      toast.error("Slug is required");
      return;
    }
    try {
      await createMut({
        name: name.trim(),
        subtitle: subtitle.trim() || undefined,
        slug: slug.trim(),
        description: description.trim() || undefined,
        overview: overview.trim() || undefined,
        details: details.trim() || undefined,
        faq: faq.length > 0 ? faq : undefined,
        image: image || undefined,
        category_id: categoryId !== "NONE" ? Number(categoryId) : undefined,
        vendor_id: vendorId !== "NONE" ? Number(vendorId) : undefined,
        employee_ids: employeeIds.length > 0 ? employeeIds : undefined,
        agent_commission_percentage: Number(agentCommissionPercentage) || 0,
      }).unwrap();
      toast.success("Service created successfully!");
      router.push("/dashbord/services");
    } catch (err: any) {
      toast.error(err.data?.message || err.message || "Failed to create service");
    }
  };

  if (role !== "superadmin" && role !== "agent") {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <Link
          href="/dashbord/services"
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="text-rose-500" size={20} /> Create New Service
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Add a new service to the platform.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Service Name *
              </label>
              <Input
                placeholder="e.g. AC Repairing"
                value={name}
                onChange={(e) => {
                  const val = e.target.value;
                  setName(val);
                  setSlug(
                    val
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "")
                  );
                }}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Slug *</label>
              <Input placeholder="e.g. ac-repairing" value={slug} onChange={(e) => setSlug(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Subtitle
              </label>
              <Input placeholder="Short tagline" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Category
              </label>
              <CustomSelect options={categoryOptions} value={categoryId} onChange={setCategoryId} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Agent Commission (%)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 5"
                value={agentCommissionPercentage}
                onChange={(e) => setAgentCommissionPercentage(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Vendor</label>
              <CustomSelect options={vendorOptions} value={vendorId} onChange={setVendorId} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Employees
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-4 border border-slate-200 rounded-xl bg-slate-50">
              {employeeOptions.length > 0 ? (
                employeeOptions.map((emp: any) => (
                  <label key={emp.id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/30"
                      checked={employeeIds.includes(emp.id)}
                      onChange={(e) => {
                        if (e.target.checked) setEmployeeIds([...employeeIds, emp.id]);
                        else setEmployeeIds(employeeIds.filter((id) => id !== emp.id));
                      }}
                    />
                    <span className="text-sm text-slate-700">{emp.name}</span>
                  </label>
                ))
              ) : (
                <span className="text-xs text-slate-400">No employees found. Please select a Category and Vendor first.</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Description
            </label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe this service..."
              minHeight={150}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Overview
            </label>
            <RichTextEditor
              value={overview}
              onChange={setOverview}
              placeholder="Service overview..."
              minHeight={150}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Details</label>
            <RichTextEditor
              value={details}
              onChange={setDetails}
              placeholder="Detailed information..."
              minHeight={150}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">FAQs</label>
              <button
                type="button"
                onClick={() => setFaq([...faq, { question: "", answer: "" }])}
                className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1"
              >
                <PlusCircle size={14} /> Add FAQ
              </button>
            </div>
            <div className="space-y-4">
              {faq.map((f, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 relative"
                >
                  <button
                    type="button"
                    onClick={() => setFaq(faq.filter((_, idx) => idx !== i))}
                    className="absolute -top-2 -right-2 bg-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white rounded-full p-1.5 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <Input
                    placeholder="Question"
                    value={f.question}
                    onChange={(e) => {
                      const newFaq = [...faq];
                      newFaq[i].question = e.target.value;
                      setFaq(newFaq);
                    }}
                  />
                  <RichTextEditor
                    value={f.answer}
                    onChange={(val) => {
                      setFaq(faq.map((item, idx) =>
                        idx === i ? { ...item, answer: val } : item
                      ));
                    }}
                    placeholder="Answer"
                    minHeight={100}
                  />
                </div>
              ))}
              {faq.length === 0 && <p className="text-sm text-slate-400 italic">No FAQs added yet.</p>}
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Service Image
            </label>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-20 h-20 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 relative group shadow-sm">
                {image ? (
                  <>
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-150 rounded-2xl"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <ImageIcon className="text-slate-400" size={24} />
                )}
              </div>
              <label className="cursor-pointer bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold px-4 py-2.5 rounded-lg inline-flex items-center gap-2 transition-all active:scale-[0.98]">
                {isUploadingImage ? "Uploading..." : "Browse Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashbord/services")}
              className="px-6 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || isUploadingImage}
              className="bg-brand-primary hover:bg-brand-dark disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all active:scale-[0.98] shadow-md shadow-brand-primary/10"
            >
              {isCreating ? "Creating..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
