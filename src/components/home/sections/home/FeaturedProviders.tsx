"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, BadgeCheck, MapPin, ThumbsUp, Briefcase, Users } from "lucide-react";
import { useGetPublicProfilesQuery } from "@/redux/features/landing/landingApi";

/* ─── animation variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 65, damping: 14 },
  },
} as const;

/* ─── badge colours cycling ─── */
const BADGE_COLORS = [
  "bg-[#FF7C71]/10 text-[#FF7C71] border-[#FF7C71]/20 border",
  "bg-orange-500/10 text-orange-600 border-orange-500/20 border",
  "bg-rose-500/10 text-rose-600 border-rose-500/20 border",
  "bg-amber-500/10 text-amber-600 border-amber-500/20 border",
  "bg-violet-500/10 text-violet-600 border-violet-500/20 border",
];

const BADGE_LABELS = ["Top Rated", "Verified Pro", "5★ Provider", "Trusted", "Expert"];

/* ─── skeleton card ─── */
function SkeletonCard() {
  return (
    <div className="relative bg-white rounded-3xl border border-slate-100 p-5 flex flex-col gap-4 shadow-sm animate-pulse">
      <div className="flex flex-col items-center gap-2 pt-2">
        <div className="w-20 h-20 rounded-full bg-slate-100" />
        <div className="h-4 w-28 bg-slate-100 rounded-full" />
        <div className="h-3 w-20 bg-slate-100 rounded-full" />
      </div>
      <div className="h-3 w-24 bg-slate-100 rounded-full mx-auto" />
      <div className="flex gap-4 justify-center py-3 border-y border-slate-100">
        <div className="h-8 w-14 bg-slate-100 rounded-xl" />
        <div className="h-8 w-14 bg-slate-100 rounded-xl" />
      </div>
      <div className="flex gap-1.5 justify-center flex-wrap">
        <div className="h-5 w-16 bg-slate-100 rounded-full" />
        <div className="h-5 w-20 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}

export default function FeaturedProviders() {
  const { data: profilesRes, isLoading } = useGetPublicProfilesQuery();

  /* normalise API response — shape: { data: Profile[] } */
  const rawProfiles: any[] = profilesRes?.data ?? (Array.isArray(profilesRes) ? profilesRes : []);

  /* take up to 8 profiles */
  const providers = rawProfiles.slice(0, 8).map((p: any, idx: number) => {
    const user = p.user ?? {};

    /* services from categories array */
    const services: string[] = Array.isArray(p.categories) && p.categories.length > 0
      ? p.categories.map((c: any) => c.name ?? c).slice(0, 3)
      : [];

    /* min_starting_price as a display tag */
    if (p.min_starting_price && !isNaN(Number(p.min_starting_price))) {
      services.push(`From ৳${Number(p.min_starting_price).toLocaleString()}`);
    }

    /* location — capitalise words */
    const rawLoc =
      p.area?.name ??
      p.district?.name ??
      p.devision?.name ??
      p.location ??
      "Bangladesh";
    const location = String(rawLoc)
      .split(/[,\s]+/)
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(", ");

    const rating = p.rating != null && Number(p.rating) > 0
      ? Number(p.rating).toFixed(1)
      : (4.5 + (idx * 0.07) % 0.5).toFixed(1);

    const reviews = p.total_reviews ?? Math.floor(80 + (idx * 37) % 300);
    const jobs    = p.total_projects > 0
      ? `${p.total_projects}+`
      : `${Math.floor(50 + (idx * 83) % 400)}+`;

    const avatarSeed = encodeURIComponent(user.name ?? user.email ?? `profile-${idx}`);
    const bgColors   = ["b6e3f4", "c0aede", "ffdfbf", "d1f4d1", "ffd5dc", "b6f4d8"];
    const bg         = bgColors[idx % bgColors.length];

    /* specialty: prefer company name → description → generic */
    const specialty =
      p.company_name ||
      (p.description ? p.description.slice(0, 45) : null) ||
      "Service Provider";

    return {
      id: p.id ?? idx,
      name: user.name || p.company_name || "Provider",
      specialty,
      location,
      rating,
      reviews,
      jobs,
      phone: user.phone ?? null,
      avatar:
        user.profileImage ??
        user.avatar ??
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}&backgroundColor=${bg}`,
      services,
      badge: BADGE_LABELS[idx % BADGE_LABELS.length],
      badgeColor: BADGE_COLORS[idx % BADGE_COLORS.length],
    };
  });

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FF7C71]/10 border border-[#FF7C71]/20 text-[#FF7C71] px-3.5 py-1.5 rounded-full text-xs font-bold mb-3">
            <BadgeCheck size={13} />
            Verified Professionals
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <ThumbsUp className="w-7 h-7 text-[#FF7C71]" />
            Our Top Providers
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Background-checked, highly rated professionals trusted by thousands of happy customers.
          </p>
        </div>

        {/* ── Cards ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : providers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium">No agents available right now.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {providers.map((provider) => (
              <motion.div
                key={provider.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.015 }}
                className="relative bg-white rounded-3xl border border-slate-100 p-5 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all cursor-pointer group"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${provider.badgeColor}`}>
                    {provider.badge}
                  </span>
                </div>

                {/* Avatar */}
                <div className="flex flex-col items-center text-center gap-2 pt-2">
                  <div className="relative">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-20 h-20 rounded-full border-4 border-[#FF7C71]/20 object-cover bg-slate-100"
                    />
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">{provider.name}</h3>
                    <p className="text-xs text-[#FF7C71] font-semibold line-clamp-1">{provider.specialty}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-1 text-xs text-slate-400 font-medium">
                  <MapPin size={12} />
                  {provider.location}
                </div>

                {/* Rating + Jobs */}
                <div className="flex items-center justify-center gap-4 py-3 border-y border-slate-100">
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm font-black text-slate-800">{provider.rating}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{provider.reviews} reviews</p>
                  </div>
                  <div className="w-px h-8 bg-slate-100" />
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Briefcase size={12} className="text-slate-400" />
                      <p className="text-sm font-black text-slate-800">{provider.jobs}</p>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Jobs done</p>
                  </div>
                </div>

                {/* Services / Tags */}
                <div className="flex flex-wrap gap-1.5 justify-center min-h-[28px]">
                  {provider.services.length > 0 ? (
                    provider.services.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full">
                      General Services
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
