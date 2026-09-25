import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import { CartProvider } from "@/lib/cart";
import "./globals.css";

/**
 * Two typefaces, no more.
 *
 * Fraunces is a variable serif with an optical-size axis — set large and tight
 * it reads editorial and food-focused rather than corporate. Inter carries
 * every piece of UI text. `display: swap` keeps first paint immediate.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bagel House — bagels, coffee and ice cream",
    template: "%s · Bagel House",
  },
  description:
    "Hand-rolled bagels, single-origin coffee and small-batch ice cream, made fresh every morning.",
  openGraph: {
    type: "website",
    siteName: "Bagel House",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-paper antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
