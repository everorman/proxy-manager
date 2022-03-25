import {Router} from "express";
import { AuthController } from "../controller/authController";

const router = new Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;