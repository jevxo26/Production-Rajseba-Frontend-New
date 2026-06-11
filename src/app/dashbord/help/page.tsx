"use client";

import { useRole } from "@/context/RoleContext";
import { ShieldAlert, HelpCircle, MessageSquare, PhoneCall, Mail, Check } from "lucide-react";
import { useState } from "react";

export default function HelpCenterPage() {
  const { role } = useRole();
  const [success, setSuccess] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    { q: "How do I book a professional?", a: "Go to the homepage, choose a category (e.g. AC Repair), choose your preferred package, select a schedule date/time, and complete your payment." },
    { q: "What is your refund policy?", a: "If the assigned expert fails to arrive or cancels the booking, the full paid amount is refunded to your Rajseba Wallet instantly." },
    { q: "Can I contact the technician directly?", a: "Yes, once a technician accepts your booking, their verified phone number will be displayed in your booking console and active tracker." },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (role !== "customer") {
    return <AccessDenied roleRequired="Customer" />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Help Center</h1>
          <p className="text-slate-500 mt-1">Browse frequently asked questions or submit an emergency support ticket.</p>
        </div>

        {success && (
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
            <Check size={16} /> Ticket submitted! We will respond shortly.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 Columns: FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-800 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={18} className="text-rose-500" />
                    {faq.q}
                  </span>
                  <span className="text-lg text-slate-400">{faqOpen === idx ? "−" : "+"}</span>
                </button>
                {faqOpen === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 font-medium leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Contact Support Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare size={20} className="text-rose-500" /> Raise a Ticket
          </h3>

          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Subject</label>
              <input
                type="text"
                placeholder="e.g. AC service issue"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">Description</label>
              <textarea
                rows={4}
                placeholder="Describe your concern in detail..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all font-semibold resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all active:scale-[0.98]"
            >
              Submit Support Ticket
            </button>
          </form>

          {/* Contact Details */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-400">
            <p className="flex items-center gap-1.5"><PhoneCall size={12} /> Helpline: 16789 (toll-free)</p>
            <p className="flex items-center gap-1.5"><Mail size={12} /> Email: support@rajseba.com</p>
          </div>
        </div>

      </div>
    </div>
  );
}

function AccessDenied({ roleRequired }: { roleRequired: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center animate-in fade-in duration-200">
      <div className="p-4 bg-rose-50 rounded-2xl text-rose-500 mb-4">
        <ShieldAlert size={48} />
      </div>
      <h3 className="text-xl font-bold text-slate-800">Access Denied</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">
        This subpage is only accessible to users with the <strong className="text-slate-800">{roleRequired}</strong> role. 
        Please toggle your preview role using the selector at the top.
      </p>
    </div>
  );
}
