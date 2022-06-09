import { ProxyController } from "../controller";
import { checkJwt } from "../middlewares/checkJwt";

export const ProxyRoutes = [
  {
    method: "get",
    route: "proxy/all",
    controller: ProxyController,
    action: "all",
    check: [checkJwt]
  },
  {
    method: "post",
    route: "/proxy/add",
    controller: ProxyController,
    action: "save",
    check: [checkJwt]
  },
  {
    method: "post",
    route: "/proxy/update",
    controller: ProxyController,
    action: "update",
    check: [checkJwt]
  },
  {
    method: "delete",
    route: "/proxy/delete",
    controller: ProxyController,
    action: "remove",
    check: [checkJwt]
  },
]