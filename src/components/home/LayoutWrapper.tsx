"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout =
    pathname?.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/register";

  return (
    <body className="antialiased min-h-screen bg-white">
      {!hideLayout && <Navbar />}

      <main className={`min-h-screen ${hideLayout ? "pt-0" : "pb-20 md:pb-0"}`}>
        {children}
      </main>

      {!hideLayout && <Footer />}
    </body>
  );
}
