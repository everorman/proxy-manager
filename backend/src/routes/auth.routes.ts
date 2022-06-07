import { AuthController } from "../controller/authController";

export const AuthRoutes = [
  {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
    check: []
  },
  {
    method: "post",
    route: "/auth/register",
    controller: AuthController,
    action: "register",
    check: []
  },

]



// import {Router} from "express";
// import { AuthController } from "../controller/authController";

// const router = new Router();

// router.post("/login", AuthController.login);
// router.post("/register", AuthController.register);

// export default router;