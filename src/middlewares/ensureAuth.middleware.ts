import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, user: any) => {
    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }

    req.user = {
      id: user.id,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
