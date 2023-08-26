import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const ensureOwnUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (req.user.id !== req.params.id) {
    throw new AppError("You don't have permission", 403);
  }
  next();
};

export default ensureOwnUserMiddleware;
