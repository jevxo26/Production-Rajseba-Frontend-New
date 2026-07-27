import type { Metadata } from "next";
import MapClientPage from "./MapClientPage";

export const metadata: Metadata = {
  title: "Find Service Experts Near You — Rajseba Map",
  description: "Explore the interactive map to find verified home service professionals near your location in Bangladesh. View ratings, availability, and book instantly.",
  keywords: [
    "home service map Bangladesh", "find experts near me", "service professionals location",
    "AC repair near me", "cleaning service near me", "Rajseba map",
    "home service providers Dhaka", "nearby home experts",
  ],
  alternates: { canonical: "https://rajseba.com/map" },
  openGraph: {
    title: "Find Service Experts Near You — Rajseba Map",
    description: "Explore verified home service professionals near your location in Bangladesh.",
    url: "https://rajseba.com/map",
    siteName: "Rajseba",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rajseba Service Experts Map" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Service Experts Near You — Rajseba Map",
    description: "Find verified home service professionals near you in Bangladesh.",
    images: ["/og-image.jpg"],
  },
};

export default function MapPage() {
  return <MapClientPage />;
}
