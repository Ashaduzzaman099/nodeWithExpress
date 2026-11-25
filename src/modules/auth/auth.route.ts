import { Router } from "express";
import { authController } from "./auth.controller";

// Authentication Route
const router = Router();
router.post("/login", authController.loginUser);
export const authRouter = router;
