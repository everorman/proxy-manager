import { SiteController } from "../controller";
import { checkJwt } from "../middlewares/checkJwt";

export const SitesRoutes = [
  {
    method: "get",
    route: "/sites",
    controller: SiteController,
    action: "all",
    check: [checkJwt]
  },
  {
    method: "get",
    route: "/sitesCheck/:ip",
    controller: SiteController,
    action: "checkApi",
    check: []
  },
  {
    method: "post",
    route: "/sites",
    controller: SiteController,
    action: "save",
    check: [checkJwt]
  },
]