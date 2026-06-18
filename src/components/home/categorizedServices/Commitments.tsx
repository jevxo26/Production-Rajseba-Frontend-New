"use client";
import { Shield, Award, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const safetyFeatures = [
  { icon: Shield, label: "Insured Work" },
  { icon: Shield, label: "PPE Mandatory" },
  { icon: Award, label: "License Verified" },
  { icon: Wrench, label: "Code Compliant" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Commitments() {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-rose-50 rounded-3xl p-8 md:p-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl md:text-4xl font-bold text-[#FF5A5F] mb-12"
          >
            Committed to Zero-Risk Safety
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-sm">
                  <feature.icon className="w-8 h-8 text-[#FF5A5F]" />
                </div>
                <p className="font-semibold text-slate-800">{feature.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
