"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, Clock, ArrowRight, Zap, Gift, Percent, Sparkles, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { useGetPublicPackagesQuery } from "@/redux/features/landing/landingApi";
import { useCreateBookingMutation } from "@/redux/features/admin/booking";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Calendar, X } from "lucide-react";

// Premium styles for cards matching the brand color palette (#FF7C71)
const DESIGN_ASSETS = [
  {
    badge: "🔥 Hot Deal",
    badgeColor: "bg-[#FF7C71]/10 text-[#FF7C71] border-[#FF7C71]/20",
    gradient: "from-[#FF7C71] via-rose-500 to-rose-600",
    bg: "bg-gradient-to-br from-[#FF7C71]/5 via-white to-[#FF7C71]/2",
    border: "hover:border-[#FF7C71]/40 border-slate-100",
    iconColor: "text-[#FF7C71]",
    glow: "shadow-[#FF7C71]/5",
  },
  {
    badge: "🎁 New User",
    badgeColor: "bg-[#FF7C71]/10 text-[#FF7C71] border-[#FF7C71]/20",
    gradient: "from-[#FF7C71] via-orange-400 to-orange-500",
    bg: "bg-gradient-to-br from-[#FF7C71]/4 via-white to-[#FF7C71]/1",
    border: "hover:border-[#FF7C71]/40 border-slate-100",
    iconColor: "text-[#FF7C71]",
    glow: "shadow-[#FF7C71]/5",
  },
  {
    badge: "⚡ Flash Sale",
    badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    gradient: "from-[#FF7C71] via-rose-450 to-pink-500",
    bg: "bg-gradient-to-br from-[#FF7C71]/5 via-white to-[#FF7C71]/2",
    border: "hover:border-[#FF7C71]/40 border-slate-100",
    iconColor: "text-[#FF7C71]",
    glow: "shadow-[#FF7C71]/5",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 65, damping: 14 } },
} as const;

