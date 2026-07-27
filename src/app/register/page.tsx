import type { Metadata } from "next";
import RegisterClientPage from "./RegisterClientPage";

export const metadata: Metadata = {
  title: "Register as Vendor or Agent — Rajseba",
  description: "Join Rajseba as a service provider or agent. Register to offer professional home services to thousands of customers across Bangladesh.",
  keywords: [
    "rajseba vendor registration", "home service provider register",
    "agent sign up Bangladesh", "join rajseba", "become a service provider",
    "rajseba partner registration",
  ],
  alternates: { canonical: "https://rajseba.com/register" },
  openGraph: {
    title: "Register as Vendor or Agent — Rajseba",
    description: "Join Rajseba as a service provider and reach thousands of customers across Bangladesh.",
    url: "https://rajseba.com/register",
    siteName: "Rajseba",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Register on Rajseba" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Register as Vendor or Agent — Rajseba",
    description: "Join Rajseba as a service provider and reach thousands of customers.",
    images: ["/og-image.jpg"],
  },
};

export default function RegisterPage() {
  return <RegisterClientPage />;
}
