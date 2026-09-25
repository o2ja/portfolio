import { boot } from "../_shared/boot";
import { Fraunces, Inter } from "../_shared/next-font";
import { CartProvider } from "../../PORTFOLIO_EXPORT_full_system/homepage/lib/cart";
import SiteLayout from "../../PORTFOLIO_EXPORT_full_system/homepage/SiteLayout";
import HomePage from "../../PORTFOLIO_EXPORT_full_system/homepage/page";
import "../../PORTFOLIO_EXPORT_full_system/homepage/styles/globals.css";

// RootLayout.tsx imports "./globals.css", which the export keeps under styles/,
// so its three jobs (fonts, body classes, CartProvider) are repeated here as-is.
const fraunces = Fraunces({ variable: "--font-fraunces" });
const inter = Inter({ variable: "--font-inter" });
document.documentElement.className = `${fraunces.variable} ${inter.variable}`;
document.body.className = "min-h-dvh bg-paper antialiased";

boot({
  assetBase: "/preview-assets/bagel-house",
  build: async () => <CartProvider>{await SiteLayout({ children: await HomePage() })}</CartProvider>,
});
