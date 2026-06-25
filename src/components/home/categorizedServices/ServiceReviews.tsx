import React from "react";
import { Star, MessageSquare, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user?: {
    name: string;
  };
}

export function ServiceReviews({ reviews = [] }: { reviews?: Review[] }) {
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
    : "0.0";

  // Calculate distributions
  const ratingsCount = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    const val = Math.max(1, Math.min(5, Math.floor(r.rating || 5)));
    ratingsCount[val - 1]++;
  });

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Customer Reviews & Ratings
          </h2>
          <p className="text-slate-500 mt-1.5 font-medium">
            Hear from verified customers about their service experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Summary Rating Box */}
          <div className="lg:col-span-4 bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Average Score</h3>
              <div className="text-6xl font-black text-slate-900 tracking-tight">
                {averageRating}
              </div>
              <div className="flex justify-center text-amber-400 gap-0.5 pt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(Number(averageRating)) ? "fill-current" : "opacity-25"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase pt-1">
                Based on {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
              </p>
            </div>

            {/* Distribution bars */}
            <div className="space-y-2 pt-4 border-t border-slate-50">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingsCount[stars - 1];
                const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <span className="w-3">{stars}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-slate-400">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Reviews List */}
          <div className="lg:col-span-8 space-y-4">
            {reviews.length === 0 ? (
              <div className="bg-white border border-slate-100/80 rounded-[32px] p-10 text-center space-y-4 shadow-sm">
                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-800">No Reviews Yet</h4>
                  <p className="text-sm font-semibold text-slate-400 mt-1">
                    Be the first to review this service after your order is completed!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, index) => {
                  const dateStr = new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  });
                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border border-slate-100/70 p-6 rounded-[28px] shadow-xs space-y-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100/40 flex items-center justify-center text-[#FF7C71]">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-slate-800">
                              {review.user?.name || "Verified Customer"}
                            </h4>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 mt-0.5">
                              <Calendar className="w-3 h-3 text-slate-300" />
                              <span>{dateStr}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex text-amber-400 gap-0.5 bg-amber-50/50 px-2 py-1 rounded-lg border border-amber-100/40">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < (review.rating || 5) ? "fill-current" : "opacity-20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed font-medium pl-1">
                        {review.comment || "Service was completed perfectly and with top-tier professionalism."}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
