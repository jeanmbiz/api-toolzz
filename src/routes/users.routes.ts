import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  loginUserController,
  updateUserController,
} from "../controller/users.controllers";

const userRoutes = Router();

userRoutes.post("/login", loginUserController);
userRoutes.post("", createUserController);
userRoutes.patch("/:id", updateUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;
