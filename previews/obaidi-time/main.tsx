import { boot } from "../_shared/boot";
import RootLayout from "../../PORTFOLIO_EXPORT_obaidi_time/homepage/layout";
import Template from "../../PORTFOLIO_EXPORT_obaidi_time/homepage/template";
import Page from "../../PORTFOLIO_EXPORT_obaidi_time/homepage/page";

boot({
  assetBase: "/preview-assets/obaidi-time",
  build: async () => RootLayout({ children: <Template>{await Page()}</Template> } as never),
});
