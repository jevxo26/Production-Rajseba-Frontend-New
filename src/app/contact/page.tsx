import { Metadata } from "next";
import ContactClientPage from "./ContactClientPage";

export const metadata: Metadata = {
  title: "Contact Us — Rajseba Support Center",
  description: "Get in touch with Rajseba. Reach our 24/7 support at 01813-333373 or email info@rajseba.com for booking help, refunds, or general enquiries.",
  keywords: ["contact rajseba", "rajseba phone number", "rajseba email", "rajseba office address", "home service customer support Bangladesh"],
  alternates: { canonical: "https://rajseba.com/contact" },
  openGraph: {
    title: "Contact Us — Rajseba Support Center",
    description: "Get in touch with Rajseba. 24/7 support for booking and service queries.",
    url: "https://rajseba.com/contact",
    siteName: "Rajseba",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rajseba" }],
  },
  twitter: { card: "summary_large_image", title: "Contact Us — Rajseba Support Center", description: "Reach Rajseba support 24/7 for booking, refunds, and enquiries.", images: ["/og-image.jpg"] },
};

export default function Page() {
  return <ContactClientPage />;
}