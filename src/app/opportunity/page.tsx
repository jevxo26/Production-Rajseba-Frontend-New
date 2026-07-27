import type { Metadata } from "next";
import OpportunityClientPage from "./OpportunityClientPage";

export const metadata: Metadata = {
  title: "Career Opportunities — Rajseba",
  description: "Join Rajseba as a vendor or agent. Grow your income by offering professional home services to verified customers across Bangladesh. Apply today.",
  keywords: [
    "rajseba career", "work with rajseba", "vendor opportunity Bangladesh",
    "home service agent", "rajseba jobs", "freelance home services Bangladesh",
    "become a vendor", "service provider opportunity",
  ],
  alternates: { canonical: "https://rajseba.com/opportunity" },
  openGraph: {
    title: "Career Opportunities — Rajseba",
    description: "Join Rajseba as a vendor or agent and grow your business in Bangladesh.",
    url: "https://rajseba.com/opportunity",
    siteName: "Rajseba",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Join Rajseba as Vendor or Agent" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Opportunities — Rajseba",
    description: "Join Rajseba as a vendor or agent. Grow your business in Bangladesh.",
    images: ["/og-image.jpg"],
  },
};

export default function OpportunityPage() {
  return <OpportunityClientPage />;
}
