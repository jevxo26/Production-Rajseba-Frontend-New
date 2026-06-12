"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide the global home page navbar and footer on dashboard and auth pages
  const isDashboard = pathname?.startsWith("/dashbord");
  const isAuth = pathname === "/login" || pathname === "/signup" || pathname === "/register";
  const hideLayout = isDashboard || isAuth;

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}
