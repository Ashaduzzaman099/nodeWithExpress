import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUser);
// Find Single User
router.get("/:id", userController.getSingleUser);

export const userRoute = router;
