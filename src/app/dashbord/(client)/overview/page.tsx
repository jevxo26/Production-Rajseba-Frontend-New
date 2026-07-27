"use client";

import * as React from "react";
import { useAppSelector } from "@/redux/hooks";
import CustomerOverview from "./components/CustomerOverview";
import AgentOverview from "./components/AgentOverview";

export default function UnifiedOverviewPage() {
  const role = useAppSelector((state) => state.auth.role) || "superadmin";

  if (role === "agent") {
    return <AgentOverview />;
  }

  return <CustomerOverview />;
}
