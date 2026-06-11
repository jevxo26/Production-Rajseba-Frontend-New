import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import Footer from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin", "latin-ext", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bai-jamjuree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rajseba - Expert Care for Your Premium Home",
  description:
    "Professional home services in Bangladesh with verified experts.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baiJamjuree.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-slate-50 font-sans">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}