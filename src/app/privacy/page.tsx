import { Metadata } from "next";
import PrivacyClientPage from "./PrivacyClientPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Rajseba",
  description: "Read the Privacy Policy of Rajseba to understand how we collect, use, protect, and manage your personal data on Bangladesh's top home services platform.",
  keywords: ["privacy policy rajseba", "data protection Bangladesh", "rajseba user privacy", "personal data policy"],
  alternates: { canonical: "https://rajseba.com/privacy" },
  openGraph: {
    title: "Privacy Policy — Rajseba",
    description: "Read our Privacy Policy to learn how we protect your personal information.",
    url: "https://rajseba.com/privacy",
    siteName: "Rajseba",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rajseba" }],
  },
  twitter: { card: "summary_large_image", title: "Privacy Policy — Rajseba", description: "Rajseba Privacy Policy — how we collect, use, and protect your data.", images: ["/og-image.jpg"] },
};

export default function Page() {
  return <PrivacyClientPage />;
}
