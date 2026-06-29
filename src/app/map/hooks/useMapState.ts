"use client";

import { useState, useEffect, useMemo } from "react";
import { Expert } from "@/components/home/map/types";
import { mapProfilesToExperts } from "@/components/home/map/mapVendorUtils";
import {
  useGetPublicProfilesQuery,
  useGetPublicCategoriesQuery,
} from "@/redux/features/landing/landingApi";
import {
  useGetAllDevisionsQuery,
  useGetAllDistrictsQuery,
} from "@/redux/features/admin/location";

const ALL_CATEGORIES = "All Categories";

export function useMapState() {
  const { data: profilesRes, isLoading: isProfilesLoading } = useGetPublicProfilesQuery();
  const { data: categoriesRes } = useGetPublicCategoriesQuery();
  const { data: divisionsRes } = useGetAllDevisionsQuery();
  const { data: districtsRes } = useGetAllDistrictsQuery();

  const rawProfiles = profilesRes?.data ?? (Array.isArray(profilesRes) ? profilesRes : []);
  const allDistricts = districtsRes?.data ?? (Array.isArray(districtsRes) ? districtsRes : []);
  const allDivisions = divisionsRes?.data ?? (Array.isArray(divisionsRes) ? divisionsRes : []);

  const allExperts = useMemo(
    () => mapProfilesToExperts(rawProfiles, allDistricts, allDivisions),
    [rawProfiles, allDistricts, allDivisions]
  );

  const categories = useMemo(() => {
    const apiCategories = categoriesRes?.data ?? (Array.isArray(categoriesRes) ? categoriesRes : []);
    const apiNames = apiCategories.map((cat: any) => cat.name).filter(Boolean);
    if (apiNames.length > 0) return [ALL_CATEGORIES, ...apiNames];
    const fromExperts = Array.from(
      new Set(allExperts.flatMap((expert) => expert.categories).filter(Boolean))
    );
    return [ALL_CATEGORIES, ...fromExperts];
  }, [categoriesRes, allExperts]);

  const [activeTab, setActiveTab] = useState<"map" | "list">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [selectedExpertId, setSelectedExpertId] = useState<string>("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [minRating, setMinRating] = useState<number | null>(null);
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 50000 });
  const [tempMinRating, setTempMinRating] = useState<number | null>(null);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [detailExpert, setDetailExpert] = useState<Expert | null>(null);

  useEffect(() => {
    if (!selectedExpertId && allExperts[0]) {
      setSelectedExpertId(allExperts[0].id);
    }
  }, [allExperts, selectedExpertId]);

  useEffect(() => {
    setTempPriceRange(priceRange);
    setTempMinRating(minRating);
  }, [showFiltersModal, priceRange, minRating]);

  const handleApplyFilters = () => {
    setPriceRange(tempPriceRange);
    setMinRating(tempMinRating);
    setShowFiltersModal(false);
  };

  const handleClearFilters = () => {
    setTempPriceRange({ min: 0, max: 50000 });
    setTempMinRating(null);
    setPriceRange({ min: 0, max: 50000 });
    setMinRating(null);
    setSelectedCategory(ALL_CATEGORIES);
    setSearchQuery("");
  };

  const matchesCategory = (expert: Expert, category: string) =>
    expert.categories.some((item) => item.toLowerCase() === category.toLowerCase());

  const filteredExperts = useMemo(() => {
    return allExperts
      .filter((expert) => {
        if (selectedCategory !== ALL_CATEGORIES && !matchesCategory(expert, selectedCategory)) return false;
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesName = expert.name.toLowerCase().includes(query);
          const matchesLoc = expert.location.toLowerCase().includes(query);
          const matchesDistrict = expert.district.toLowerCase().includes(query);
          const matchesDivision = expert.division.toLowerCase().includes(query);
          const matchesAddress = expert.address.toLowerCase().includes(query);
          const matchesCat = expert.categories.some((item) => item.toLowerCase().includes(query));
          if (!matchesName && !matchesLoc && !matchesDistrict && !matchesDivision && !matchesAddress && !matchesCat) return false;
        }
        if (expert.price < priceRange.min || expert.price > priceRange.max) return false;
        if (minRating && expert.rating < minRating) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Price: Low to High") return a.price - b.price;
        if (sortBy === "Price: High to Low") return b.price - a.price;
        if (sortBy === "Rating") return b.rating - a.rating;
        return b.completedJobs - a.completedJobs;
      });
  }, [allExperts, selectedCategory, searchQuery, priceRange, minRating, sortBy]);

  useEffect(() => {
    if (filteredExperts.length > 0 && !filteredExperts.some((expert) => expert.id === selectedExpertId)) {
      setSelectedExpertId(filteredExperts[0].id);
    }
  }, [filteredExperts, selectedExpertId]);

  return {
    isProfilesLoading, filteredExperts, categories, activeTab, setActiveTab,
    searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
    selectedExpertId, setSelectedExpertId, sortBy, setSortBy,
    priceRange, minRating, tempPriceRange, setTempPriceRange,
    tempMinRating, setTempMinRating, showFiltersModal, setShowFiltersModal,
    detailExpert, setDetailExpert, handleApplyFilters, handleClearFilters,
  };
}
