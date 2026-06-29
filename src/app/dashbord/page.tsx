"use client";

import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Import Modular Dashboard Components
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import AgentDashboard from "./components/AgentDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import DashboardSkeleton from "./components/DashboardSkeleton";

export default function DashboardPage() {
  const rawRole = useAppSelector((state) => state.auth.role) || "client";
  const role = typeof rawRole === "string" ? rawRole.toLowerCase().replace(/\s+/g, "") : "client";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && role === "client") {
      router.push("/dashbord/overview");
    }
  }, [role, router, isLoading]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  switch (role) {
    case "superadmin":
      return <SuperAdminDashboard />;
    case "agent":
      return <AgentDashboard />;
    case "vendor":
      return <ProviderDashboard />;
    case "client":
      return (
        <div className="p-8 text-center text-slate-500 animate-pulse">
          Redirecting to Overview...
        </div>
      );
    default:
      return (
        <div className="p-8 text-center text-slate-500">
          Loading dashboard content...
        </div>
      );
  }
}