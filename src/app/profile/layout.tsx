import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile — Rajseba",
  description: "Manage your Rajseba profile, update personal information, view bookings, and control your account settings.",
  robots: { index: false, follow: false },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
