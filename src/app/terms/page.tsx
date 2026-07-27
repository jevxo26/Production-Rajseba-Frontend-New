import { Metadata } from "next";
import TermsClientPage from "./TermsClientPage";

export const metadata: Metadata = {
  title: "Terms of Service — Rajseba",
  description: "Read the Terms of Service of Rajseba to understand our user agreement, booking policies, warranty terms, and liability limitations.",
  keywords: ["terms of service rajseba", "terms and conditions", "user agreement Bangladesh", "booking policy rajseba", "service warranty terms"],
  alternates: { canonical: "https://rajseba.com/terms" },
  openGraph: {
    title: "Terms of Service — Rajseba",
    description: "Read our Terms of Service to understand user policies and booking agreements.",
    url: "https://rajseba.com/terms",
    siteName: "Rajseba",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rajseba" }],
  },
  twitter: { card: "summary_large_image", title: "Terms of Service — Rajseba", description: "Rajseba Terms of Service — booking, warranty, and liability terms.", images: ["/og-image.jpg"] },
};

export default function Page() {
  return <TermsClientPage />;
}
