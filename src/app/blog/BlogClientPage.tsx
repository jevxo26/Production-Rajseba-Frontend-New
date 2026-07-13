"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Search,
  Loader2,
  Calendar,
  ChevronRight,
  Sparkles,
  X,
  ChevronLeft,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useGetAllBlogsQuery } from "@/redux/features/admin/blog";

function getImages(blog: any): string[] {
  if (Array.isArray(blog.images) && blog.images.length > 0)
    return blog.images.filter(Boolean);
  if (typeof blog.images === "string") {
    const parts = blog.images.split(",").filter(Boolean);
    if (parts.length > 0) return parts;
  }
  return [];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ─── Inline detail panel ─── */
function BlogDetail({ blog, onClose }: { blog: any; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const imgs = getImages(blog);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-250 space-y-8">

      {/* Back button */}
      <button
        onClick={onClose}
        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-400 hover:text-[#FF6014] transition-colors"
      >
        <ArrowLeft size={14} /> Back to articles
      </button>

      {/* Title */}
      <div className="space-y-3">
        {blog.createdAt && (
          <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Calendar size={11} className="text-[#FF6014]" />
            {formatDate(blog.createdAt)}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
          {blog.title}
        </h1>
      </div>

      {/* Overview callout */}
      {blog.overview && (
        <p className="text-sm font-semibold text-slate-700 leading-relaxed border-l-4 border-[#FF6014]/50 pl-5 py-2 bg-[#FFF8F4] rounded-r-2xl">
          {blog.overview}
        </p>
      )}

      {/* ── Image gallery ── */}
      {imgs.length > 0 && (
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative w-full aspect-[16/8] rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-slate-100">
            <Image
              src={imgs[activeImg]}
              alt={`${blog.title} — image ${activeImg + 1}`}
              fill
              className="object-cover transition-opacity duration-300"
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
            />

            {imgs.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((p) => (p - 1 + imgs.length) % imgs.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow text-slate-600 hover:bg-white transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveImg((p) => (p + 1) % imgs.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow text-slate-600 hover:bg-white transition-all"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === activeImg ? "bg-[#FF6014] scale-125" : "bg-white/60 hover:bg-white"
                        }`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <span className="absolute top-3 right-3 bg-slate-900/55 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {activeImg + 1} / {imgs.length}
                </span>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {imgs.length > 1 && (
            <div className="flex gap-3">
              {imgs.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${i === activeImg
                      ? "border-[#FF6014] shadow-md shadow-orange-100"
                      : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                >
                  <Image src={img} alt={`Thumb ${i + 1}`} fill className="object-cover" sizes="96px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest pb-3 border-b border-slate-100">
          <BookOpen size={12} className="text-[#FF6014]" />
          Full Article
        </div>
        <p className="text-slate-700 text-sm leading-[1.9] font-medium whitespace-pre-line">
          {blog.description}
        </p>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#FFF9F6] to-[#FFF1E9] border border-orange-100 rounded-3xl p-6 space-y-3">
        <h3 className="font-black text-slate-800 text-sm flex items-center gap-1.5 uppercase tracking-wider">
          <ShieldCheck size={15} className="text-[#FF6014]" /> Need Help?
        </h3>
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          Our certified home service professionals are ready to help.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a
            href="/services"
            className="inline-flex items-center gap-1.5 bg-[#FF6014] hover:bg-[#E0530A] text-white text-xs font-bold py-2 px-4 rounded-xl transition-all shadow-sm shadow-orange-500/10"
          >
            Book Service
          </a>
          <a
            href="tel:01813333373"
            className="inline-flex items-center gap-1.5 bg-white border border-orange-100 hover:bg-orange-50/50 text-[#FF6014] text-xs font-bold py-2 px-4 rounded-xl transition-all"
          >
            Call Hotline
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
export default function BlogClientPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchTimer, setSearchTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const { data: blogsRes, isLoading } = useGetAllBlogsQuery(debouncedSearch || undefined);
  const blogs: any[] = blogsRes?.data || [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (searchTimer) clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => setDebouncedSearch(val), 500));
    // If search changes, close the open article
    setSelectedBlog(null);
  };

  const clearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedBlog(null);
  };

  return (
    <div className="min-h-screen bg-transparent overflow-hidden flex-1 flex flex-col relative font-sans pb-24">
      {/* Background */}
      <div
        className="absolute inset-0 bg-[url('/bg-icons-design.png')] bg-repeat opacity-10 pointer-events-none z-0"
        style={{ backgroundSize: "auto" }}
      />

      {/* ─── HERO ─── */}
      <section className="relative pt-12 pb-10 md:pt-16 md:pb-14 lg:pt-20 border-b border-slate-100 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 text-[10px] font-extrabold text-[#FF6014] uppercase tracking-[.12em] bg-[#FFF4EE] px-3.5 py-1.5 rounded-full border border-[#FF6014]/20">
              <Sparkles className="w-3.5 h-3.5" /> Rajseba Blog
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 leading-[1.15]">
              Expert Tips, Guides &{" "}
              <span className="text-[#FF6014]">Home Care Insights</span>
            </h1>
            <p className="text-[14px] text-slate-500 font-semibold leading-relaxed max-w-2xl mx-auto">
              Stay informed with the latest home service tips, maintenance guides, and trusted
              advice from Rajseba's expert team.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto pt-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search blog posts..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-10 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FF6014]/40 focus:ring-4 focus:ring-[#FFF8F4] shadow-sm transition-all"
              />
              {search && (
                <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT AREA ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14 relative z-10 w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="w-7 h-7 animate-spin text-[#FF6014]" />
            <span className="text-slate-400 text-xs font-semibold animate-pulse">Loading articles...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-32 bg-white/70 backdrop-blur-md border border-dashed border-slate-200 rounded-3xl space-y-3">
            <div className="w-14 h-14 bg-[#FFF4EE] text-[#FF6014] rounded-2xl flex items-center justify-center mx-auto">
              <BookOpen size={24} />
            </div>
            <p className="text-slate-700 font-bold text-sm">
              {debouncedSearch ? `No articles found for "${debouncedSearch}"` : "No blog posts published yet."}
            </p>
            <p className="text-slate-400 text-xs font-medium">Check back soon for expert home care tips.</p>
          </div>
        ) : (
          <div className={`gap-10 ${selectedBlog ? "grid lg:grid-cols-[340px_1fr]" : "max-w-4xl mx-auto"}`}>

            {/* ── Blog list ── */}
            <div className="space-y-2">
              {!selectedBlog && (
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <BookOpen size={14} className="text-[#FF6014]" />
                    {debouncedSearch ? `Results for "${debouncedSearch}"` : "All Articles"}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                    {blogs.length} post{blogs.length !== 1 ? "s" : ""}
                  </span>
                </div>
              )}

              {blogs.map((blog, index) => {
                const isActive = selectedBlog?.id === blog.id;
                return (
                  <button
                    key={blog.id}
                    onClick={() => setSelectedBlog(isActive ? null : blog)}
                    className={`w-full text-left group flex items-center gap-4 rounded-2xl px-5 py-4 border transition-all duration-200 relative overflow-hidden ${isActive
                        ? "bg-[#FFF8F4] border-[#FF6014]/30 shadow-md shadow-orange-50"
                        : "bg-white/80 backdrop-blur-md border-slate-100 hover:border-[#FF6014]/20 hover:shadow-lg hover:shadow-orange-50"
                      }`}
                  >
                    {/* Number */}
                    <span className={`text-xl font-black shrink-0 w-7 text-right select-none transition-colors ${isActive ? "text-[#FF6014]/30" : "text-slate-100 group-hover:text-[#FF6014]/15"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-extrabold text-[14px] leading-snug truncate transition-colors ${isActive ? "text-[#FF6014]" : "text-slate-800 group-hover:text-[#FF6014]"}`}>
                        {blog.title}
                      </p>
                      {blog.overview && (
                        <p className="text-slate-400 text-[11px] font-medium mt-1 truncate leading-relaxed">
                          {blog.overview}
                        </p>
                      )}
                      {blog.createdAt && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-300 mt-1.5 uppercase tracking-wide">
                          <Calendar size={9} className="text-[#FF6014]/50" />
                          {formatDate(blog.createdAt)}
                        </span>
                      )}
                    </div>

                    <ChevronRight
                      size={16}
                      className={`shrink-0 transition-all ${isActive ? "text-[#FF6014] rotate-90" : "text-slate-200 group-hover:text-[#FF6014] group-hover:translate-x-0.5"}`}
                    />

                    {/* Active accent */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#FF6014] rounded-l-2xl transition-transform origin-center duration-200 ${isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"}`} />
                  </button>
                );
              })}
            </div>

            {/* ── Detail panel ── */}
            {selectedBlog && (
              <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-8 shadow-sm">
                <BlogDetail blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
