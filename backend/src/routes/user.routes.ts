import { UserController } from "../controller";
import { checkJwt } from "../middlewares/checkJwt";

export const UserRoutes = [
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    check: []
  },
  {
    method: "post",
    route: "/user/profile",
    controller: UserController,
    action: "profile",
    check: [checkJwt]
  }
]