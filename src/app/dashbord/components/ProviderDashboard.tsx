"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetAllProfilesQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} from "@/redux/features/shared/profileApi";
import { useGetAllCategoriesQuery } from "@/redux/features/admin/category";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/features/admin/booking";
import { toast } from "sonner";
import {
  DollarSign,
  CheckCircle2,
  Calendar,
  Star,
  MapPin,
  ChevronRight,
  Phone,
  Building,
  Briefcase,
  FileText,
  Globe,
} from "lucide-react";

export default function ProviderDashboard() {
  const authUser = useAppSelector((state) => state.auth.user);
  const { data: profilesRes } = useGetAllProfilesQuery();
  const { data: categoriesRes } = useGetAllCategoriesQuery();

  const [createProfileMut, { isLoading: isCreating }] = useCreateProfileMutation();
  const [updateProfileMut, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);

  const myProfile = profilesRes?.data?.find(
    (p: any) =>
      p.user?.id === authUser?.id ||
      p.user?.id === Number(authUser?.id) ||
      p.user_id === authUser?.id ||
      p.user_id === Number(authUser?.id)
  );

  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const { data: bookingsRes } = useGetAllBookingsQuery(undefined);
  const myBookings =
    bookingsRes?.data?.filter(
      (b: any) => b.vendor?.id === authUser?.id || b.vendor?._id === authUser?.id
    ) || [];

  const completedBookings = myBookings.filter((b) => b.status === "completed");
  const todayEarnings = completedBookings.reduce((sum, b) => {
    const completedDate = new Date(b.updatedAt).toDateString();
    const today = new Date().toDateString();
    if (completedDate === today) {
      return sum + Number(b.total_price || 0);
    }
    return sum;
  }, 0);

  const stats = [
    {
      label: "Today's Earnings",
      value: `৳${todayEarnings.toLocaleString()}`,
      desc: "From completed bookings",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Projects completed",
      value: completedBookings.length.toString(),
      desc: "Total projects completed",
      icon: CheckCircle2,
      color: "text-teal-600 bg-teal-50",
    },
    {
      label: "Starting Price",
      value: myProfile?.min_starting_price !== undefined ? `৳${myProfile.min_starting_price}` : "N/A",
      desc: "Minimum starting price",
      icon: Calendar,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      label: "My Rating",
      value: myProfile?.rating !== undefined ? `${myProfile.rating} / 5` : "New",
      desc: myProfile?.company_name || "Professional Profile",
      icon: Star,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  const providerJobs = myBookings.map((b) => ({
    id: String(b.id),
    customer: b.user?.name || "Unknown Customer",
    phone: b.user?.phone || "N/A",
    address: b.location || "N/A",
    service: b.nestedService?.name || b.pkg?.name || "Service",
    time: `${b.date || ""} ${b.time || ""}`,
    amount: `৳${Number(b.total_price || 0).toLocaleString()}`,
    status: b.status,
  }));

  const [activeJob, setActiveJob] = useState<string | null>(null);

  useEffect(() => {
    if (!activeJob && providerJobs.length > 0) {
      setActiveJob(providerJobs[0].id);
    }
  }, [providerJobs, activeJob]);

  const updateJobStatus = async (id: string, newStatus: string) => {
    try {
      await updateBookingStatus({ id, status: newStatus.toLowerCase().replace(/\s+/g, "_") }).unwrap();
      toast.success(`Booking ${id} status updated to ${newStatus}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  const activeJobDetails = providerJobs.find((j) => j.id === activeJob);

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profileData: any = {
      type: formData.get("type") as "personal" | "company",
      company_name: (formData.get("company_name") as string) || undefined,
      description: (formData.get("description") as string) || undefined,
      location: (formData.get("location") as string) || undefined,
      min_starting_price: formData.get("min_starting_price")
        ? Number(formData.get("min_starting_price"))
        : undefined,
      google_map_link: (formData.get("google_map_link") as string) || undefined,
      category_id: formData.get("category_id") ? Number(formData.get("category_id")) : undefined,
    };

    try {
      if (myProfile) {
        await updateProfileMut({ id: myProfile.id, data: profileData }).unwrap();
        toast.success("Business profile updated successfully!");
        setIsEditingProfile(false);
      } else {
        profileData.user_id = Number(authUser?.id);
        await createProfileMut(profileData).unwrap();
        toast.success("Business profile created successfully!");
        setIsCreatingProfile(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save profile. Please check validation.");
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-200">
      {/* Header */}
      <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-sm px-7 py-6">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-teal-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 text-teal-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse inline-block" />
              Provider Mode
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Provider Dashboard</h1>
            <p className="text-slate-400 mt-1.5 text-sm font-medium">
              Hello,{" "}
              <span className="text-slate-600 font-semibold text-wrap">
                {authUser?.name || myProfile?.company_name || "Provider"}
              </span>
              ! Manage your active schedules and monitor earnings.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-slate-100 p-3 rounded-2xl shadow-sm shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-700">Online &amp; Available</span>
            <button className="text-xs font-semibold text-[#FF6014] bg-[#FFF8F4] hover:bg-[#FFF0EB]/50 px-3 py-1.5 rounded-xl transition-all">
              Toggle Offline
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="group bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3 sm:gap-4 hover:shadow-lg hover:shadow-slate-100/80 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <div
                className={`p-2.5 sm:p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-200 shrink-0`}
              >
                <Icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-slate-400 font-semibold truncate">{stat.label}</p>
                <h4 className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-0.5 leading-tight tracking-tight">
                  {stat.value}
                </h4>
                <span className="text-[10px] sm:text-xs text-slate-400 mt-1 block font-medium leading-tight">
                  {stat.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Jobs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jobs List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">My Job Schedule</h3>

          <div className="space-y-4">
            {providerJobs.map((job) => {
              const currentStatus = job.status;
              return (
                <div
                  key={job.id}
                  onClick={() => setActiveJob(job.id)}
                  className={`p-4 border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md cursor-pointer transition-all ${
                    activeJob === job.id ? "border-[#FF6014]/40 bg-[#FFF8F4]/20" : "border-slate-100"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#FF6014]">#{job.id}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          currentStatus === "completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : currentStatus === "on_the_way"
                            ? "bg-indigo-50 text-indigo-700"
                            : currentStatus === "assigned"
                            ? "bg-amber-50 text-amber-700"
                            : currentStatus === "cancelled"
                            ? "bg-red-50 text-red-700"
                            : "bg-slate-50 text-slate-700"
                        }`}
                      >
                        {currentStatus.replace(/_/g, " ")}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-800">{job.service}</h4>
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <MapPin size={14} /> {job.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{job.amount}</p>
                      <p className="text-xs text-slate-400">{job.time}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {activeJobDetails && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-950">Job Console</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  Update current status of Booking {activeJobDetails.id}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Client Contact</p>
                  <h5 className="text-sm font-bold text-slate-850">{activeJobDetails.customer}</h5>
                  <p className="text-xs font-semibold text-[#FF6014] flex items-center gap-1">
                    <Phone size={12} /> {activeJobDetails.phone}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Update Status</p>
                  {activeJobDetails.status !== "completed" && activeJobDetails.status !== "cancelled" ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => updateJobStatus(activeJobDetails.id, "On The Way")}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                          activeJobDetails.status === "on_the_way"
                            ? "bg-amber-500 border-amber-500 text-white"
                            : "border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        On The Way
                      </button>
                      <button
                        onClick={() => updateJobStatus(activeJobDetails.id, "Completed")}
                        className="w-full py-2.5 rounded-xl text-xs font-semibold border transition-all border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 text-slate-700"
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => updateJobStatus(activeJobDetails.id, "Cancelled")}
                        className="w-full py-2.5 rounded-xl text-xs font-semibold border transition-all border-slate-200 hover:bg-red-50 hover:text-red-600 text-red-505 text-red-600"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-center text-xs font-semibold flex items-center justify-center gap-1.5">
                      <CheckCircle2 size={16} /> Job Completed successfully!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Business Profile Console */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Business Profile</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage your commercial profile details</p>
              </div>
              {!isEditingProfile && !isCreatingProfile && myProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-xs font-semibold text-[#FF6014] hover:text-[#E0530A] px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditingProfile || isCreatingProfile || !myProfile ? (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                {!myProfile && !isCreatingProfile && (
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-2">
                    <p className="text-xs text-amber-800 font-semibold leading-relaxed">
                      You haven't set up your business profile yet. Complete your profile setup to receive bookings
                      and show up in searches!
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCreatingProfile(true)}
                      className="text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg transition-all"
                    >
                      Set Up Profile Now
                    </button>
                  </div>
                )}

                {(isCreatingProfile || myProfile) && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Profile Type
                        </label>
                        <select
                          name="type"
                          defaultValue={myProfile?.type || "personal"}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#FF6014]/40"
                          required
                        >
                          <option value="personal">Personal</option>
                          <option value="company">Company</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Starting Price (৳)
                        </label>
                        <input
                          name="min_starting_price"
                          type="number"
                          placeholder="800"
                          defaultValue={myProfile?.min_starting_price}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#FF6014]/40"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Company/Business Name
                      </label>
                      <input
                        name="company_name"
                        type="text"
                        placeholder="e.g. Rana AC Services"
                        defaultValue={myProfile?.company_name}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#FF6014]/40"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Business Category
                      </label>
                      <select
                        name="category_id"
                        defaultValue={myProfile?.category?.id || ""}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#FF6014]/40"
                      >
                        <option value="">Select a Category</option>
                        {categoriesRes?.data?.map((cat: any) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Service Location
                      </label>
                      <input
                        name="location"
                        type="text"
                        placeholder="e.g. Mirpur, Dhaka"
                        defaultValue={myProfile?.location}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#FF6014]/40"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Business Description
                      </label>
                      <textarea
                        name="description"
                        rows={3}
                        placeholder="Describe your expertise and service quality..."
                        defaultValue={myProfile?.description}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#FF6014]/40"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Google Maps Link
                      </label>
                      <input
                        name="google_map_link"
                        type="url"
                        placeholder="https://maps.google.com/..."
                        defaultValue={myProfile?.google_map_link}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-[#FF6014]/40"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={isCreating || isUpdating}
                        className="flex-1 py-2 bg-[#FF6014] hover:bg-[#E0530A] text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                      >
                        {isCreating || isUpdating ? "Saving..." : "Save Details"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setIsCreatingProfile(false);
                        }}
                        className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FFF8F4] rounded-xl flex items-center justify-center text-[#FF6014] font-bold shrink-0">
                    <Building size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-850">{myProfile.company_name}</h4>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-500 capitalize">
                      {myProfile.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-750">Location</p>
                      <p className="text-slate-500">{myProfile.location || "Not provided"}</p>
                    </div>
                  </div>

                  {myProfile.category && (
                    <div className="flex items-start gap-2.5">
                      <Briefcase size={14} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-750">Category</p>
                        <p className="text-slate-500">{myProfile.category.name}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5">
                    <FileText size={14} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-750">Description</p>
                      <p className="text-slate-500 leading-relaxed">{myProfile.description || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <DollarSign size={14} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-750">Min Starting Price</p>
                      <p className="text-slate-500">৳{myProfile.min_starting_price || "Not set"}</p>
                    </div>
                  </div>

                  {myProfile.google_map_link && (
                    <div className="flex items-start gap-2.5">
                      <Globe size={14} className="text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-750">Location Link</p>
                        <a
                          href={myProfile.google_map_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#FF6014] hover:underline font-semibold"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
