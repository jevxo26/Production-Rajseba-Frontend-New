"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  X,
  Star,
  Filter,
  SlidersHorizontal,
  Check,
  Search,
  MapPin,
  Calendar,
  ChevronDown,
  Sparkles,
  Wind,
  Wrench,
  Zap,
  PaintRoller,
  Camera,
  Truck,
  Settings2,
  TrendingUp,
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  Clock,
  CalendarDays,
  Siren,
  Menu,
  ShoppingCart,
  LogIn,
  UserPlus,
  PhoneCall,
} from "lucide-react";


const serviceCategories = [
  { id: "premium-deep-cleaning", label: "Cleaning", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2l-6 6" /><path d="M15.5 15.5L10 21l-4-4L11.5 11.5" /><path d="M21 3l-6 6" /></svg> },
  { id: "master-ac-service", label: "AC Repair", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="12" y1="2" x2="16" y2="6"></line><line x1="12" y1="2" x2="8" y2="6"></line><line x1="12" y1="22" x2="16" y2="18"></line><line x1="12" y1="22" x2="8" y2="18"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="12" x2="6" y2="8"></line><line x1="2" y1="12" x2="6" y2="16"></line><line x1="22" y1="12" x2="18" y2="8"></line><line x1="22" y1="12" x2="18" y2="16"></line><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line></svg> },
  { id: "expert-plumbing", label: "Plumbing", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> },
  { id: "electrical-solution", label: "Electrical", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> },
  { id: "luxe-painting", label: "Painting", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2v4" /><path d="M21 2v4" /><path d="M14 6h8v6h-8z" /><path d="M14 8H7a2 2 0 0 0-2 2v6" /><path d="M9 16v6h2v-6z" /></svg> },
  { id: "cctv", label: "CCTV", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> },
  { id: "premium-shifting", label: "Shifting", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg> },
  { id: "appliance-repair", label: "Appliance Repair", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /><line x1="2" y1="2" x2="22" y2="22" /></svg> },
];

/* ============================
   FILTER DRAWER DATA SETS
   ============================ */
const filterCategories = [
  { id: "cleaning", label: "Cleaning", icon: Sparkles },
  { id: "ac-repair", label: "AC Repair", icon: Wind },
  { id: "plumbing", label: "Plumbing", icon: Wrench },
  { id: "electrical", label: "Electrical", icon: Zap },
  { id: "painting", label: "Painting", icon: PaintRoller },
  { id: "cctv", label: "CCTV", icon: Camera },
  { id: "shifting", label: "Shifting", icon: Truck },
  { id: "appliance", label: "Appliance", icon: Settings2 },
];

const ratingOptions = [
  { value: "5.0", label: "5.0 only" },
  { value: "4.5", label: "4.5 & up" },
  { value: "4.0", label: "4.0 & up" },
];

const sortOptions = [
  { value: "popularity", label: "Popularity", icon: TrendingUp },
  { value: "price-low", label: "Price: Low to High", icon: ArrowUpNarrowWide },
  { value: "price-high", label: "Price: High to Low", icon: ArrowDownNarrowWide },
  { value: "rating", label: "Rating", icon: Star },
  { value: "newest", label: "Newest first", icon: Sparkles },
];

const availabilityOptions = [
  { id: "today", label: "Today", icon: Clock },
  { id: "weekend", label: "This weekend", icon: CalendarDays },
  { id: "emergency", label: "Emergency (24h)", icon: Siren },
];

const trendingServices = [
  {
    id: "premium-deep-cleaning",
    title: "Premium Deep Cleaning",
    description:
      "Full home sanitization using our friendly, industrial equipment. Perfect for move-ins or seasonal refreshes.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviews: "2.4k",
    price: 4500,
    badge: "MOST BOOKED",
    featured: true,
  },
  {
    id: "master-ac-service",
    title: "Master AC Service",
    description: "Comprehensive cleaning and gas top-up for all split brands.",
    image:
      "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviews: "1.8k",
    price: 1200,
    badge: "5.0 ★",
    featured: false,
  },
];

const serviceListings = [
  {
    id: "luxury-wall-painting",
    title: "Luxury Wall Painting",
    description: "Italian finish textures and moisture-proof...",
    image: "/images/service/service-3.png",
    category: "painting",
    categoryLabel: "Painting & Renovation",
    price: 15,
    priceDisplay: "৳15/sq.ft",
    done: "3k+ done",
    rating: 4.8,
    availability: ["weekend"],
    daysAgo: 2,
  },
  {
    id: "emergency-leak-repair",
    title: "Emergency Leak Repair",
    description: "60-minute response time for all plumbing...",
    image: "/images/service/service-4.png",
    category: "plumbing",
    categoryLabel: "Plumbing",
    price: 600,
    priceDisplay: "৳600",
    done: "1.2k+ done",
    rating: 4.6,
    availability: ["today", "emergency"],
    daysAgo: 5,
  },
  {
    id: "smart-home-setup",
    title: "Smart Home Setup",
    description: "Installation of smart switches, hubs, and...",
    image: "/images/service/service-5.png",
    category: "electrical",
    categoryLabel: "Electrical",
    price: 2500,
    priceDisplay: "৳2,500",
    done: "800+ done",
    rating: 4.7,
    availability: ["today", "weekend"],
    daysAgo: 1,
  },
  {
    id: "refrigerator-servicing",
    title: "Refrigerator Servicing",
    description: "Gas charge, compressor checks, and...",
    image: "/images/service/service-6.png",
    category: "appliance",
    categoryLabel: "Appliance",
    price: 1500,
    priceDisplay: "৳1,500",
    done: "2.1k+ done",
    rating: 4.5,
    availability: ["today"],
    daysAgo: 10,
  },
  {
    id: "sofa-carpet-shampoo",
    title: "Sofa & Carpet Shampoo",
    description: "Deep vacuuming and shampooing for all...",
    image: "/images/service/service-7.png",
    category: "cleaning",
    categoryLabel: "Cleaning",
    price: 800,
    priceDisplay: "৳800/seat",
    done: "4k+ done",
    rating: 4.9,
    availability: ["today", "weekend"],
    daysAgo: 7,
  },
  {
    id: "cabinet-wood-polishing",
    title: "Cabinet Wood Polishing",
    description: "Restore the natural shine of your premium",
    image: "/images/service/service-8.png",
    category: "painting",
    categoryLabel: "Renovation",
    price: 3500,
    priceDisplay: "৳3,500",
    done: "500+ done",
    rating: 4.4,
    availability: ["weekend"],
    daysAgo: 15,
  },
];

const PRICE_FLOOR = 500;
const PRICE_CEIL = 5000;
const PER_PAGE = 6;

function buildURL(params: Record<string, string>) {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v && v !== "")
  );
  const qs = new URLSearchParams(filtered).toString();
  return qs ? `?${qs}` : "";
}

function ServicesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedRating, setSelectedRating] = useState(
    searchParams.get("min_rating") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "popularity");
  const [priceMax, setPriceMax] = useState(
    Number(searchParams.get("price_max")) || PRICE_CEIL
  );
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    (searchParams.get("availability") || "").split(",").filter(Boolean)
  );
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const syncURL = useCallback(() => {
    const params: Record<string, string> = {
      category: activeCategory !== "all" ? activeCategory : "",
      q: searchQuery,
      min_rating: selectedRating,
      sort: sortBy !== "popularity" ? sortBy : "",
      price_max: priceMax < PRICE_CEIL ? String(priceMax) : "",
      availability: selectedAvailability.length ? selectedAvailability.join(",") : "",
      page: currentPage > 1 ? String(currentPage) : "",
    };
    router.replace(pathname + buildURL(params), { scroll: false });
  }, [activeCategory, searchQuery, selectedRating, sortBy, priceMax, selectedAvailability, currentPage, router, pathname]);

  useEffect(() => {
    syncURL();
  }, [syncURL]);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  const handleClearAll = () => {
    setSelectedRating("");
    setPriceMax(PRICE_CEIL);
    setSortBy("popularity");
    setSearchQuery("");
    setActiveCategory("all");
    setSelectedAvailability([]);
    setCurrentPage(1);
  };

  const filteredListings = useMemo(() => {
    let filtered = [...serviceListings];

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === activeCategory
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query)
      );
    }

    if (selectedRating) {
      filtered = filtered.filter(
        (service) => service.rating >= parseFloat(selectedRating)
      );
    }

    filtered = filtered.filter((service) => {
      if (typeof service.price === "number") {
        return service.price <= priceMax;
      }
      return true;
    });

    if (selectedAvailability.length > 0) {
      filtered = filtered.filter((service) =>
        selectedAvailability.every((slot) =>
          service.availability?.includes(slot)
        )
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (a.daysAgo ?? 0) - (b.daysAgo ?? 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [activeCategory, searchQuery, selectedRating, priceMax, selectedAvailability, sortBy]);

  const pagedListings = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredListings.slice(start, start + PER_PAGE);
  }, [filteredListings, currentPage]);

  const totalPages = Math.ceil(filteredListings.length / PER_PAGE);

  const ratingCounts = useMemo(() => {
    const base = serviceListings.filter((service) => {
      if (activeCategory !== "all" && service.category !== activeCategory) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !service.title.toLowerCase().includes(query) &&
          !service.description.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (typeof service.price === "number" && service.price > priceMax) {
        return false;
      }
      if (
        selectedAvailability.length > 0 &&
        !selectedAvailability.every((slot) =>
          service.availability?.includes(slot)
        )
      ) {
        return false;
      }
      return true;
    });

    return ratingOptions.reduce<Record<string, number>>((acc, opt) => {
      acc[opt.value] = base.filter(
        (service) => service.rating >= parseFloat(opt.value)
      ).length;
      return acc;
    }, {});
  }, [activeCategory, searchQuery, priceMax, selectedAvailability]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== "all") count += 1;
    if (selectedRating) count += 1;
    if (priceMax < PRICE_CEIL) count += 1;
    count += selectedAvailability.length;
    return count;
  }, [activeCategory, selectedRating, priceMax, selectedAvailability]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#fff0ef] via-white to-[#fff7f7] py-12 md:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Badge */}
          <div className="flex justify-center lg:justify-start mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#ffe1e2] shadow-md">
              <span className="h-2 w-2 rounded-full bg-[#ff5a5f]" />
              <span className="text-xs md:text-sm font-semibold text-[#ff5a5f]">
                Trusted Home Services in Bangladesh
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-[#1a1a1a] leading-tight mb-4 tracking-tight max-w-4xl">
              Find the Best Home Services for Your Lifestyle
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#6b7280] leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
              Premium, reliable, and effortless home service solutions designed
              for modern urban living across Bangladesh.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full max-w-5xl mx-auto lg:mx-0 bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white p-2 md:p-3">

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center">

              {/* Category */}
              <div className="relative flex items-center gap-3 px-4 md:px-5 py-4 flex-1 min-w-0">
                <Search
                  size={20}
                  className="text-[#9ca3af] shrink-0"
                  strokeWidth={2.5}
                />

                <select
                  value={activeCategory}
                  onChange={(e) => {
                    setActiveCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-transparent outline-none text-sm md:text-base font-semibold text-[#1a1a1a] appearance-none cursor-pointer pr-6"
                >
                  <option value="all">Select Category</option>
                  {filterCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="absolute right-4 text-[#9ca3af] pointer-events-none"
                />
              </div>

              <div className="hidden lg:block h-10 w-px bg-[#e5e7eb]" />

              {/* Location */}
              <div className="flex items-center gap-3 px-4 md:px-5 py-4 flex-1 min-w-0 border-t lg:border-t-0 border-[#f3f4f6]">
                <MapPin
                  size={20}
                  className="text-[#9ca3af] shrink-0"
                  strokeWidth={2.5}
                />

                <input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm md:text-base font-semibold text-[#1a1a1a] placeholder:text-[#9ca3af]"
                />
              </div>

              <div className="hidden lg:block h-10 w-px bg-[#e5e7eb]" />

              {/* Date */}
              <div className="relative flex items-center gap-3 px-4 md:px-5 py-4 flex-1 min-w-0 border-t lg:border-t-0 border-[#f3f4f6]">
                <Calendar
                  size={20}
                  className="text-[#9ca3af] shrink-0"
                  strokeWidth={2.5}
                />

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`w-full bg-transparent outline-none text-sm md:text-base font-semibold cursor-pointer ${selectedDate ? "text-[#1a1a1a]" : "text-transparent"
                    }`}
                />

                {!selectedDate && (
                  <span className="absolute left-12 text-sm md:text-base font-semibold text-[#9ca3af] pointer-events-none">
                    Select Date
                  </span>
                )}
              </div>

              {/* Button */}
              <div className="pt-2 lg:pt-0 lg:pl-2">
                <button
                  type="button"
                  className="w-full lg:w-auto px-8 py-4 bg-[#ff5a5f] hover:bg-[#e04a4f] text-white font-bold text-sm md:text-base rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              <span className="text-sm font-medium text-slate-600">
                4.9 Customer Rating
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>👨‍🔧</span>
              <span className="text-sm font-medium text-slate-600">
                500+ Service Professionals
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span className="text-sm font-medium text-slate-600">
                Verified & Trusted Services
              </span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4 mt-10">
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {serviceCategories.slice(0, 5).map((cat) => (
                <Link
                  href={`/services/${cat.id}`}
                  key={cat.id}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full border-2 font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 no-underline ${activeCategory === cat.id
                    ? "border-[#ff5a5f] text-[#ff5a5f] bg-[#fff0ef] shadow-md"
                    : "border-[#e5e7eb] text-[#4b5563] bg-white hover:border-[#ff5a5f] hover:text-[#ff5a5f] hover:shadow-md"
                    }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {serviceCategories.slice(5).map((cat) => (
                <Link
                  href={`/services/${cat.id}`}
                  key={cat.id}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full border-2 font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 no-underline ${activeCategory === cat.id
                    ? "border-[#ff5a5f] text-[#ff5a5f] bg-[#fff0ef] shadow-md"
                    : "border-[#e5e7eb] text-[#4b5563] bg-white hover:border-[#ff5a5f] hover:text-[#ff5a5f] hover:shadow-md"
                    }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Trending Services Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-[2.5rem] font-black text-[#1a1a1a] m-0 border-b-4 border-[#ff5a5f] pb-3 inline-block">Trending Services</h2>
              <p className="text-[1.05rem] text-[#6b7280] mt-2">
                Highly requested by residents in Dhaka this month
              </p>
            </div>
            <a href="#" className="text-[#ff5a5f] font-black text-[1.05rem] no-underline hover:underline">
              View all →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8">
            {trendingServices
              .filter((s) => s.featured)
              .map((service) => (
                <div key={service.id} className="grid grid-cols-1 sm:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-xl border-3 border-[#f3f4f6] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="relative min-h-[320px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    {service.badge && (
                      <span className="absolute top-4 left-4 py-2 px-4 bg-[#8b1a1a] text-white text-[0.75rem] font-black tracking-wider rounded-lg z-10 uppercase">{service.badge}</span>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b] text-[0.95rem] tracking-widest font-black">★★★★★</span>
                      <span className="text-[0.85rem] text-[#6b7280] font-bold">
                        ({service.rating}/5 • {service.reviews} reviews)
                      </span>
                    </div>
                    <h3 className="text-[1.5rem] font-black text-[#1a1a1a] m-0 tracking-tight">{service.title}</h3>
                    <p className="text-[1rem] text-[#6b7280] leading-relaxed m-0 font-semibold">{service.description}</p>
                    <div className="flex items-end justify-between mt-auto pt-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[0.7rem] font-black text-[#9ca3af] tracking-widest uppercase">
                          STARTING FROM
                        </span>
                        <span className="text-[1.75rem] font-black text-[#1a1a1a] tracking-tight">
                          ৳{service.price.toLocaleString()}
                        </span>
                      </div>
                      <Link href={`/services/${service.id}`} className="px-7 py-3 bg-[#ff5a5f] text-white text-[0.95rem] font-black rounded-full no-underline transition-all duration-300 shadow-lg hover:bg-[#e04a4f] hover:shadow-xl hover:-translate-y-1 active:scale-95">Book Now</Link>
                    </div>
                  </div>
                </div>
              ))}

            {trendingServices
              .filter((s) => !s.featured)
              .map((service) => (
                <div key={service.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border-3 border-[#f3f4f6] flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[1.2rem] font-black text-[#1a1a1a] m-0 leading-tight">
                        {service.title}
                      </h3>
                      <span className="bg-[#fff8e1] text-[#b45309] px-3 py-1 rounded-lg text-[0.8rem] font-black whitespace-nowrap">
                        ★ {service.rating}
                      </span>
                    </div>
                    <p className="text-[0.95rem] text-[#6b7280] leading-relaxed m-0 mt-1 flex-1 font-semibold">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t-3 border-[#f3f4f6]">
                      <span className="text-[1.3rem] font-black text-[#1a1a1a]">
                        ৳{service.price.toLocaleString()}
                      </span>
                      <Link
                        href={`/services/${service.id}`}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f3f4f6] text-[#4b5563] font-black text-[1.2rem] no-underline transition-all duration-200 hover:bg-[#8b1a1a] hover:text-white"
                        aria-label={`View ${service.title}`}
                      >
                        →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Service Listings Section */}
      <ServiceListings
        listings={serviceListings}
        filteredCount={filteredListings.length}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        selectedAvailability={selectedAvailability}
        setSelectedAvailability={setSelectedAvailability}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        priceCeil={PRICE_CEIL}
        priceFloor={PRICE_FLOOR}
        perPage={PER_PAGE}
        pagedListings={pagedListings}
        totalPages={totalPages}
        ratingCounts={ratingCounts}
        activeFilterCount={activeFilterCount}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        onClearAll={handleClearAll}
      />

      {/* Additional Sections */}
      <CategoryCleaning />
      <CategoryHomeRepairs />
      <CategoryLifestyle />
      <CategoryOtherServices />
      <CustomQuoteSection />
    </>
  );
}

/* ============================
   TOGGLE SWITCH (Availability)
   ============================ */
function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 border-2 ${checked ? "bg-[#ff5a5f] border-[#ff5a5f]" : "bg-[#e5e7eb] border-[#d1d5db]"}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

/* ============================
   FILTER PANEL (drawer on mobile, sidebar on desktop)
   ============================ */
function FilterPanel({
  isOpen,
  onClose,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
  priceMax,
  setPriceMax,
  priceFloor,
  priceCeil,
  selectedAvailability,
  setSelectedAvailability,
  setCurrentPage,
  ratingCounts,
  resultCount,
  onClearAll,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedRating: string;
  setSelectedRating: (r: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  priceMax: number;
  setPriceMax: (n: number) => void;
  priceFloor: number;
  priceCeil: number;
  selectedAvailability: string[];
  setSelectedAvailability: (a: string[]) => void;
  setCurrentPage: (n: number) => void;
  ratingCounts: Record<string, number>;
  resultCount: number;
  onClearAll: () => void;
}) {
  const fillRight = ((priceMax - priceFloor) / (priceCeil - priceFloor)) * 100;

  const chips: { label: string; onRemove: () => void }[] = [];
  if (activeCategory !== "all") {
    const cat = filterCategories.find((c) => c.id === activeCategory);
    chips.push({
      label: cat?.label ?? activeCategory,
      onRemove: () => {
        setActiveCategory("all");
        setCurrentPage(1);
      },
    });
  }
  if (searchQuery) {
    chips.push({
      label: `"${searchQuery}"`,
      onRemove: () => {
        setSearchQuery("");
        setCurrentPage(1);
      },
    });
  }
  if (selectedRating) {
    chips.push({
      label: `${selectedRating}+ rating`,
      onRemove: () => {
        setSelectedRating("");
        setCurrentPage(1);
      },
    });
  }
  if (priceMax < priceCeil) {
    chips.push({
      label: `Up to ৳${priceMax.toLocaleString()}`,
      onRemove: () => {
        setPriceMax(priceCeil);
        setCurrentPage(1);
      },
    });
  }
  selectedAvailability.forEach((slot) => {
    const opt = availabilityOptions.find((o) => o.id === slot);
    chips.push({
      label: opt?.label ?? slot,
      onRemove: () => {
        setSelectedAvailability(selectedAvailability.filter((a) => a !== slot));
        setCurrentPage(1);
      },
    });
  });

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-[2rem] shadow-2xl max-h-[88vh] overflow-y-auto transform transition-transform duration-300 ease-out p-6 flex flex-col border-t-4 border-[#ff5a5f]
        ${isOpen ? "translate-y-0" : "translate-y-full"}
        md:static md:translate-y-0 md:max-h-none md:overflow-visible md:rounded-3xl md:shadow-lg md:border-2 md:border-[#e5e7eb] md:p-8 md:w-[300px] md:shrink-0 md:sticky md:top-[100px] md:h-fit md:border-t-2`}
        role="dialog"
        aria-modal="true"
        aria-label="Service filters"
      >
        <div className="md:hidden w-12 h-1.5 bg-[#e5e7eb] rounded-full mx-auto mb-6 shrink-0" />

        <div className="flex items-center justify-between mb-6 pb-4 border-b-3 border-[#f3f4f6] shrink-0">
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={22} className="text-[#ff5a5f]" strokeWidth={2.5} />
            <h3 className="text-[1.3rem] font-black text-[#1a1a1a] m-0">Filters</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-[0.9rem] font-black text-[#6b7280] bg-transparent border-none cursor-pointer transition-colors hover:text-[#8b1a1a]"
              onClick={onClearAll}
            >
              Clear all
            </button>
            <button
              type="button"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280] hover:bg-[#fff0ef] hover:text-[#ff5a5f] transition-colors border-2 border-[#e5e7eb]"
              onClick={onClose}
              aria-label="Close filters"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8 shrink-0">
            {chips.map((chip, i) => (
              <span
                key={`${chip.label}-${i}`}
                className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-[#fff0ef] text-[#ff5a5f] text-[0.85rem] font-black border-2 border-[#ff5a5f]"
              >
                {chip.label}
                <button
                  type="button"
                  onClick={chip.onRemove}
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#ff5a5f]/15 transition-colors border-none bg-transparent cursor-pointer"
                  aria-label={`Remove ${chip.label} filter`}
                >
                  <X size={13} strokeWidth={3} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="mb-8">
          <h4 className="text-[0.8rem] font-black text-[#9ca3af] tracking-widest mb-4 uppercase">
            Category
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {filterCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(isActive ? "all" : cat.id);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2.5 px-4 py-3.5 rounded-2xl border-2 text-[0.9rem] font-black transition-all duration-200 ${isActive
                    ? "border-[#ff5a5f] bg-[#fff0ef] text-[#ff5a5f]"
                    : "border-[#e5e7eb] bg-white text-[#4b5563] hover:border-[#ff5a5f] hover:text-[#ff5a5f]"
                    }`}
                >
                  <Icon size={18} className="shrink-0" strokeWidth={2.5} />
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[0.8rem] font-black text-[#9ca3af] tracking-widest uppercase">
              Price Range
            </h4>
            <span className="text-[0.9rem] font-black text-[#ff5a5f] bg-[#fff0ef] px-3 py-1 rounded-lg">
              ৳{priceFloor.toLocaleString()} – ৳{priceMax.toLocaleString()}
            </span>
          </div>
          <div className="relative h-2 bg-[#e5e7eb] rounded-full mb-4 mt-3 border-2 border-[#d1d5db]">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-[#8b1a1a] rounded-full border-2 border-[#ff5a5f]"
                style={{ left: `0%`, width: `${fillRight}%` }}
              />
            </div>
            <input
              type="range"
              className="absolute w-full h-2 top-0 left-0 appearance-none bg-transparent m-0 z-10 pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#8b1a1a] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:shadow-lg hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
              min={priceFloor}
              max={priceCeil}
              step={100}
              value={priceMax}
              onChange={(e) => {
                setPriceMax(Number(e.target.value));
                setCurrentPage(1);
              }}
              aria-label="Maximum price"
            />
          </div>
          <div className="flex justify-between text-[0.85rem] font-bold text-[#6b7280]">
            <span>৳{priceFloor.toLocaleString()}</span>
            <span>৳{priceCeil.toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-[0.8rem] font-black text-[#9ca3af] tracking-widest mb-4 uppercase">
            Minimum Rating
          </h4>
          <div className="flex flex-col gap-3">
            {ratingOptions.map((opt) => {
              const isActive = selectedRating === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-2xl border-2 cursor-pointer transition-colors ${isActive
                    ? "border-[#ff5a5f] bg-[#fff0ef]"
                    : "border-[#e5e7eb] hover:border-[#ff5a5f]/50"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="rating"
                      value={opt.value}
                      checked={isActive}
                      onChange={(e) => {
                        setSelectedRating(isActive ? "" : e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 accent-[#ff5a5f] border-2 cursor-pointer"
                    />
                    <span className="flex items-center gap-2 text-[0.9rem] font-black text-[#1a1a1a]">
                      <Star size={15} className="fill-[#f59e0b] text-[#f59e0b]" strokeWidth={2} />
                      {opt.label}
                    </span>
                  </span>
                  <span className="text-[0.75rem] font-black text-[#9ca3af] bg-[#f3f4f6] px-3 py-1 rounded-lg min-w-[32px] text-center border border-[#d1d5db]">
                    {ratingCounts[opt.value] ?? 0}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-[0.8rem] font-black text-[#9ca3af] tracking-widest mb-4 uppercase">
            Sort By
          </h4>
          <div className="flex flex-col gap-3">
            {sortOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = sortBy === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setSortBy(opt.value);
                    setCurrentPage(1);
                  }}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-2xl border-2 text-[0.9rem] font-black transition-colors ${isActive
                    ? "border-[#ff5a5f] bg-[#fff0ef] text-[#ff5a5f]"
                    : "border-[#e5e7eb] text-[#4b5563] hover:border-[#ff5a5f]/50"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={17} strokeWidth={2.5} />
                    {opt.label}
                  </span>
                  {isActive && <Check size={17} strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-3">
          <h4 className="text-[0.8rem] font-black text-[#9ca3af] tracking-widest mb-4 uppercase">
            Availability
          </h4>
          <div className="flex flex-col gap-4">
            {availabilityOptions.map((opt) => {
              const Icon = opt.icon;
              const checked = selectedAvailability.includes(opt.id);
              return (
                <div key={opt.id} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3 text-[0.95rem] font-bold text-[#1a1a1a]">
                    <Icon size={18} className="text-[#9ca3af]" strokeWidth={2.5} />
                    {opt.label}
                  </span>
                  <ToggleSwitch
                    checked={checked}
                    label={opt.label}
                    onChange={() => {
                      setSelectedAvailability(
                        checked
                          ? selectedAvailability.filter((a) => a !== opt.id)
                          : [...selectedAvailability, opt.id]
                      );
                      setCurrentPage(1);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white pt-6 mt-8 -mx-6 px-6 border-t-3 border-[#f3f4f6] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-[#ff5a5f] text-white font-black text-[0.95rem] shadow-xl transition-all duration-300 hover:bg-[#e04a4f] active:scale-95 border-2 border-[#e04a4f]"
          >
            Apply filters ({resultCount} {resultCount === 1 ? "result" : "results"})
          </button>
        </div>
      </aside>
    </>
  );
}

/* ============================
   SERVICE LISTINGS COMPONENT
   ============================ */
function ServiceListings({
  listings,
  filteredCount,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
  priceMax,
  setPriceMax,
  selectedAvailability,
  setSelectedAvailability,
  currentPage,
  setCurrentPage,
  priceCeil,
  priceFloor,
  perPage,
  pagedListings,
  totalPages,
  ratingCounts,
  activeFilterCount,
  isFilterOpen,
  setIsFilterOpen,
  onClearAll,
}: {
  listings: any[];
  filteredCount: number;
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedRating: string;
  setSelectedRating: (r: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  priceMax: number;
  setPriceMax: (price: number) => void;
  selectedAvailability: string[];
  setSelectedAvailability: (a: string[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  priceCeil: number;
  priceFloor: number;
  perPage: number;
  pagedListings: any[];
  totalPages: number;
  ratingCounts: Record<string, number>;
  activeFilterCount: number;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  onClearAll: () => void;
}) {
  return (
    <section className="py-24 px-6 bg-[#f9fafb]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12">
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          priceFloor={priceFloor}
          priceCeil={priceCeil}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
          setCurrentPage={setCurrentPage}
          ratingCounts={ratingCounts}
          resultCount={filteredCount}
          onClearAll={onClearAll}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-7 md:hidden">
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-[#e5e7eb] bg-white text-[0.95rem] font-black text-[#1a1a1a] shadow-md hover:shadow-lg transition-all"
            >
              <SlidersHorizontal size={18} className="text-[#ff5a5f]" strokeWidth={2.5} />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-[#ff5a5f] text-white text-[0.75rem] font-black leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <span className="text-[0.9rem] font-black text-[#6b7280]">
              {filteredCount} {filteredCount === 1 ? "result" : "results"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {pagedListings.map((service: any) => (
              <Link href={`/services/${service.id}`} key={service.id} className="bg-white border-3 border-[#e5e7eb] rounded-3xl overflow-hidden shadow-lg no-underline flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#ff5a5f] group">
                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 py-2 px-4 bg-white/95 backdrop-blur-sm text-[#1a1a1a] text-[0.8rem] font-black rounded-xl uppercase tracking-wider shadow-lg border-2 border-white">
                    {service.categoryLabel}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-[1.25rem] font-black text-[#1a1a1a] m-0 mb-2 tracking-tight">{service.title}</h3>
                  <p className="text-[0.95rem] text-[#6b7280] leading-relaxed m-0 flex-1 font-semibold">{service.description}</p>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t-3 border-[#f3f4f6]">
                    <span className="text-[1.35rem] font-black text-[#8b1a1a]">{service.priceDisplay}</span>
                    <span className="flex items-center gap-2 text-[0.85rem] font-black text-[#6b7280] bg-[#f3f4f6] px-3 py-2 rounded-lg border-2 border-[#e5e7eb]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {service.done}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {pagedListings.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white rounded-3xl border-3 border-[#e5e7eb]">
              <div className="w-16 h-16 rounded-full bg-[#fff0ef] flex items-center justify-center text-[#ff5a5f] mb-5 border-3 border-[#ff5a5f]">
                <SlidersHorizontal size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-[1.2rem] font-black text-[#1a1a1a] mb-2">No services match these filters</h3>
              <p className="text-[1rem] text-[#6b7280] mb-6 max-w-[360px] font-semibold">
                Try widening your price range, clearing the category, or removing an availability filter.
              </p>
              <button
                type="button"
                onClick={onClearAll}
                className="px-7 py-3.5 rounded-2xl bg-[#ff5a5f] text-white text-[0.95rem] font-black hover:bg-[#e04a4f] transition-all shadow-lg hover:shadow-xl border-2 border-[#e04a4f]"
              >
                Clear all filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#e5e7eb] text-[#4b5563] hover:border-[#ff5a5f] hover:text-[#ff5a5f] hover:bg-[#fff0ef] disabled:opacity-50 disabled:cursor-not-allowed font-black text-[1.2rem] transition-all"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                aria-label="Previous page"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-black transition-all border-2 ${currentPage === page
                    ? "bg-[#ff5a5f] text-white border-[#ff5a5f]"
                    : "border-[#e5e7eb] text-[#4b5563] hover:border-[#ff5a5f] hover:text-[#ff5a5f] hover:bg-[#fff0ef]"
                    }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#e5e7eb] text-[#4b5563] hover:border-[#ff5a5f] hover:text-[#ff5a5f] hover:bg-[#fff0ef] disabled:opacity-50 disabled:cursor-not-allowed font-black text-[1.2rem] transition-all"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================
   CATEGORY SECTIONS
   ============================ */
function CategoryCleaning() {
  const cleaningServices = [
    { title: "Deep Cleaning", desc: "Intensive whole-home sanitization and scrubbing." },
    { title: "Kitchen Cleaning", desc: "Degreasing and detailed cabinet cleaning services." },
    { title: "Bathroom Cleaning", desc: "Scale removal and sparkling sanitization." }
  ];

  return (
    <section className="bg-white py-20 px-6 border-t-4 border-[#f3f4f6]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-[2.75rem] font-black text-[#1a1a1a] m-0 border-b-4 border-[#ff5a5f] pb-3 inline-block">Cleaning</h2>
          <Link href="/services/cleaning" className="text-[#ff5a5f] font-black text-[1.05rem] no-underline hover:underline">View All &gt;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cleaningServices.map((svc) => (
            <Link href={`/services/cleaning/${svc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={svc.title} className="bg-white rounded-3xl p-12 flex flex-col items-center text-center shadow-lg border-3 border-[#f3f4f6] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#ff5a5f] block no-underline text-inherit">
              <h3 className="text-[1.4rem] font-black text-[#1a1a1a] mb-3">{svc.title}</h3>
              <p className="text-[1rem] text-[#6b7280] leading-relaxed m-0 font-semibold">{svc.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryHomeRepairs() {
  const repairServices = [
    { title: "AC Service" },
    { title: "Plumbing" },
    { title: "Electrical" },
    { title: "Carpentry" },
    { title: "Painting" }
  ];

  return (
    <section className="bg-white pb-24 px-6 border-t-4 border-[#f3f4f6]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-[2.75rem] font-black text-[#1a1a1a] m-0 border-b-4 border-[#ff5a5f] pb-3 inline-block">Home Repairs</h2>
          <Link href="/services/repairs" className="text-[#ff5a5f] font-black text-[1.05rem] no-underline hover:underline">View All &gt;</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {repairServices.map((svc) => (
            <Link href={`/services/repairs/${svc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={svc.title} className="bg-white rounded-3xl p-7 flex flex-col items-center justify-center text-center shadow-lg border-3 border-[#f3f4f6] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#ff5a5f] gap-4 block no-underline text-inherit h-28">
              <h3 className="text-[0.85rem] font-black text-[#4b5563] tracking-widest uppercase m-0">{svc.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryLifestyle() {
  return (
    <section className="bg-white py-20 px-6 border-t-4 border-[#f3f4f6]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[2.75rem] font-black text-[#ff5a5f] mb-6">Lifestyle</h2>
        <p className="text-[1.1rem] text-[#6b7280] leading-relaxed mb-10 max-w-[600px] font-semibold">
          Indulge in premium home salon, spa, and garden maintenance services.
        </p>
        <Link href="/services/lifestyle" className="inline-block px-8 py-4 bg-[#ff5a5f] text-white font-black rounded-2xl transition-all hover:bg-[#e04a4f] shadow-lg hover:shadow-xl border-2 border-[#e04a4f]">
          Explore More
        </Link>
      </div>
    </section>
  );
}

function CategoryOtherServices() {
  return (
    <section className="bg-white pt-12 pb-24 px-6 border-t-4 border-[#f3f4f6]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[2.75rem] font-black text-[#1a1a1a] m-0 border-b-4 border-[#ff5a5f] pb-3 inline-block mb-10">Other Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/services/premium-shifting" className="bg-white rounded-3xl p-10 flex flex-col justify-center shadow-lg border-3 border-[#f3f4f6] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#ff5a5f] block no-underline text-inherit">
            <h3 className="text-[1.3rem] font-black text-[#1a1a1a] mb-3">Premium Shifting</h3>
            <p className="text-[1rem] text-[#6b7280] leading-relaxed font-semibold">Packers and movers for a stress-free transition.</p>
          </Link>

          <Link href="/services/cctv" className="bg-white rounded-3xl p-10 flex flex-col items-center text-center shadow-lg border-3 border-[#f3f4f6] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#ff5a5f] block no-underline text-inherit">
            <h3 className="text-[1.2rem] font-black text-[#1a1a1a]">CCTV & Security</h3>
          </Link>

          <Link href="/services/appliance-repair" className="bg-white rounded-3xl p-10 flex flex-col items-center text-center shadow-lg border-3 border-[#f3f4f6] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#ff5a5f] block no-underline text-inherit">
            <h3 className="text-[1.2rem] font-black text-[#1a1a1a]">Appliance Repair</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CustomQuoteSection() {
  return (
    <section className="bg-white pb-24 pt-20 px-6 border-t-4 border-[#f3f4f6]">
      <div className="max-w-[1200px] mx-auto bg-[#fff0ef] rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border-4 border-[#ff5a5f]">
        <div className="flex-1 w-full lg:max-w-[550px]">
          <h2 className="text-[3rem] md:text-[3.5rem] font-black text-[#ff5a5f] leading-tight mb-6 tracking-tight">
            Didn't find what you need?
          </h2>
          <p className="text-[1.1rem] text-[#6b7280] leading-relaxed mb-8 max-w-[480px] font-semibold">
            Tell us your requirement and we'll match you with the right professional within 24 hours.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-8 py-4 bg-[#ff5a5f] text-white font-black rounded-2xl shadow-xl transition-all duration-300 hover:bg-[#e04a4f] hover:-translate-y-1 border-2 border-[#e04a4f]">
              Request Custom Quote
            </button>
            <button className="px-8 py-4 bg-white text-[#4b5563] font-black rounded-2xl border-3 border-[#ff5a5f] shadow-lg transition-all duration-300 hover:-translate-y-1">
              Call Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* <Header /> */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white text-slate-500 font-black text-[1.1rem]">
            Loading services...
          </div>
        }
      >
        <ServicesContent />
      </Suspense>
    </>
  );
}