"use client"

import * as React from "react"
import { useAppSelector } from "@/redux/hooks";
import { getRoleName } from "@/redux/features/auth/authSlice";
import {
  ShieldAlert,
  Heart,
  Star,
  Plus,
  ArrowRight,
  History,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { useGetSavedServicesQuery, useToggleSavedServiceMutation } from "@/redux/features/admin/user";

export default function SavedServicesPage() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";

  const { data: savedServicesRes, isLoading } = useGetSavedServicesQuery();
  const [toggleSavedService] = useToggleSavedServiceMutation();

  const savedServices = savedServicesRes?.data || [];

  const [recentlyViewed, setRecentlyViewed] = React.useState([
    {
      id: "r1",
      title: "Fridge Repair",
      provider: "Pro Techs",
      price: "৳1,500",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "r2",
      title: "Smart Lock Pro",
      provider: "Security Hub",
      price: "৳2,200",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=100&auto=format&fit=crop&q=80",
    },
  ])

  const handleUnsave = async (id: string | number) => {
    try {
      await toggleSavedService(id).unwrap();
    } catch (err) {
      console.error("Failed to unsave service", err);
    }
  }

  const handleClearHistory = () => {
    setRecentlyViewed([])
  }

  if (role !== "client") {
    return <AccessDenied roleRequired="Customer" />
  }

  return (
    <div className="w-full animate-in fade-in duration-200">
      <div className="w-full space-y-10 relative z-10">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FFF8F7] text-[#FF7C71] rounded-2xl">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">Saved Services</h1>
              <p className="text-xs text-slate-400 mt-0.5">Manage your collection of preferred home services.</p>
            </div>
          </div>
        </div>

        {/* Services Grid (Saved list + Discover card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-slate-400">Loading saved services...</div>
          ) : savedServices.length === 0 ? (
            <div className="col-span-full bg-white p-8 rounded-[24px] border border-dashed border-slate-200 text-center shadow-sm">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-3">
                <Heart size={20} />
              </div>
              <p className="text-slate-400 text-sm font-semibold">You haven't saved any services yet.</p>
            </div>
          ) : savedServices.map((service: any) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative"
            >
              {/* Image with Filled Heart overlay */}
              <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden">
                <img
                  src={service.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80"}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => handleUnsave(service.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full text-[#FF7C71] hover:scale-110 transition-transform shadow-md focus:outline-none"
                >
                  <Heart size={14} className="fill-current" />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-800 text-sm">{service.name}</h3>
                    <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
                      <Star size={11} className="fill-current" /> 4.8
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold line-clamp-2">{service.subtitle || service.description || "Top-rated service."}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                  <Link
                    href={`/services/${service.slug}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/services/${service.slug}`}
                    className="bg-[#FF7C71] hover:bg-[#FF7C71] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-[#FF7C71]/10 active:scale-[0.98]"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Discover More Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-dashed border-slate-200 p-6 flex flex-col justify-between items-center text-center shadow-sm">
            <div className="my-auto space-y-4">
              <div className="w-12 h-12 bg-[#FFF8F7] rounded-full flex items-center justify-center text-[#FF7C71] mx-auto border border-[#FFEBE9]">
                <Plus size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-slate-800 text-sm">Discover More</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold max-w-[200px] mx-auto">
                  Want to explore more options? Check out our trending services this month.
                </p>
              </div>
            </div>
            
            <Link
              href="/dashbord/quick-booking"
              className="mt-6 w-full bg-white hover:bg-slate-50 border border-slate-100 text-[#FF7C71] text-xs font-bold py-2.5 rounded-2xl transition-colors text-center"
            >
              Find More Services
            </Link>
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recently Viewed</h2>
              <p className="text-xs text-slate-400 mt-0.5 font-semibold">Services you explored in the last 24 hours.</p>
            </div>
            <Link href="/dashbord/quick-booking" className="text-xs font-bold text-[#FF7C71] hover:underline flex items-center gap-0.5">
              View All <ChevronRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyViewed.map((view) => (
              <div
                key={view.id}
                className="bg-white p-3 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={view.image}
                  alt={view.title}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-800">{view.title}</h4>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{view.provider}</span>
                  <span className="text-xs font-black text-slate-800 block mt-1">{view.price}</span>
                </div>
              </div>
            ))}

            {/* Clear History Card */}
            {recentlyViewed.length > 0 ? (
              <button
                onClick={handleClearHistory}
                className="bg-white/80 p-3 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4 hover:bg-[#FFF8F7]/20 group transition-all text-left focus:outline-none w-full"
              >
                <div className="w-16 h-16 bg-[#FFF8F7] rounded-2xl flex items-center justify-center text-[#FF7C71] group-hover:scale-105 transition-transform shrink-0">
                  <History size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Clear History</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Remove recent views</p>
                </div>
              </button>
            ) : (
              <div className="bg-slate-50/50 p-4 rounded-[24px] border border-dashed border-slate-200 text-center text-xs text-slate-400 flex items-center justify-center min-h-[88px] col-span-3">
                No recent history.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

function AccessDenied({ roleRequired }: { roleRequired: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center animate-in fade-in duration-200">
      <div className="p-4 bg-[#FFF8F7] rounded-2xl text-[#FF7C71] mb-4">
        <ShieldAlert size={48} />
      </div>
      <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">
        This subpage is only accessible to users with the <strong className="text-slate-800">{roleRequired}</strong> role. 
        Please toggle your preview role using the selector at the top.
      </p>
    </div>
  )
}
