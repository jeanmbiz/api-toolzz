import {
  IUserLogin,
  IUserRequest,
  IUserUpdateRequest,
} from "../interfaces/user.interfaces";
import { Request, Response } from "express";
import loginUserService from "../service/users/loginUser.service";
import createUserService from "../service/users/createUser.service";
import updateUserService from "../service/users/updateUser.service";
import deleteUserService from "../service/users/deleteUser.service";

const loginUserController = async (req: Request, res: Response) => {
  const userData: IUserLogin = req.body;

  const token = await loginUserService(userData);

  return res.status(200).json({ token });
};

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdateRequest = req.body;
  const userId = req.params.id;
  const updatedUser = await updateUserService(userData, userId);

  return res.json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const userAuth: string = req.user.id;

  await deleteUserService(userId, userAuth);

  return res.status(204).send();
};

export {
  loginUserController,
  createUserController,
  updateUserController,
  deleteUserController,
};
