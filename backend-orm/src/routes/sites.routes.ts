import { SiteController } from "../controller";

export const SitesRoutes = [
  {
    method: "get",
    route: "/sites",
    controller: SiteController,
    action: "all"
  },
  {
    method: "get",
    route: "/sitesCheck/:ip",
    controller: SiteController,
    action: "checkApi"
  },
  {
    method: "post",
    route: "/sites",
    controller: SiteController,
    action: "save"
  },
]