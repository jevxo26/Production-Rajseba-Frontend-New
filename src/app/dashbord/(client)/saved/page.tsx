"use client";

import React from "react";
import { Heart, Loader2, BookOpen } from "lucide-react";
import Link from "next/link";
import AccessDenied from "../components/AccessDenied";
import SavedServiceCard from "./components/SavedServiceCard";
import DiscoverMoreCard from "./components/DiscoverMoreCard";
import { useSavedServicesState } from "./hooks/useSavedServicesState";

export default function SavedServicesPage() {
  const { role, savedServices, isLoading, handleUnsave } = useSavedServicesState();

  if (role !== "client") {
    return <AccessDenied roleRequired="Customer" />;
  }

  return (
    <div className="w-full animate-in fade-in duration-200">
      <div className="w-full space-y-10 relative z-10">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">Saved Services</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {isLoading
                  ? "Loading..."
                  : `${savedServices.length} service${savedServices.length !== 1 ? "s" : ""} saved to your wishlist.`}
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-[#FF6014]" />
            </div>
          ) : savedServices.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-[24px] border border-dashed border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                <Heart size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-700 mb-1">No saved services yet</h3>
              <p className="text-sm text-slate-400 font-medium mb-5">
                Tap the ♥ heart icon on any service card to save it here.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-[#FF6014] hover:bg-[#E0530A] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm"
              >
                <BookOpen size={14} />
                Browse Services
              </Link>
            </div>
          ) : (
            <>
              {savedServices.map((service: any) => (
                <SavedServiceCard key={service.id} service={service} handleUnsave={handleUnsave} />
              ))}
              <DiscoverMoreCard />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
