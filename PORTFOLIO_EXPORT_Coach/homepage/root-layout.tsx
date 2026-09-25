import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";

import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Strength coaching for women",
    template: "%s",
  },
  description:
    "Personalised online and in-gym strength coaching, built around your week and your goals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // the font variables live on <html> so `--font-display`/`--font-sans` (declared
    // on :root by Tailwind's theme) can resolve them
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${archivo.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
