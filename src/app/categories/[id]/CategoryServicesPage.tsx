"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ServiceListing from "@/components/home/services/ServiceListing";
import { useGetPublicCategoryByIdQuery } from "@/redux/features/landing/landingApi";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FilterState {
  activeCategory: string;
  searchQuery: string;
  selectedRating: string;
  sortBy: string;
  priceMax: number;
  selectedAvailability: string[];
  currentPage: number;
}

const PRICE_CEIL = 5000;

function buildURL(params: Record<string, string>): string {
  const filtered = Object.fromEntries(Object.entries(params).filter(([, v]) => v));
  const qs = new URLSearchParams(filtered).toString();
  return qs ? `?${qs}` : "";
}

export default function CategoryServicesPage({ categoryId }: { categoryId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: categoryRes, isLoading: isCatLoading } = useGetPublicCategoryByIdQuery(
    Number(categoryId)
  );
  const category = categoryRes?.data || categoryRes;

  // Use category id as the active filter — this matches our updated ServiceListing filter logic
  const [filters, setFiltersState] = useState<FilterState>({
    activeCategory: categoryId,
    searchQuery: searchParams.get("q") || "",
    selectedRating: searchParams.get("min_rating") || "",
    sortBy: searchParams.get("sort") || "popularity",
    priceMax: Number(searchParams.get("price_max")) || PRICE_CEIL,
    selectedAvailability: (searchParams.get("availability") || "").split(",").filter(Boolean),
    currentPage: Number(searchParams.get("page")) || 1,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const setFilters = useCallback((partial: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isFilterOpen]);

  const handleClearAll = useCallback(() => {
    setFiltersState({
      activeCategory: categoryId,
      searchQuery: "",
      selectedRating: "",
      sortBy: "popularity",
      priceMax: PRICE_CEIL,
      selectedAvailability: [],
      currentPage: 1,
    });
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-slate-50/30 relative">
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-[url('/bg-icons-design.png')] bg-repeat opacity-10 pointer-events-none z-0"
        style={{ backgroundSize: "auto" }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 py-5 md:py-6 flex items-center gap-4">
            <Link
              href="/services"
              className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-[#FF7C71] transition-colors"
            >
              <ArrowLeft size={16} />
              All Services
            </Link>
            <span className="text-slate-300">/</span>

            {isCatLoading ? (
              <div className="h-5 w-32 bg-slate-200 animate-pulse rounded-lg" />
            ) : (
              <>
                <div className="flex items-center gap-3">
                  {category?.icon && (
                    <img
                      src={category.icon}
                      alt={category?.name}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-100 shadow-sm"
                    />
                  )}
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                      {category?.name || "Category"}
                    </h1>
                    {category?.description && (
                      <p className="text-xs text-slate-400 font-medium mt-0.5 max-w-md line-clamp-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Services Listing */}
        <div className="max-w-[1400px] mx-auto px-4 pt-4">
          <ServiceListing
            filters={filters}
            setFilters={setFilters}
            onClearAll={handleClearAll}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
        </div>
      </div>
    </div>
  );
}
