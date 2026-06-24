"use client";



import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
// import { RoleProvider } from "@/context/RoleContext";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dashboard-html");

    // Mutation observer to detect when a modal (custom or Radix UI) is open in the DOM
    const checkModalState = () => {
      const hasCustomModal = !!document.querySelector(".fixed.inset-0.z-50, .fixed.inset-0.z-\\[50\\]");
      const hasRadixModal = document.body.hasAttribute("data-scroll-locked");
      if (hasCustomModal || hasRadixModal) {
        document.documentElement.classList.add("modal-open");
        document.body.classList.add("modal-open");
      } else {
        document.documentElement.classList.remove("modal-open");
        document.body.classList.remove("modal-open");
      }
    };

    // Run once initially
    checkModalState();

    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });

    return () => {
      document.documentElement.classList.remove("dashboard-html");
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#FFF8F7] text-slate-900 relative">
      {/* Tiled watermark backgrounds */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.16] z-0">
        <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('/Group1.png')", backgroundSize: "800px 800px" }} />
        <div className="absolute inset-0 bg-repeat mix-blend-multiply" style={{ backgroundImage: "url('/Group2.png')", backgroundSize: "800px 800px", backgroundPosition: "400px 400px" }} />
      </div>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative z-10 bg-transparent">
        {/* Top Navbar */}
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-transparent p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}