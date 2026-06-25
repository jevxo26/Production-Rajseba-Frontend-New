import React from "react";
import { Shield, Phone, Mail, MessageSquare, Star, Building, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Vendor {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  createdAt?: string;
  wallet_balance?: string;
  commission_percentage?: string;
}

export function VendorProfile({ vendor, serviceRating = "0.0" }: { vendor?: Vendor; serviceRating?: string | number }) {
  const router = useRouter();

  if (!vendor) return null;

  return (
    <section className="py-12 bg-white/50 border-y border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
          
          {/* Decorative Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50/40 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Vendor Main Profile */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 z-10">
            <div className="w-20 h-20 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-center text-[#FF7C71] shrink-0 shadow-inner">
              <Building className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  {vendor.name}
                </h3>
                {vendor.status === "active" && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Provider
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-400">
                Official Rajseba Partner Service Provider
              </p>

              {/* Vendor Stars */}
              <div className="flex items-center gap-1.5 pt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(Number(serviceRating) || 5)
                          ? "fill-current"
                          : "opacity-30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-700">
                  {serviceRating || "5.0"} Provider Rating
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Action */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 z-10">
            <div className="space-y-2.5">
              {vendor.phone && (
                <a
                  href={`tel:${vendor.phone}`}
                  className="flex items-center gap-2.5 text-sm font-bold text-slate-600 hover:text-[#FF7C71] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  {vendor.phone}
                </a>
              )}
              {vendor.email && (
                <a
                  href={`mailto:${vendor.email}`}
                  className="flex items-center gap-2.5 text-sm font-bold text-slate-600 hover:text-[#FF7C71] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  {vendor.email}
                </a>
              )}
            </div>

            <div className="h-px sm:h-12 w-full sm:w-px bg-slate-100 self-stretch my-2 sm:my-0" />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                router.push(
                  `/dashbord/live-chat?receiverId=${vendor.id}&receiverName=${encodeURIComponent(
                    vendor.name
                  )}`
                )
              }
              className="bg-[#FF7C71] hover:bg-[#E5675D] text-white px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-100 hover:shadow-lg hover:shadow-rose-200 cursor-pointer w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4" />
              Chat with Provider
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
}
