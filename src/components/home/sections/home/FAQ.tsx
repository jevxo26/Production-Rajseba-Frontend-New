"use client";
import React, { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I book a service on Rajseba?",
    answer:
      "Booking is simple! Just browse our categories, select the service you need, choose a convenient time slot, and confirm your booking. Our professional will arrive at your doorstep.",
  },
  {
    question: "Are the service professionals verified?",
    answer:
      "Yes, absolutely. All our service professionals go through a rigorous background check and skill assessment before they are onboarded to ensure your safety and quality of service.",
  },
  {
    question: "What if I am not satisfied with the service?",
    answer:
      "Customer satisfaction is our top priority. If you're not happy with the service, please reach out to our support team within 24 hours, and we will arrange a rework or provide a refund.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No, we maintain 100% transparency. The price you see during checkout is the final price for the service. Any extra parts or materials needed will be billed separately with your approval.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:sticky md:top-24"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-[#FF5A5F] block mb-3">
              Got questions?
            </span>
            <h2 className="text-3xl md:text-4xl text-slate-800 font-semibold leading-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Find answers to the most common questions about our services and
              booking process.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#FF5A5F] border border-[#FF5A5F]/25 rounded-full px-5 py-2.5 hover:bg-[#FF5A5F]/5 transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Still need help? Contact us
            </a>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div
            className="flex flex-col gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  animate={{
                    borderColor: isOpen
                      ? "rgba(255, 90, 95, 0.4)"
                      : "rgba(226, 232, 240, 1)",
                  }}
                  className={`rounded-2xl border bg-white overflow-hidden ${
                    isOpen ? "shadow-sm" : "hover:border-slate-300"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left focus:outline-none"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-slate-900 text-[15px] leading-snug">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{
                        rotate: isOpen ? 180 : 0,
                        backgroundColor: isOpen
                          ? "rgba(255, 90, 95, 0.1)"
                          : "rgba(241, 245, 249, 1)",
                      }}
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[#FF5A5F]"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
