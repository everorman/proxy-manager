import { SiteController, UserController } from "./controller";


export const Routes = [
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
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
  }, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
  }, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
  }, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
  }];