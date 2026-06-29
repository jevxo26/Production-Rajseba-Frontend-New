"use client";

import React from "react";
import { useSettingsState } from "./hooks/useSettingsState";
import SettingsSidebar from "./components/SettingsSidebar";
import SettingsHeader from "./components/SettingsHeader";
import PersonalInfoCard from "./components/PersonalInfoCard";
import SecurityCard from "./components/SecurityCard";
import NotificationsCard from "./components/NotificationsCard";

export default function SettingsPage() {
  const state = useSettingsState();

  // Custom Toggle Switch Component
  const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 ${
        checked ? "bg-[#FF6014]" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="w-full animate-in fade-in duration-200">
      {/* Background Watermark Pattern Wrapper */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: "url('/Group1.png'), url('/Group2.png')",
          backgroundSize: "800px",
          backgroundRepeat: "repeat",
          opacity: 0.05,
        }}
      />

      <div className=" mx-auto space-y-8 relative z-10">
        {/* Main Columns Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column Navigation Panel */}
          <SettingsSidebar
            activeTab={state.activeTab}
            handleTabClick={state.handleTabClick}
            router={state.router}
          />

          {/* Right Column content area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top User Profile Header Card */}
            <SettingsHeader email={state.personalInfo.email} />

            {/* Render Main Stack (Personal Info, Security, Notifications) */}
            {(state.activeTab === "personal" || state.activeTab === "security" || state.activeTab === "notifications") && (
              <div className="space-y-6">
                <PersonalInfoCard
                  personalInfo={state.personalInfo}
                  setPersonalInfo={state.setPersonalInfo}
                  handleSave={state.handleSave}
                />

                <SecurityCard
                  twoFactor={state.toggles.twoFactor}
                  onTwoFactorChange={() =>
                    state.setToggles({ ...state.toggles, twoFactor: !state.toggles.twoFactor })
                  }
                  Switch={Switch}
                />

                <NotificationsCard
                  emailNotif={state.toggles.emailNotif}
                  onEmailNotifChange={() =>
                    state.setToggles({ ...state.toggles, emailNotif: !state.toggles.emailNotif })
                  }
                  smsAlert={state.toggles.smsAlert}
                  onSmsAlertChange={() =>
                    state.setToggles({ ...state.toggles, smsAlert: !state.toggles.smsAlert })
                  }
                  promotions={state.toggles.promotions}
                  onPromotionsChange={() =>
                    state.setToggles({ ...state.toggles, promotions: !state.toggles.promotions })
                  }
                  Switch={Switch}
                />
              </div>
            )}

            {/* Render Linked Accounts tab content */}
            {state.activeTab === "linked" && (
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Linked Accounts</h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">
                    Manage your linked social accounts and login authenticators.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-sm text-slate-700">
                        G
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">Google</h5>
                        <p className="text-xs text-emerald-600 font-semibold mt-0.5">Connected</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-[#FF6014] text-xs font-bold transition-colors">
                      Disconnect
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm text-white">
                        f
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">Facebook</h5>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">Not Connected</p>
                      </div>
                    </div>
                    <button className="text-[#FF6014] hover:text-[#E0530A] text-xs font-bold transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Render Payment Methods tab content */}
            {state.activeTab === "payment" && (
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Payment Methods</h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">
                    Configure your saved wallets and cards for seamless checkouts.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-[#FFF0EB] bg-[#FFF8F4]/20 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black bg-[#FF6014] text-white px-2 py-1 rounded">bKash</span>
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">01712 ****78</h5>
                        <span className="text-[10px] text-[#FF6014] font-bold block mt-0.5">
                          Primary Payment Option
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-[#FF6014] font-extrabold uppercase">Active</span>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black bg-indigo-600 text-white px-2 py-1 rounded">Visa</span>
                      <div>
                        <h5 className="text-sm font-bold text-slate-800">**** **** **** 4812</h5>
                        <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Expires 12/28</span>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-slate-400 hover:text-[#FF6014] transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
