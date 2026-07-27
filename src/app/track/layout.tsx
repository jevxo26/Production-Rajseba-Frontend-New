import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Booking — Rajseba",
  description: "Track the real-time status of your home service booking on Rajseba. Know when your expert is on the way and stay updated at every step.",
  keywords: ["track booking rajseba", "booking status", "service tracking Bangladesh", "live booking update"],
  alternates: { canonical: "https://rajseba.com/track" },
  openGraph: {
    title: "Track Your Booking — Rajseba",
    description: "Track the real-time status of your home service booking on Rajseba.",
    url: "https://rajseba.com/track",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
