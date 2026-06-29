"use client";

import React from "react";

interface PersonalInfoCardProps {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  setPersonalInfo: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      phone: string;
      location: string;
    }>
  >;
  handleSave: (e: React.FormEvent) => void;
}

export default function PersonalInfoCard({ personalInfo, setPersonalInfo, handleSave }: PersonalInfoCardProps) {
  return (
    <div id="personal" className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 scroll-mt-6">
      <h3 className="text-lg font-bold text-slate-900">Personal Info</h3>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:outline-none focus:bg-white focus:border-rose-350 focus:ring-4 focus:ring-[#FF6014]/20/5 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:outline-none focus:bg-white focus:border-rose-350 focus:ring-4 focus:ring-[#FF6014]/20/5 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Phone Number</label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:outline-none focus:bg-white focus:border-rose-350 focus:ring-4 focus:ring-[#FF6014]/20/5 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Location</label>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-sm text-slate-900 font-bold focus:outline-none focus:bg-white focus:border-rose-350 focus:ring-4 focus:ring-[#FF6014]/20/5 transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#FF6014] hover:bg-[#E0530A] text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-md shadow-[#FF6014]/10 transition-all active:scale-[0.98]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
