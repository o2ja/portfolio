import { boot } from "../_shared/boot";
import RootLayout from "../../PORTFOLIO_EXPORT_Coach/homepage/root-layout";
import SiteLayout from "../../PORTFOLIO_EXPORT_Coach/homepage/layout";
import HomePage from "../../PORTFOLIO_EXPORT_Coach/homepage/page";

boot({
  assetBase: "/preview-assets/coach",
  build: async () => RootLayout({ children: await SiteLayout({ children: await HomePage() }) }),
});
