"use client";

import { useAppSelector } from "@/redux/hooks";
import { getRoleName } from "@/redux/features/auth/authSlice";
import { User as UserIcon, Phone, MapPin, Mail, Save } from "lucide-react";
import { toast } from "sonner";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import { useUpdateUserMutation } from "@/redux/features/admin/user";
import { useCreateProfileMutation, useUpdateProfileMutation } from "@/redux/features/admin/profile";
import { useGetAllCategoriesQuery } from "@/redux/features/admin/category";

export default function ProfilePage() {
  const role = useAppSelector((state) => state.auth.role) || "client";
  const reduxUser = useAppSelector((state) => state.auth.user);

  const { data: userRes, isLoading: isUserLoading, refetch } = useGetUserProfileQuery();
  const [updateUserMut] = useUpdateUserMutation();
  const [createProfileMut, { isLoading: isCreatingProfile }] = useCreateProfileMutation();
  const [updateProfileMut, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const { data: apiCategoriesRes, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
  
  const allCategories = apiCategoriesRes?.data || (Array.isArray(apiCategoriesRes) ? apiCategoriesRes : []);

  // Prefer API response, fall back to Redux store (which is persisted from localStorage)
  const apiUser = userRes?.data?.user || userRes?.data || userRes;
  const user = (apiUser && Object.keys(apiUser).length > 1 ? apiUser : null) || reduxUser || {};

  const name = (user as any).name || ((user as any).firstName ? `${(user as any).firstName} ${(user as any).lastName || ''}`.trim() : null) || "Unknown User";
  const email = (user as any).email || "No Email";
  const phone = (user as any).phoneNumber || (user as any).phone || "No Phone";
  const address = (user as any).address || "No Address Provided";
  
  const profile = apiUser?.profile;
  const hasProfile = !!profile;


  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedUserData = {
      name: formData.get("name") as string,
      phoneNumber: formData.get("phone") as string,
      address: formData.get("address") as string,
    };
    
    const categoryIdStr = formData.get("category_id")?.toString();
    const profileData = {
      user_id: user.id || user._id,
      category_id: categoryIdStr ? Number(categoryIdStr) : undefined,
      type: formData.get("type")?.toString() || "personal",
      location: formData.get("location")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      company_name: formData.get("company_name")?.toString() || "",
      min_starting_price: formData.get("min_starting_price") ? Number(formData.get("min_starting_price")) : 0,
      google_map_link: formData.get("google_map_link")?.toString() || "",
    };

    try {
      if (user.id || user._id) {
        // Update User
        await updateUserMut({ id: user.id || user._id, data: updatedUserData }).unwrap();
        
        // Update or Create Profile
        if (hasProfile) {
          await updateProfileMut({ id: profile.id, data: profileData }).unwrap();
        } else {
          await createProfileMut(profileData).unwrap();
        }
        
        toast.success("Profile saved successfully!");
        refetch();
      } else {
        toast.error("User ID not found! Cannot update.");
      }
    } catch (err) {
      toast.error("Failed to save profile");
      console.error(err);
    }
  };

  const isSaving = isCreatingProfile || isUpdatingProfile;

  if (isUserLoading && !reduxUser) {
    return <div className="p-8 text-center text-slate-500 animate-pulse">Loading profile...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500 mt-1">Manage personal contact card, addresses, and emergency backup details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Premium ID Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-black text-3xl shadow-inner relative">
            {name?.substring(0, 2).toUpperCase() || "UU"}
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-[10px] text-white">
              ✓
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{name}</h3>
            <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-lg mt-1 inline-block capitalize">
              {getRoleName(role)}
            </span>
          </div>

          <div className="w-full pt-4 border-t border-slate-50 space-y-2 text-xs font-medium text-slate-500 text-left">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-slate-400" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-slate-400" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-slate-400" />
              <span>{address}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Update Forms */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Edit Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Full Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={name !== "Unknown User" ? name : ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Contact Number</label>
                <input
                  name="phone"
                  type="tel"
                  defaultValue={phone !== "No Phone" ? phone : ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Primary Delivery Address</label>
                <input
                  name="address"
                  type="text"
                  defaultValue={address !== "No Address Provided" ? address : ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-semibold"
                  required
                />
              </div>

              <div className="sm:col-span-2 pt-6 pb-2">
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Professional & Public Details</h4>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Profile Type</label>
                <select name="type" required defaultValue={profile?.type || "personal"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-medium">
                  <option value="personal">Personal / Freelancer</option>
                  <option value="company">Company / Agency</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Service Category</label>
                <select name="category_id" required defaultValue={profile?.category?.id || profile?.categoryId || ""} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-medium">
                  <option value="" disabled>Select a category</option>
                  {isCategoriesLoading ? (
                    <option value="" disabled>Loading...</option>
                  ) : (
                    allCategories.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Company / Business Name (Optional)</label>
                <input
                  name="company_name"
                  type="text"
                  defaultValue={profile?.company_name || ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-medium"
                  placeholder="Leave blank if personal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Service Location / City</label>
                <input
                  name="location"
                  type="text"
                  required
                  defaultValue={profile?.location || ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-medium"
                  placeholder="e.g. Dhaka, Gulshan"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Professional Description</label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={profile?.description || ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all resize-none font-medium"
                  placeholder="Describe the services and expertise..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Min Starting Price</label>
                <input
                  name="min_starting_price"
                  type="number"
                  step="0.01"
                  defaultValue={profile?.min_starting_price || ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-medium"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Google Map Link</label>
                <input
                  name="google_map_link"
                  type="url"
                  defaultValue={profile?.google_map_link || ""}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-medium"
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-50">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} /> {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
