import { Router } from "express";
import { authController } from "./auth.controller";

// Authentication Route
const router = Router();
router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.generateToken);
export const authRouter = router;
