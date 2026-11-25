import { Router } from "express";
import auth from "../../middleware/auth";
import { User_Role } from "../../types";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.createUser);
router.get(
  "/",
  auth(User_Role.admin, User_Role.agent),
  userController.getAllUser,
);
// Find Single User
router.get(
  "/:id",
  auth(User_Role.admin, User_Role.agent, User_Role.user),
  userController.getSingleUser,
);
// Update User
router.put(
  "/:id",
  auth(User_Role.admin, User_Role.user),
  userController.updateUser,
);
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
