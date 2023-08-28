import AppDataSource from "../../data-source";
import { Films } from "../../entities/film.entities";
import { AppError } from "../../errors/AppError";

const deleteFilmService = async (filmId: string): Promise<Object> => {
  const filmRepository = AppDataSource.getRepository(Films);
  const findFilm = await filmRepository.findOneBy({ id: filmId });

  if (!findFilm) {
    throw new AppError("Film doest not exist", 404);
  }

  if (findFilm.isActive == false) {
    throw new AppError("Film is already inative", 400);
  }

  findFilm.isActive = false;
  await filmRepository.save(findFilm);
  return {};
};

export default deleteFilmService;
