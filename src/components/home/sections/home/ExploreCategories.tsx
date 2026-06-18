"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TbAirConditioning, TbTruck, TbScissors } from "react-icons/tb";
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
import { LayoutGrid } from "lucide-react";

export const CATEGORIES_CONTENT = {
  title: "Explore Categories",
  subtitle:
    "Choose from our wide range of professional, verified home services",
  categories: [
    { label: "AC Repair", slug: "ac-repair", icon: TbAirConditioning },
    { label: "Plumbing", slug: "plumbing", icon: FaFaucet },
    { label: "Cleaning", slug: "cleaning", icon: MdOutlineCleaningServices },
    { label: "Electrical", slug: "electrical", icon: FaBolt },
    { label: "Shifting", slug: "shifting", icon: TbTruck },
    { label: "CCTV", slug: "cctv", icon: MdOutlineSecurity },
    { label: "Appliance Repair", slug: "appliance-repair", icon: FaTv },
    { label: "Painting", slug: "painting", icon: FaPaintRoller },
    { label: "Gardening", slug: "gardening", icon: FaLeaf },
    { label: "Pest Control", slug: "pest-control", icon: FaBug },
    { label: "Home Salon", slug: "home-salon", icon: TbScissors },
    { label: "Carpentry", slug: "carpentry", icon: FaHammer },
  ],
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

const ExploreCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 overflow-hidden">
      {/* Header with Animation */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4 mb-8 md:mb-10"
      >
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
            <LayoutGrid className="w-6 h-6 text-[#FF5A5F]" />
            {CATEGORIES_CONTENT.title}
          </h2>

          <p className="text-slate-500 text-sm max-w-md mx-auto">
            {CATEGORIES_CONTENT.subtitle}
          </p>
        </div>
      </motion.div>

      {/* Grid with Stagger Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.045 },
          },
        }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6"
      >
        {CATEGORIES_CONTENT.categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <motion.div
              key={cat.slug}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={`/categories/service/${cat.slug}`}
                className="block h-full"
              >
                <div
                  className="
                    group relative overflow-hidden
                    flex flex-col items-center justify-center
                    h-full rounded-[28px] p-6 md:p-8
                    bg-gradient-to-br from-white to-[#e8eaed]
                    border border-white/80
                    cursor-pointer
                    transition-all duration-300
                    shadow-[8px_8px_20px_rgba(174,180,190,0.55),_-6px_-6px_16px_rgba(255,255,255,0.95)]
                    hover:shadow-[12px_18px_30px_rgba(150,158,170,0.45),_-6px_-6px_18px_rgba(255,255,255,1)]
                  "
                >
                  {/* Gloss sheen — top-half highlight */}
                  <span
                    className="
                      pointer-events-none absolute inset-x-0 top-0
                      h-1/2 rounded-t-[28px]
                      bg-gradient-to-b from-white/65 to-transparent
                    "
                    aria-hidden
                  />

                  {/* Icon orb */}
                  <div
                    className="
                      relative overflow-hidden
                      w-20 h-20 rounded-full mb-4
                      flex items-center justify-center
                      bg-gradient-to-br from-[#f5f7fa] to-[#e8eaed]
                      shadow-[4px_4px_10px_rgba(174,180,190,0.5),_-4px_-4px_10px_rgba(255,255,255,1)]
                      transition-all duration-300
                      group-hover:from-[#ff6b6b] group-hover:to-[#e53935]
                      group-hover:shadow-[4px_4px_14px_rgba(229,57,53,0.35),_-3px_-3px_10px_rgba(255,200,200,0.6)]
                    "
                  >
                    {/* Orb inner gloss */}
                    <span
                      className="
                        pointer-events-none absolute
                        top-[6px] left-[10px]
                        w-10 h-5 rounded-full
                        bg-[radial-gradient(ellipse,rgba(255,255,255,0.75)_0%,transparent_70%)]
                      "
                      aria-hidden
                    />
                    <IconComponent
                      className="
                        w-7 h-7 md:w-8 md:h-8
                        text-primary
                        transition-colors duration-300
                        group-hover:text-white
                      "
                    />
                  </div>

                  {/* Label */}
                  <span
                    className="
                      font-semibold text-sm md:text-base text-center
                      text-slate-700 mt-1
                      transition-colors duration-200
                      group-hover:text-primary
                    "
                  >
                    {cat.label}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ExploreCategories;
