import AppDataSource from "../../data-source";
import { Films } from "../../entities/film.entities";


const listFilmsService = async (): Promise<Films[]> => {
  const filmsRepository = AppDataSource.getRepository(Films);

  const films = await filmsRepository.createQueryBuilder('film').leftJoinAndSelect('film.user', 'user')
  .select([
    'film.id',
    'film.name',
    'film.gender',
    'film.durationInMinutes',
    'film.launchYear',
    'film.synopsis',
    'user.id',
    'user.name',
    'user.email',
  ])
  .where('film.isActive = :isActive', { isActive: true })
  .getMany();

  return films;
};

export default listFilmsService;
