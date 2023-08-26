import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import "dotenv/config";
import { User } from "../../entities/user.entities";
import { IUserLogin } from "../../interfaces/user.interfaces";

const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: email });
 
  if (!user) {
    throw new AppError("User or password invalid", 403);
  }

  if (!user.isActive) {
    throw new AppError("User is not active", 400);
  }
  
  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or password invalid", 403);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY,
    {
      subject: String(user.id),
      expiresIn: "24h",
    }
  );

  return token;
};

export default createSessionService;
