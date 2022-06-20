import { ProxyController } from "../controller";
import { UserRole } from "../entity/User";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

export const ProxyRoutes = [
  {
    method: "post",
    route: "/proxy/list",
    controller: ProxyController,
    action: "all",
    check: [checkJwt]
  },
  {
    method: "post",
    route: "/proxy/add",
    controller: ProxyController,
    action: "save",
    check: [checkJwt, checkRole([UserRole.ADMIN])]
  },
  {
    method: "patch",
    route: "/proxy/:id",
    controller: ProxyController,
    action: "update",
    check: [checkJwt, checkRole([UserRole.ADMIN])]
  },
  {
    method: "delete",
    route: "/proxy/delete",
    controller: ProxyController,
    action: "remove",
    check: [checkJwt, checkRole([UserRole.ADMIN])]
  },
]