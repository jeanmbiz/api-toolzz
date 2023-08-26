import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  loginUserController,
  updateUserController,
} from "../controller/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userUpdateSchema } from "../schemas/createUser.schema";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const userRoutes = Router();

userRoutes.post("/login", loginUserController);
userRoutes.post("", createUserController);
userRoutes.patch("/:id", ensureAuthMiddleware, ensureDataIsValidMiddleware(userUpdateSchema), updateUserController);
userRoutes.delete("/:id",ensureAuthMiddleware, deleteUserController);

export default userRoutes;
