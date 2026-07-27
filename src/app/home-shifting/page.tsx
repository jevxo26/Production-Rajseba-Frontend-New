import type { Metadata } from "next";
import HomeShiftingClientPage from "./HomeShiftingClientPage";

export const metadata: Metadata = {
  title: "Home Shifting & Relocation Service — Rajseba",
  description: "Professional home shifting and relocation service in Bangladesh. Get a custom quote for packing, moving, and settling your home with Rajseba's trusted team.",
  keywords: [
    "home shifting Bangladesh", "house moving service Dhaka", "relocation service Bangladesh",
    "professional movers Bangladesh", "rajseba shifting", "furniture moving Dhaka",
    "packing and moving Bangladesh", "home relocation service",
  ],
  alternates: { canonical: "https://rajseba.com/home-shifting" },
  openGraph: {
    title: "Home Shifting & Relocation Service — Rajseba",
    description: "Professional home shifting and relocation service with trusted movers in Bangladesh.",
    url: "https://rajseba.com/home-shifting",
    siteName: "Rajseba",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rajseba Home Shifting Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Shifting & Relocation Service — Rajseba",
    description: "Professional home shifting with trusted movers across Bangladesh.",
    images: ["/og-image.jpg"],
  },
};

export default function HomeShiftingPage() {
  return <HomeShiftingClientPage />;
}