// Countdown timer hook
function useCountdown(hours: number) {
  const [time, setTime] = useState(hours * 3600);
  useEffect(() => {
    const t = setInterval(() => setTime((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function SpecialOffers() {
  const countdown = useCountdown(6);
  const { data: packagesRes, isLoading } = useGetPublicPackagesQuery();

  const packagesData = packagesRes?.data || (Array.isArray(packagesRes) ? packagesRes : []);

  const router = useRouter();
  const authUser = useAppSelector((state) => state.auth.user);
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    location: "",
    notes: "",
  });

  const handleInitiateBooking = (pkg: any) => {
    if (!authUser) {
      toast.error("Please login to proceed with booking!", {
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
      return;
    }
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingDetails.date || !bookingDetails.location) {
      toast.error("Booking Date and Service Location are required!");
      return;
    }

    const payload = {
      user_id: authUser?.id,
      package_id: selectedPackage?.id,
      service_id: selectedPackage?.serviceId,
      vendor_id: selectedPackage?.vendorId || 1, // Fallback to 1 if no vendor, though backend requires it
      date: bookingDetails.date,
      time: bookingDetails.time || undefined,
      location: bookingDetails.location,
      notes: bookingDetails.notes || undefined,
    };

    try {
      await createBooking(payload).unwrap();
      toast.success("Your package booking has been placed successfully!");
      setIsModalOpen(false);
      setSelectedPackage(null);
      setBookingDetails({ date: "", time: "", location: "", notes: "" });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to place booking. Please try again.");
    }
  };

  // Dynamic offers rendering happens directly in the return block now

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF7C71]/10 border border-[#FF7C71]/20 text-[#FF7C71] px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
              <Sparkles size={13} />
              Featured Promotions
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-7 h-7 text-[#FF7C71]" />
              Special Deals & Packages
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-md">
              Grab exclusive deals and combo service packages prepared for your home care.
            </p>
          </div>

          {/* Live Countdown */}
          <div className="flex items-center gap-2.5 bg-slate-900 text-white px-4 py-2.5 rounded-2xl self-start sm:self-auto shadow-lg shadow-slate-900/10">
            <Clock size={15} className="text-[#FF7C71] animate-pulse" />
            <span className="text-xs font-semibold text-slate-400">Offer ends in</span>
            <span className="text-sm font-black tabular-nums text-[#FF7C71]">{countdown}</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF7C71]" />
          </div>
        )}

        {/* All Packages — Flat Grid */}
        {!isLoading && packagesData.length > 0 && (() => {
          // Flatten all packages from all services into one list
          const displayPackages = packagesData.flatMap((section: any, sIdx: number) =>
            (section.packages || []).map((pkg: any, idx: number) => {
              const globalIdx = sIdx * 10 + idx;
              const variant = globalIdx % 3 === 1 ? "popular" : globalIdx % 3 === 2 ? "dark" : "light";
              return {
                id: pkg.id,
                title: pkg.name.toUpperCase(),
                price: pkg.price ? Number(pkg.price).toLocaleString() : null,
                features: pkg.items && pkg.items.length > 0
                  ? pkg.items.map((it: any) => it.nestedService?.name || "Premium item")
                  : ["Full Service", "Expert technician", "Quality check", "Support included"],
                buttonText: "Book Package",
                variant,
                badge: variant === "popular" ? "POPULAR" : undefined,
                description: pkg.description,
                serviceId: section.service?.id,
                vendorId: section.service?.vendor?.id,
              };
            })
          );

          return (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {displayPackages.map((pkg: any, index: number) => (
                <motion.div
                  key={pkg.id || index}
                  variants={itemVariants}
                  className={`rounded-3xl p-8 relative flex flex-col h-full transition-all hover:-translate-y-1 ${
                    pkg.variant === "popular"
                      ? "border-2 border-[#FF7C71] bg-rose-50/50 shadow-xl"
                      : pkg.variant === "dark"
                        ? "bg-[#261817] text-white"
                        : "bg-white border border-slate-100"
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.badge && (
                    <div className="absolute -top-3 right-6 bg-[#FF7C71] text-white text-xs font-bold px-4 py-1 rounded-full z-10">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="mb-8">
                    <h3
                      className={`text-lg font-semibold mb-4 ${pkg.variant === "dark" ? "text-white" : "text-slate-900"}`}
                    >
                      {pkg.title}
                    </h3>

                    {pkg.price ? (
                      <div className="mb-6">
                        <span className="text-4xl font-bold">৳{pkg.price}</span>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <h4 className="text-3xl font-bold mb-1">Get Quote</h4>
                      </div>
                    )}
                  </div>

                  {/* Features or Description */}
                  {pkg.features ? (
                    <ul className="space-y-3 mb-10 flex-1">
                      {pkg.features.map((feature: any, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <Check className="w-5 h-5 text-[#FF7C71] mt-0.5 flex-shrink-0" />
                          <span
                            className={
                              pkg.variant === "dark"
                                ? "text-slate-300"
                                : "text-slate-600"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-400 leading-relaxed mb-10 flex-1">
                      {pkg.description}
                    </p>
                  )}

                  {/* Button */}
                  <button
                    onClick={() => handleInitiateBooking(pkg)}
                    className={`block w-full py-3.5 rounded-2xl font-semibold text-sm transition-all cursor-pointer ${
                      pkg.variant === "dark"
                        ? "bg-slate-100 text-slate-900 hover:bg-slate-300"
                        : pkg.variant === "popular"
                          ? "bg-[#FF7C71] text-white hover:bg-[#E5675D]"
                          : "bg-[#261817]/90 text-white hover:bg-black"
                    }`}
                  >
                    {pkg.buttonText}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          );
        })()}

        {/* Fallback mock data if API is empty */}
        {!isLoading && packagesData.length === 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Fallback map from the previous mock data */}
            {[
              {
                id: 1,
                title: "APARTMENT STARTER",
                price: "12,500",
                features: ["2× 2MP Indoor Cameras", "4-Channel DVR", "500GB Storage", "Free App Setup"],
                buttonText: "Book Package",
                variant: "light",
              },
              {
                id: 2,
                title: "FAMILY GUARD",
                price: "28,900",
                badge: "POPULAR",
                features: ["4× 5MP All-weather Cams", "8-Channel DVR", "1TB Storage + Smart Lock", "1 year Free Maintenance"],
                buttonText: "Book Package",
                variant: "popular",
              },
              {
                id: 3,
                title: "BUSINESS SUITE",
                price: "45,000",
                features: ["8× IP Cameras (Night Vision)", "16-Channel NVR", "2TB Server Storage", "24/7 Priority Support"],
                buttonText: "Book Package",
                variant: "light",
              },
            ].map((pkg: any, index: number) => (
              <motion.div
                key={pkg.id || index}
                variants={itemVariants}
                className={`rounded-3xl p-8 relative flex flex-col h-full transition-all hover:-translate-y-1 ${
                  pkg.variant === "popular"
                    ? "border-2 border-[#FF7C71] bg-rose-50/50 shadow-xl"
                    : pkg.variant === "dark"
                      ? "bg-[#261817] text-white"
                      : "bg-white border border-slate-100"
                }`}
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 right-6 bg-[#FF7C71] text-white text-xs font-bold px-4 py-1 rounded-full z-10">
                    {pkg.badge}
                  </div>
                )}

                <div className="mb-8 mt-4">
                  <h3
                    className={`text-lg font-semibold mb-4 ${pkg.variant === "dark" ? "text-white" : "text-slate-900"}`}
                  >
                    {pkg.title}
                  </h3>

                  {pkg.price ? (
                    <div className="mb-6">
                      <span className="text-4xl font-bold">৳{pkg.price}</span>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <h4 className="text-3xl font-bold mb-1">Get Quote</h4>
                    </div>
                  )}
                </div>

                {/* Features or Description */}
                {pkg.features ? (
                  <ul className="space-y-3 mb-10 flex-1">
                    {pkg.features.map((feature: any, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="w-5 h-5 text-[#FF7C71] mt-0.5 flex-shrink-0" />
                        <span
                          className={
                            pkg.variant === "dark"
                              ? "text-slate-300"
                              : "text-slate-600"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400 leading-relaxed mb-10 flex-1">
                    {pkg.description}
                  </p>
                )}

                {/* Button */}
                <button
                  onClick={() => handleInitiateBooking(pkg)}
                  className={`block w-full py-3.5 rounded-2xl font-semibold text-sm transition-all cursor-pointer ${
                    pkg.variant === "dark"
                      ? "bg-slate-100 text-slate-900 hover:bg-slate-300"
                      : pkg.variant === "popular"
                        ? "bg-[#FF7C71] text-white hover:bg-[#E5675D]"
                        : "bg-[#261817]/90 text-white hover:bg-black"
                  }`}
                >
                  {pkg.buttonText}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}


      </div>

      {/* Booking Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Calendar size={20} className="text-[#FF7C71]" />
                Complete Booking Info
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Selected Package summary in modal */}
            {selectedPackage && (
              <div className="px-6 py-4 bg-[#FFF8F7] border-b border-slate-100/60 space-y-2.5">
                <div className="text-xs font-bold text-[#FF7C71] uppercase tracking-wider flex items-center gap-1">
                  Selected Package
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-800">
                  <span>{selectedPackage.title}</span>
                  {selectedPackage.price && <span className="text-[#FF7C71] text-base">৳{selectedPackage.price}</span>}
                </div>
              </div>
            )}

            <form onSubmit={handleConfirmBooking} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Booking Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={bookingDetails.date}
                      onChange={(e) =>
                        setBookingDetails({ ...bookingDetails, date: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-1 focus:ring-[#FF7C71] focus:border-[#FF7C71] block p-3 outline-none transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Booking Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={bookingDetails.time}
                      onChange={(e) =>
                        setBookingDetails({ ...bookingDetails, time: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-1 focus:ring-[#FF7C71] focus:border-[#FF7C71] block p-3 outline-none transition-all font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Service Address *
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter your street address, house no, area..."
                    value={bookingDetails.location}
                    onChange={(e) =>
                      setBookingDetails({ ...bookingDetails, location: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-1 focus:ring-[#FF7C71] focus:border-[#FF7C71] block p-3 outline-none transition-all font-semibold resize-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Additional Notes
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    placeholder="Any specific requests or requirements..."
                    value={bookingDetails.notes}
                    onChange={(e) =>
                      setBookingDetails({ ...bookingDetails, notes: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-1 focus:ring-[#FF7C71] focus:border-[#FF7C71] block p-3 outline-none transition-all font-semibold resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isBooking}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-[#FF7C71] hover:bg-[#E5675D] rounded-xl transition-colors shadow-md disabled:opacity-70 flex items-center gap-2 cursor-pointer"
                >
                  {isBooking ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Placing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
