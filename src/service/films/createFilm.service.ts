import AppDataSource from "../../data-source";
import { Films } from "../../entities/film.entities";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors/AppError";
import { iFilmRequest, iFilmResponse } from "../../interfaces/film.interfaces";
import { createFilmSchema } from "../../schemas/createFilm.schema";
import { userResponseSchema } from "../../schemas/createUser.schema";

const createFilmService = async (
  filmData: iFilmRequest,
  userId: string
): Promise<iFilmResponse> => {
  try {
    await createFilmSchema.validate(filmData, { abortEarly: false });
  } catch (validationError) {
    throw new AppError(validationError.errors.join(", "), 400);
  }

  const filmRepository = AppDataSource.getRepository(Films);
  const userRepository = AppDataSource.getRepository(User);

  const { name, gender, durationInMinutes, launchYear, synopsis } = filmData;

  const filmAlreadyExists = await filmRepository.findOneBy({
    name: name,
    synopsis: synopsis,
  });

  if (filmAlreadyExists) {
    throw new AppError("Film already exists", 409);
  }

  const userAlreadyExists = await userRepository.findOneBy({ id: userId });

  
  if (!userAlreadyExists) {
    throw new AppError("User does not exist", 404);
  }

  await userRepository.save(userAlreadyExists);

  const userWithoutPassword = await userResponseSchema.validate(userAlreadyExists, {
    stripUnknown: true,
  });

  const newFilm = filmRepository.create({
    name,
    gender,
    durationInMinutes,
    launchYear,
    synopsis,
    user: userWithoutPassword,
  });

  
  await filmRepository.save(newFilm);


  return newFilm;
};

export default createFilmService;
