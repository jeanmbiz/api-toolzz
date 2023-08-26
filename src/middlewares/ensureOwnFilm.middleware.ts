import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import AppDataSource from "../data-source";
import { Films } from "../entities/film.entities";
import { User } from "../entities/user.entities";

const ensureOwnFilmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filmRepository = AppDataSource.getRepository(Films);
  const userRepository = AppDataSource.getRepository(User);

  const filmUser = await filmRepository.findOneBy({ id: req.params.id });
  const findUserLogued = await userRepository.findOneBy({ id: req.user.id });

  if (findUserLogued.isActive !== true) {
    throw new AppError("User is not active", 400);
  }

  if (filmUser.user.id !== req.user.id) {
    throw new AppError("You don't have permission", 403);
  }
  next();
};

export default ensureOwnFilmMiddleware;
