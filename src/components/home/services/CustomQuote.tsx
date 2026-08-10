"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

interface CustomQuoteProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export default function CustomQuote({
  title = "Didn't find what you need?",
  description = "Tell us your requirement and we'll match you with the right professional within 24 hours.",
  primaryButtonText = "Request Custom Quote",
  secondaryButtonText = " Call Support",
  onPrimaryClick,
  onSecondaryClick,
  className = "",
}: CustomQuoteProps) {
  return (
    <section
      className={`max-w-7xl mx-auto px-4 md:px-6 pb-8 md:pb-12 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-primary/10 to-primary/30 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 border border-[#ffd0d1] shadow-xs"
      >
        {/* Left Content */}
        <div className="flex-1 space-y-1.5">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#FF6014] leading-snug">
            {title}
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-md text-xs sm:text-sm">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
          {onPrimaryClick ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPrimaryClick}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#FF6014] hover:bg-[#E0530A] text-white font-semibold rounded-xl sm:rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              {primaryButtonText}
            </motion.button>
          ) : (
            <Link href="/contact" className="no-underline">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#FF6014] hover:bg-[#E0530A] text-white font-semibold rounded-xl sm:rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                {primaryButtonText}
              </motion.div>
            </Link>
          )}

          {onSecondaryClick ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSecondaryClick}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl sm:rounded-2xl border border-[#ffd0d1] transition-all active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              {secondaryButtonText}
            </motion.button>
          ) : (
            <a href="tel:01813333373" className="no-underline">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl sm:rounded-2xl border border-[#ffd0d1] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                {secondaryButtonText}
              </motion.div>
            </a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
