import {Router} from "express";
import { AuthController } from "../controller/authController";

const router = new Router();

router.post("/login", AuthController.login());

export default router;