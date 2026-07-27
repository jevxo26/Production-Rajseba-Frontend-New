import { Metadata } from "next";
import HelpClientPage from "./HelpClientPage";

export const metadata: Metadata = {
  title: "Help Center — Rajseba",
  description: "Find answers to your questions, learn how to manage bookings, understand warranties, and contact Rajseba customer support in Bangladesh.",
  keywords: ["rajseba help center", "customer support Bangladesh", "home services FAQ", "AC repair warranty", "booking help", "refund policy rajseba"],
  alternates: { canonical: "https://rajseba.com/help" },
  openGraph: {
    title: "Help Center — Rajseba",
    description: "Find answers and contact Rajseba support for all your home service queries.",
    url: "https://rajseba.com/help",
    siteName: "Rajseba",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Rajseba" }],
  },
  twitter: { card: "summary_large_image", title: "Help Center — Rajseba", description: "Rajseba Help Center — FAQs, booking help, warranty & refund info.", images: ["/og-image.jpg"] },
};

export default function Page() {
  return <HelpClientPage />;
}
