import { User } from "../../entities/user.entities";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IUserRequest, IUserResponse } from "../../interfaces/user.interfaces";
import { createUserSchema, userResponseSchema } from "../../schemas/createUser.schema";

const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {

  try {
    await createUserSchema.validate(userData, { abortEarly: false });
  } catch (validationError) {
    throw new AppError(validationError.errors.join(', '), 400);
  }


  const userRepository = AppDataSource.getRepository(User);

  const userAreadyExists = await userRepository.findOneBy({
    email: userData.email,
  });

  if (userAreadyExists) {
    throw new AppError("This email address is already being used", 409);
  }

  const createdUser = userRepository.create(userData);

  await userRepository.save(createdUser);

  const userWithoutPassword = await userResponseSchema.validate(createdUser, {
    stripUnknown: true,
  });

  return userWithoutPassword;
};

export default createUserService;
