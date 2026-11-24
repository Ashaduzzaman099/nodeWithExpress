import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";
import { User_Role } from "../../types";

const router = Router();

router.post("/", userController.createUser);
router.get("/", auth(User_Role.admin, User_Role.agent), userController.getAllUser);
// Find Single User
router.get("/:id", userController.getSingleUser);
// Update User
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
