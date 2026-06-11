"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "superadmin" | "operator" | "agent" | "provider" | "customer";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  roleName: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("superadmin");

  useEffect(() => {
    const savedRole = localStorage.getItem("rajseba_user_role") as UserRole;
    if (savedRole && ["superadmin", "operator", "agent", "provider", "customer"].includes(savedRole)) {
      setRoleState(savedRole);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("rajseba_user_role", newRole);
  };

  const getRoleName = (r: UserRole): string => {
    switch (r) {
      case "superadmin":
        return "Super Admin";
      case "operator":
        return "Operator";
      case "agent":
        return "Agent";
      case "provider":
        return "Service Provider";
      case "customer":
        return "Customer";
      default:
        return "User";
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole, roleName: getRoleName(role) }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
