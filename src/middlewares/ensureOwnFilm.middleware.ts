import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import AppDataSource from "../data-source";
import { Films } from "../entities/film.entities";

const ensureOwnFilmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filmRepository = AppDataSource.getRepository(Films);

  const filmBelongsUser = await filmRepository.findOneBy({ id: req.params.id });

  if (!filmBelongsUser) {
    throw new AppError("You don't have permission", 403);
  }
  next();
};

export default ensureOwnFilmMiddleware;
