import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up — Rajseba",
  description: "Create your free Rajseba account and start booking verified home service experts in Bangladesh. Fast sign-up with OTP verification.",
  keywords: ["rajseba signup", "create account rajseba", "register home services", "new user Bangladesh"],
  alternates: { canonical: "https://rajseba.com/signup" },
  openGraph: {
    title: "Sign Up — Rajseba",
    description: "Create your free Rajseba account and book verified home service experts.",
    url: "https://rajseba.com/signup",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
