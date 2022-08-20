import { UserController } from "../controller";
import { UserRole } from "../entity/User";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

export const UserRoutes = [
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    check: [checkJwt, checkRole([UserRole.ADMIN])]
  },
  {
    method: "post",
    route: "/user/profile",
    controller: UserController,
    action: "profile",
    check: [checkJwt]
  },
  {
    method: "get",
    route: "/user/search/:key",
    controller: UserController,
    action: "search",
    check: [checkJwt, checkRole([UserRole.ADMIN])]
  }
]