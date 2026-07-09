"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  HelpCircle,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  Loader2,
  Send,
  MessageSquare,
  Calendar,
  AlertCircle,
  X,
  User,
  Shield,
  LifeBuoy,
} from "lucide-react";
import {
  useGetHelpArticlesQuery,
  useGetSupportTicketsQuery,
  useCreateSupportTicketMutation,
  useGetTicketDetailsQuery,
  useAddTicketReplyMutation,
} from "@/redux/features/client/helpApi";
import AccessDenied from "../components/AccessDenied";

export default function HelpCenterPage() {
  const role = useAppSelector((state) => state.auth.role) || "client";
  const lang = useAppSelector((state) => state.lang.value);

  // Tabs: "faqs" | "tickets"
  const [activeTab, setActiveTab] = useState<"faqs" | "tickets">("faqs");
  
  // FAQ Search & Category Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Ticket Modal & Form State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("booking");
  const [ticketPriority, setTicketPriority] = useState("medium");
  const [ticketDescription, setTicketDescription] = useState("");

  // Active Selected Ticket Details
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // RTK Queries & Mutations
  const { data: articlesData, isLoading: isArticlesLoading } = useGetHelpArticlesQuery({
    search: searchQuery,
    category: selectedCategory,
  });

  const { data: ticketsData, isLoading: isTicketsLoading } = useGetSupportTicketsQuery(undefined, {
    skip: role !== "client",
  });

  const { data: activeTicketData, isLoading: isActiveTicketLoading } = useGetTicketDetailsQuery(
    selectedTicketId!,
    { skip: !selectedTicketId }
  );

  const [createTicket, { isLoading: isCreatingTicket }] = useCreateSupportTicketMutation();
  const [addReply, { isLoading: isSendingReply }] = useAddTicketReplyMutation();

  if (role !== "client") {
    return <AccessDenied roleRequired="Customer" />;
  }

  // Handle Rescheduling or general FAQ category click
  const faqCategories = [
    { id: "", labelEn: "All Topics", labelBn: "সব বিষয়" },
    { id: "Booking & Scheduling", labelEn: "Booking", labelBn: "বুকিং" },
    { id: "Payments & Refund", labelEn: "Payments", labelBn: "পেমেন্ট" },
    { id: "Account & Privacy", labelEn: "Account", labelBn: "অ্যাকাউন্ট" },
    { id: "Safety & Trust", labelEn: "Safety", labelBn: "নিরাপত্তা" },
  ];

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDescription) return;

    try {
      await createTicket({
        subject: ticketSubject,
        category: ticketCategory,
        priority: ticketPriority,
        description: ticketDescription,
      }).unwrap();

      // Reset Form
      setTicketSubject("");
      setTicketDescription("");
      setTicketCategory("booking");
      setTicketPriority("medium");
      setIsCreateModalOpen(false);
      setActiveTab("tickets");
    } catch (err) {
      console.error("Failed to create ticket:", err);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicketId) return;

    try {
      await addReply({
        id: selectedTicketId,
        message: replyMessage,
      }).unwrap();
      setReplyMessage("");
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-200">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FFF8F4] text-[#FF6014] rounded-2xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              {lang === "bn" ? "সাহায্য কেন্দ্র" : "Help Center"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              {lang === "bn"
                ? "প্রায়শই জিজ্ঞাসিত প্রশ্নের উত্তর খুঁজুন, টিউটোরিয়াল পড়ুন বা সাপোর্টের সাথে যুক্ত হন।"
                : "Find answers to FAQs, read tutorials, or connect with support."}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-50 border border-slate-100 p-1.5 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => {
              setActiveTab("faqs");
              setSelectedTicketId(null);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "faqs"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {lang === "bn" ? "এফএকিউ নির্দেশিকা" : "FAQ Guides"}
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "tickets"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {lang === "bn" ? "আমার সাপোর্ট টিকিট" : "My Support Tickets"}
          </button>
        </div>
      </div>

      {activeTab === "faqs" ? (
        <div className="space-y-8">
          {/* Search & Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "bn" ? "প্রশ্ন অথবা বিষয়বস্তু খুঁজুন..." : "Search articles, topics or questions..."
                }
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-150 rounded-2xl text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#FF6014] focus:ring-1 focus:ring-[#FF6014]/20 transition-all shadow-xs"
              />
            </div>

            {/* Category selection */}
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {faqCategories.slice(0, 3).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedCategory === cat.id
                      ? "bg-slate-950 border-slate-950 text-white"
                      : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {lang === "bn" ? cat.labelBn : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xs overflow-hidden">
            {isArticlesLoading ? (
              <div className="flex flex-col items-center justify-center p-16 space-y-2">
                <Loader2 className="w-8 h-8 text-[#FF6014] animate-spin" />
                <span className="text-xs text-slate-400 font-bold">
                  {lang === "bn" ? "লোড হচ্ছে..." : "Loading FAQ guides..."}
                </span>
              </div>
            ) : articlesData?.data?.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 text-center space-y-2">
                <AlertCircle className="w-10 h-10 text-slate-300" />
                <h4 className="text-sm font-bold text-slate-700">
                  {lang === "bn" ? "কোনো নির্দেশিকা পাওয়া যায়নি" : "No FAQ articles found"}
                </h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  {lang === "bn"
                    ? "অন্য কোনো কিওয়ার্ড দিয়ে পুনরায় অনুসন্ধান করে দেখুন।"
                    : "Try searching using different keywords or selecting other categories."}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-55">
                {articlesData?.data?.map((faq: any, idx: number) => {
                  const isExpanded = expandedFaq === faq.id;
                  return (
                    <div key={faq.id} className="transition-colors hover:bg-slate-50/20">
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                      >
                        <span className="text-sm font-black text-slate-800">
                          {lang === "bn" ? faq.titleBn : faq.title}
                        </span>
                        <div className="p-1.5 bg-slate-100/50 rounded-lg text-slate-500 shrink-0 ml-4">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-6 text-xs leading-relaxed text-slate-500 font-medium border-t border-slate-50/50 pt-3 animate-in slide-in-from-top-1 duration-150">
                          <p className="whitespace-pre-wrap">{lang === "bn" ? faq.contentBn : faq.content}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Support channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-[#FFF8F4]/30 border border-[#FFF0EB]/30 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl text-[#FF6014] border border-[#FFF0EB]">
                <MessageSquare size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">{lang === "bn" ? "লাইভ সাপোর্ট চ্যাট" : "Live Support Chat"}</h4>
                <p className="text-[10px] text-slate-450 font-semibold">{lang === "bn" ? "সাধারণত ২ মিনিটে উত্তর দেয়" : "Response in under 2 minutes"}</p>
                <button
                  onClick={() => setActiveTab("tickets")}
                  className="text-xs font-black text-[#FF6014] hover:underline pt-1 block"
                >
                  {lang === "bn" ? "সহায়তা অনুরোধ করুন →" : "Request assistance →"}
                </button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl text-slate-800 border border-slate-200/60">
                <Calendar size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">{lang === "bn" ? "বুকিং সংক্রান্ত নীতি" : "Booking Policy Guides"}</h4>
                <p className="text-[10px] text-slate-455 font-semibold">{lang === "bn" ? "বাতিল ও সময় পরিবর্তন নিয়মাবলী" : "Rescheduling & cancellation FAQs"}</p>
                <button
                  onClick={() => setSelectedCategory("Booking & Scheduling")}
                  className="text-xs font-black text-slate-800 hover:underline pt-1 block"
                >
                  {lang === "bn" ? "পলিসি দেখুন →" : "View policies →"}
                </button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl text-slate-800 border border-slate-200/60">
                <Shield size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">{lang === "bn" ? "নিরাপত্তা ও বিশ্বাস" : "Trust & Shield Policy"}</h4>
                <p className="text-[10px] text-slate-455 font-semibold">{lang === "bn" ? "প্রোভাইডার ভেরিফিকেশন ও নিরাপত্তা" : "Verified pros & safety checks"}</p>
                <button
                  onClick={() => setSelectedCategory("Safety & Trust")}
                  className="text-xs font-black text-slate-800 hover:underline pt-1 block"
                >
                  {lang === "bn" ? "বিস্তারিত পড়ুন →" : "Read overview →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tickets List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                {lang === "bn" ? "আপনার টিকেটসমূহ" : "Your Support Tickets"}
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6014] text-white text-xs font-bold rounded-xl shadow-sm shadow-[#FF6014]/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Plus size={14} />
                {lang === "bn" ? "নতুন টিকেট" : "New Ticket"}
              </button>
            </div>

            {isTicketsLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 text-[#FF6014] animate-spin" />
              </div>
            ) : ticketsData?.data?.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center space-y-2">
                <LifeBuoy className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="text-xs font-bold text-slate-600">
                  {lang === "bn" ? "কোনো টিকেট পাওয়া যায়নি" : "No support tickets created yet"}
                </h4>
                <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                  {lang === "bn"
                    ? "কোনো সমস্যা বা জিজ্ঞাসার জন্য নতুন সাপোর্ট টিকেট খুলুন।"
                    : "Create a support ticket if you are experiencing booking, refund or account issues."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {ticketsData?.data?.map((ticket: any) => {
                  const isSelected = selectedTicketId === ticket.id;
                  
                  // Status colors mapping
                  const statusColors: Record<string, string> = {
                    pending: "bg-amber-500/10 text-amber-600 border-amber-200/30",
                    in_progress: "bg-blue-500/10 text-blue-600 border-blue-200/30",
                    resolved: "bg-emerald-500/10 text-emerald-600 border-emerald-200/30",
                  };

                  return (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                        isSelected
                          ? "bg-slate-950 border-slate-950 text-white shadow-md"
                          : "bg-white border-slate-100 text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[9px] font-black uppercase tracking-wider ${isSelected ? "text-slate-400" : "text-slate-450"}`}>
                          {ticket.ticketId}
                        </span>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border shrink-0 ${
                          isSelected ? "bg-white/10 text-white border-white/20" : statusColors[ticket.status] || "bg-slate-100 text-slate-600"
                        }`}>
                          {ticket.status.replace("_", " ")}
                        </span>
                      </div>

                      <h4 className="text-xs font-black mt-1.5 leading-snug line-clamp-1">{ticket.subject}</h4>
                      
                      <div className="flex justify-between items-center gap-4 mt-3 pt-3 border-t border-slate-50/10">
                        <span className={`text-[10px] font-semibold ${isSelected ? "text-slate-400" : "text-slate-450"}`}>
                          {lang === "bn" ? "গুরুত্ব: " : "Priority: "}
                          <span className={`font-bold capitalize ${
                            ticket.priority === 'high' ? 'text-red-500' : ticket.priority === 'medium' ? 'text-orange-500' : 'text-slate-500'
                          }`}>{ticket.priority}</span>
                        </span>
                        
                        <span className={`text-[9px] font-semibold ${isSelected ? "text-slate-400" : "text-slate-450"}`}>
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Ticket Details Chat View */}
          <div className="lg:col-span-7">
            {selectedTicketId ? (
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                
                {/* Header */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTicketData?.data?.ticketId}</span>
                      <span className="text-[8px] font-bold text-red-500 uppercase tracking-wider bg-red-50 px-1.5 py-0.5 rounded">
                        {activeTicketData?.data?.priority} priority
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-800 mt-1">{activeTicketData?.data?.subject}</h3>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-slate-450 font-bold block">Created</span>
                    <span className="text-xs text-slate-700 font-extrabold">{activeTicketData?.data ? new Date(activeTicketData.data.createdAt).toLocaleDateString() : ""}</span>
                  </div>
                </div>

                {/* Messages Trail */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[350px]">
                  {isActiveTicketLoading ? (
                    <div className="flex justify-center items-center h-48">
                      <Loader2 className="w-6 h-6 text-[#FF6014] animate-spin" />
                    </div>
                  ) : (
                    <>
                      {/* Ticket Original Description */}
                      <div className="flex gap-3 max-w-xl">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                          <User size={14} />
                        </div>
                        <div className="bg-slate-50 border border-slate-100/80 p-3 rounded-2xl rounded-tl-none">
                          <span className="text-[10px] font-bold text-slate-800 block mb-1">
                            {activeTicketData?.data?.user?.name || "Client"} (Owner)
                          </span>
                          <p className="text-xs text-slate-600 font-medium whitespace-pre-wrap">{activeTicketData?.data?.description}</p>
                          <span className="text-[9px] text-slate-400 block mt-2 text-right">
                            {activeTicketData?.data ? new Date(activeTicketData.data.createdAt).toLocaleTimeString() : ""}
                          </span>
                        </div>
                      </div>

                      {/* Conversation Replies */}
                      {activeTicketData?.data?.replies?.map((rep: any, rIdx: number) => {
                        const isClient = rep.sender === "user";
                        return (
                          <div
                            key={rIdx}
                            className={`flex gap-3 max-w-xl ${isClient ? "" : "ml-auto flex-row-reverse"}`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              isClient ? "bg-slate-100 text-slate-500" : "bg-orange-100 text-[#FF6014]"
                            }`}>
                              {isClient ? <User size={14} /> : <Shield size={14} />}
                            </div>
                            <div className={`p-3 rounded-2xl ${
                              isClient 
                                ? "bg-slate-50 border border-slate-100/85 rounded-tl-none"
                                : "bg-orange-50/50 border border-orange-100/60 rounded-tr-none text-right"
                            }`}>
                              <span className="text-[10px] font-bold text-slate-800 block mb-1">
                                {rep.name}
                              </span>
                              <p className="text-xs text-slate-600 font-medium whitespace-pre-wrap">{rep.message}</p>
                              <span className="text-[9px] text-slate-400 block mt-2">
                                {new Date(rep.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="p-4 border-t border-slate-100 bg-slate-50/40 flex gap-2">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder={lang === "bn" ? "উত্তর লিখুন..." : "Type support message reply..."}
                    className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF6014]"
                  />
                  <button
                    type="submit"
                    disabled={isSendingReply || !replyMessage.trim()}
                    className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shrink-0 cursor-pointer disabled:opacity-40"
                  >
                    {isSendingReply ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </form>

              </div>
            ) : (
              <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center space-y-3 min-h-[500px] flex flex-col justify-center items-center">
                <LifeBuoy className="w-12 h-12 text-[#FF6014]/20" />
                <h3 className="text-base font-bold text-slate-800">
                  {lang === "bn" ? "কোনো টিকেট নির্বাচিত করা হয়নি" : "No Support Ticket Selected"}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  {lang === "bn"
                    ? "বিস্তারিত কথোপকথন দেখতে বাম পাশের টিকেট লিস্ট থেকে একটি টিকেট নির্বাচন করুন।"
                    : "Select a support ticket from the list on the left to see the message history or reply to support agents."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Support Ticket Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#FFF8F4] text-[#FF6014] rounded-xl">
                  <LifeBuoy size={18} />
                </div>
                <h3 className="text-base font-extrabold text-slate-800">
                  {lang === "bn" ? "নতুন সাপোর্ট রিকোয়েস্ট" : "Submit Support Request"}
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">
                  {lang === "bn" ? "টিকেটের বিষয়বস্তু (Subject)" : "Ticket Subject"}
                </label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder={lang === "bn" ? "সংক্ষেপে সমস্যার নাম লিখুন..." : "e.g. Booking rescheduled incorrectly"}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF6014]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">
                    {lang === "bn" ? "ক্যাটাগরি" : "Category"}
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF6014] bg-white"
                  >
                    <option value="booking">{lang === "bn" ? "বুকিং সংক্রান্ত" : "Booking"}</option>
                    <option value="payment">{lang === "bn" ? "পেমেন্ট/রিফান্ড" : "Payment & Refund"}</option>
                    <option value="account">{lang === "bn" ? "অ্যাকাউন্ট" : "Account"}</option>
                    <option value="other">{lang === "bn" ? "অন্যান্য" : "Other"}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">
                    {lang === "bn" ? "গুরুত্ব (Priority)" : "Priority Level"}
                  </label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF6014] bg-white"
                  >
                    <option value="low">{lang === "bn" ? "স্বল্প" : "Low"}</option>
                    <option value="medium">{lang === "bn" ? "মাঝারি" : "Medium"}</option>
                    <option value="high">{lang === "bn" ? "উচ্চ" : "High"}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">
                  {lang === "bn" ? "বিস্তারিত বর্ণনা" : "Problem Description"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder={lang === "bn" ? "আপনার সমস্যাটির বিস্তারিত বিবরণ লিখুন..." : "Provide detailed information about the issue you are facing..."}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF6014] resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  {lang === "bn" ? "বাতিল" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={isCreatingTicket}
                  className="px-5 py-2.5 bg-[#FF6014] text-white rounded-xl text-xs font-bold hover:bg-[#FF6014] transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isCreatingTicket && <Loader2 size={14} className="animate-spin" />}
                  {lang === "bn" ? "সাবমিট করুন" : "Submit Ticket"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
