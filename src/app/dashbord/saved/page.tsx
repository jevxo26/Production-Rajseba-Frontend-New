"use client";

import { useRole } from "@/context/RoleContext";
import { ShieldAlert, Heart, Star, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface SavedItem {
  id: string;
  provider: string;
  category: string;
  rating: string;
  jobsCompleted: number;
  startingPrice: string;
  availability: string;
}

export default function SavedServicesPage() {
  const { role } = useRole();
  const [items, setItems] = useState<SavedItem[]>([
    {
      id: "SP-101",
      provider: "Kabir AC Repair",
      category: "AC Servicing & Repair",
      rating: "4.86",
      jobsCompleted: 142,
      startingPrice: "৳450",
      availability: "Available Today",
    },
    {
      id: "SP-102",
      provider: "Clean & Bright",
      category: "Home & Sofa Cleaning",
      rating: "4.72",
      jobsCompleted: 88,
      startingPrice: "৳1,200",
      availability: "Available Tomorrow",
    },
    {
      id: "SP-103",
      provider: "Dhaka Decorators",
      category: "Wall Painting & Decor",
      rating: "4.91",
      jobsCompleted: 210,
      startingPrice: "৳3,000",
      availability: "Bookings Full This Week",
    },
  ]);

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  if (role !== "customer") {
    return <AccessDenied roleRequired="Customer" />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Saved Services</h1>
        <p className="text-slate-500 mt-1">Bookmarked professionals and services for quick reservations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
            >
              {/* Header card visual */}
              <div className="h-24 bg-gradient-to-r from-rose-50 to-orange-50 p-4 flex justify-between items-start">
                <span className="bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-600">
                  {item.category}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 rounded-xl transition-colors shadow-sm"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800 leading-tight group-hover:text-rose-500 transition-colors">
                    {item.provider}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                      ⭐ {item.rating}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">({item.jobsCompleted} Completed)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-semibold">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Starts From</span>
                    <span className="text-slate-800 text-sm font-extrabold">{item.startingPrice}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-lg ${
                    item.availability.includes("Today") || item.availability.includes("Tomorrow")
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {item.availability}
                  </span>
                </div>

                <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition-all active:scale-[0.98]">
                  Book Service Now <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-12 text-center border border-slate-100 rounded-2xl shadow-sm text-slate-400">
            No saved services found. Click the heart icon on search results to bookmark them.
          </div>
        )}
      </div>
    </div>
  );
}

function AccessDenied({ roleRequired }: { roleRequired: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center animate-in fade-in duration-200">
      <div className="p-4 bg-rose-50 rounded-2xl text-rose-500 mb-4">
        <ShieldAlert size={48} />
      </div>
      <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">
        This subpage is only accessible to users with the <strong className="text-slate-800">{roleRequired}</strong> role. 
        Please toggle your preview role using the selector at the top.
      </p>
    </div>
  );
}
