import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings — Rajseba",
  description: "View and manage all your home service bookings on Rajseba. Track status, view details, and manage upcoming or past service appointments.",
  keywords: ["my bookings rajseba", "track service booking", "manage home service", "booking history Bangladesh"],
  alternates: { canonical: "https://rajseba.com/bookings" },
  openGraph: {
    title: "My Bookings — Rajseba",
    description: "View and manage all your home service bookings on Rajseba.",
    url: "https://rajseba.com/bookings",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function BookingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
