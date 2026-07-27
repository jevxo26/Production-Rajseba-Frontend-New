import { Metadata } from "next";
import AboutClientPage from "./AboutClientPage";

export const metadata: Metadata = {
  title: "About Us — Rajseba",
  description: "Learn about Rajseba, Bangladesh's most reliable ecosystem for on-demand home services. We connect premium homes with vetted professionals since 2022.",
  keywords: ["about rajseba", "home services company Bangladesh", "verified experts Bangladesh", "home care services", "rajseba story"],
  alternates: { canonical: "https://rajseba.com/about" },
  openGraph: {
    title: "About Us — Rajseba",
    description: "Bangladesh's most reliable ecosystem for on-demand home services.",
    url: "https://rajseba.com/about",
    siteName: "Rajseba",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rajseba" }],
  },
  twitter: { card: "summary_large_image", title: "About Us — Rajseba", description: "Learn about Rajseba — Bangladesh's trusted home services platform.", images: ["/og-image.jpg"] },
};

export default function Page() {
  return <AboutClientPage />;
}