import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The AI Homepage - Your Daily AI News Aggregator",
  description: "Stay updated with the latest AI news from Reddit, TechCrunch, Hacker News, and Startupper.gr. All in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
