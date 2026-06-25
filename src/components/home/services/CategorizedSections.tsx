"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Sparkles, Loader2 } from "lucide-react";
import { TbAirConditioning, TbScissors, TbTruck } from "react-icons/tb";
import {
  FaFaucet,
  FaBolt,
  FaTv,
  FaPaintRoller,
  FaLeaf,
  FaBug,
  FaHammer,
} from "react-icons/fa";
import { MdOutlineCleaningServices, MdOutlineSecurity } from "react-icons/md";
import {
  useGetPublicCategoriesQuery,
  useGetPublicNestedServicesQuery,
} from "@/redux/features/landing/landingApi";

// Dynamic Icon Map lookup helper
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  "cleaning": MdOutlineCleaningServices,
  "ac-repair": TbAirConditioning,
  "ac": TbAirConditioning,
  "plumbing": FaFaucet,
  "electrical": FaBolt,
  "carpentry": FaHammer,
  "painting": FaPaintRoller,
  "salon-spa": TbScissors,
  "salon": TbScissors,
  "home-salon": TbScissors,
  "gardening": FaLeaf,
  "pest-control": FaBug,
  "shifting": TbTruck,
  "cctv": MdOutlineSecurity,
  "security": MdOutlineSecurity,
  "appliance": FaTv,
  "appliance-repair": FaTv,
};

const getCategoryIcon = (slug: string) => {
  return ICON_MAP[slug] || ICON_MAP[slug.replace("-services", "")] || ICON_MAP[slug.replace("-repair", "")] || LayoutGrid;
};

const SectionHeader = ({ title, viewAllHref }: { title: string; viewAllHref?: string }) => (
  <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
    <div className="relative">
      <h3 className="text-lg md:text-xl font-black text-slate-800 tracking-tight capitalize">
        {title}
      </h3>
      <div className="absolute -bottom-[3px] left-0 w-12 h-[3px] bg-[#FF7C71] rounded-full" />
    </div>
    {viewAllHref && (
      <Link
        href={viewAllHref}
        className="text-xs font-extrabold text-[#FF7C71] hover:text-[#E5675D] transition-colors flex items-center gap-1 uppercase tracking-wider"
      >
        View All <ArrowRight size={13} strokeWidth={2.5} />
      </Link>
    )}
  </div>
);

export default function CategorizedSections() {
  const { data: categoriesRes, isLoading: isCategoriesLoading } = useGetPublicCategoriesQuery();
  const { data: nestedRes, isLoading: isNestedLoading } = useGetPublicNestedServicesQuery();

  const categories = categoriesRes?.data || (Array.isArray(categoriesRes) ? categoriesRes : []);
  const allNestedServices = nestedRes?.data || (Array.isArray(nestedRes) ? nestedRes : []);

  // Group nested services by category
  const groupedData = useMemo(() => {
    if (!categories.length) return [];

    return categories.map((cat: any) => {
      const catSlug = cat.slug || cat.name?.toLowerCase().replace(/\s+/g, "-") || "";

      // Filter nested services belonging to this category
      const servicesForCategory = allNestedServices.filter((ns: any) => {
        const parentCategory = ns.service?.category;
        return parentCategory?.id === cat.id || parentCategory?.slug === cat.slug;
      });

      return {
        ...cat,
        slug: catSlug,
        services: servicesForCategory,
      };
    }); // Show all categories regardless of whether services are linked yet
  }, [categories, allNestedServices]);

  if (isCategoriesLoading || isNestedLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF7C71]" />
          <p className="text-xs font-bold text-slate-400">Loading categorized services...</p>
        </div>
      </div>
    );
  }

  if (groupedData.length === 0) {
    return null;
  }

  return (
    <div className="space-y-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="inline-flex items-center gap-2 bg-[#FF7C71]/10 border border-[#FF7C71]/20 text-[#FF7C71] px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
          <Sparkles size={13} />
          Explore By Category
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-8">
          Services Catalog
        </h2>
      </div>

      {groupedData.map((category: any) => {
        const Icon = getCategoryIcon(category.slug);

        return (
          <section key={category.id} className="max-w-7xl mx-auto px-4 md:px-6">
            <SectionHeader
              title={category.name}
              viewAllHref={`/services?category=${category.slug}`}
            />

            {category.services.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm font-medium border border-dashed border-slate-200 rounded-2xl">
                No services listed yet for this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.slice(0, 6).map((item: any) => {
                  const priceVal = item.price ? Number(item.price) : 0;

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#FF7C71]/20 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#FFF8F7] text-[#FF7C71] flex items-center justify-center shrink-0 shadow-sm">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-800 text-sm mb-1 leading-snug line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                            {item.description || "Professional services tailored for your home needs."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-4">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Price starts at</span>
                          <span className="text-sm font-black text-slate-900">
                            {priceVal > 0 ? `৳${priceVal.toLocaleString()}` : "Contact"}
                          </span>
                        </div>
                        <Link
                          href={`/categories/service/${item.service?.slug || item.id}`}
                          className="text-xs font-bold text-[#FF7C71] hover:text-[#E5675D] transition-colors flex items-center gap-1"
                        >
                          Book Now <ArrowRight size={13} />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}