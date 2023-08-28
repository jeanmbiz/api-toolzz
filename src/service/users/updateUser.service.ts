import {
  IUserResponse,
  IUserUpdateRequest,
} from "../../interfaces/user.interfaces";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entities";
import {
  userResponseSchema,
  userUpdateSchema,
} from "../../schemas/createUser.schema";

const updateUserService = async (
  userData: IUserUpdateRequest,
  userId: string
): Promise<IUserResponse> => {
  try {
    await userUpdateSchema.validate(userData, { abortEarly: false });
  } catch (validationError) {
    throw new AppError(validationError.errors.join(", "), 400);
  }

  const userRepository = AppDataSource.getRepository(User);

  const foundUserByParam = await userRepository.findOneBy({ id: userId });

  if (!foundUserByParam) {
    throw new AppError("User not found.", 404);
  }

  const { name, email, password } = userData;

  if (!name && !email && !password) {
    throw new AppError(
      "You do not have permission to change one of this values",
      403
    );
  }

  const updatedUser = userRepository.create({
    ...foundUserByParam,
    name: name || foundUserByParam.name,
    email: email || foundUserByParam.email,
    password: password || foundUserByParam.password,
    updatedAt: new Date(),
  });

  await userRepository.save(updatedUser);

  const userResponse = await userResponseSchema.validate(updatedUser, {
    stripUnknown: true,
  });

  return userResponse;
};

export default updateUserService;
