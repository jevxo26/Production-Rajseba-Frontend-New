import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — Rajseba",
  description: "Sign in to your Rajseba account to manage bookings, track services, and access your dashboard. Secure OTP-based authentication.",
  keywords: ["rajseba login", "sign in rajseba", "home service account login", "OTP login Bangladesh"],
  alternates: { canonical: "https://rajseba.com/login" },
  openGraph: {
    title: "Login — Rajseba",
    description: "Sign in to your Rajseba account securely with OTP authentication.",
    url: "https://rajseba.com/login",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
