"use client";

import React, { useState, useEffect } from "react";
import { Star, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CUSTOMER_FEEDBACK_CONTENT = {
  title: "Customer's Feedback",
  subtitle: "See what our lovely clients say about our professional services",
  feedback: [
    {
      name: "Rashed Karim",
      location: "Bashundhara, Dhaka",
      rating: 5,
      text: '"Booked an electrician at midnight and got same-day service. Truly impressed with the response time."',
      avatar:
        "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Farzana Akter",
      location: "Mohammadpur, Dhaka",
      rating: 5,
      text: '"The home salon team was punctual and so skilled. Felt like a proper salon visit without leaving home."',
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Tanvir Ahmed",
      location: "Bashundhara, Dhaka",
      rating: 5,
      text: '"Got my AC gas refilled and serviced same day. Pricing was transparent with no hidden charges."',
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Israt Jahan",
      location: "Mirpur, Dhaka",
      rating: 5,
      text: '"Excellent painting job on my living room walls. The painters were neat, careful with furniture, and finished on schedule."',
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Kamrul Hasan",
      location: "Uttara, Dhaka",
      rating: 5,
      text: '"CCTV installation was smooth and the technician explained the mobile app setup clearly. Great after-service support too."',
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Nazia Rahman",
      location: "Gulshan, Dhaka",
      rating: 5,
      text: '"Hired them for a full apartment move. Everything arrived intact and the team was extremely careful with our furniture."',
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
    },
  ],
};

const CustomerFeedback = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const feedback = CUSTOMER_FEEDBACK_CONTENT.feedback;
  const N = feedback.length;
  const cardsToShow = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;
  const maxIndex = N - cardsToShow;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 rounded-full bg-rose-50">
              <MessageSquare className="w-6 h-6 text-[#FF5A5F]" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              {CUSTOMER_FEEDBACK_CONTENT.title}
            </h2>
          </div>
          <p className="text-slate-500 max-w-xl mx-auto">
            {CUSTOMER_FEEDBACK_CONTENT.subtitle}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${activeIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {feedback.map((item, idx) => (
              <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3">
                <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col h-full border border-slate-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.location}
                      </p>
                      <div className="flex gap-1 mt-1.5">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-[#FF5A5F] fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[15px] italic">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
