import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entities";

const ensureOwnUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUserLogued = await userRepository.findOneBy({ id: req.user.id });

  if (req.user.id !== req.params.id || findUserLogued.isActive !== true) {
    throw new AppError("You don't have permission", 403);
  }
  next();
};

export default ensureOwnUserMiddleware;
