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
import ensureOwnUserMiddleware from "../middlewares/ensureOwnUser.middleware";

const userRoutes = Router();

userRoutes.post("/login", loginUserController);
userRoutes.post("", createUserController);
userRoutes.patch("/:id", ensureAuthMiddleware, ensureOwnUserMiddleware, ensureDataIsValidMiddleware(userUpdateSchema), updateUserController);
userRoutes.delete("/:id",ensureAuthMiddleware, ensureOwnUserMiddleware, deleteUserController);

export default userRoutes;
