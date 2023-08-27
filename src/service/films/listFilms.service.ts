import AppDataSource from "../../data-source";
import { Films } from "../../entities/film.entities";
import { FilmsJobs } from "../../jobs/films.jobs";
import { redis } from "../../redis.service";

const listFilmsService = async (): Promise<Films[]> => {
  const filmsJobs = FilmsJobs.getIntance();

  const booksFromCache = await redis.get("getAllFilms");

  const isFilmsFromCacheStale = !(await redis.get("getAllFilms:validation"));

  if (isFilmsFromCacheStale) {
    const isRefetching = !!(await redis.get("getAllFilms:is-refetching"));
    if (!isRefetching) {
      await redis.set("getAllFilms:is-refetching", "true", "EX", 20);
      await filmsJobs.setAllFilmsProducer();
    }
  }

  if (booksFromCache) {
    return JSON.parse(booksFromCache);
  }

  const filmsRepository = AppDataSource.getRepository(Films);

  const films = await filmsRepository
    .createQueryBuilder("film")
    .leftJoinAndSelect("film.user", "user")
    .select([
      "film.id",
      "film.name",
      "film.gender",
      "film.durationInMinutes",
      "film.launchYear",
      "film.synopsis",
      "user.id",
      "user.name",
      "user.email",
    ])
    .where("film.isActive = :isActive", { isActive: true })
    .getMany();

  await redis.set("getAllFilms", JSON.stringify(films));

  return films;
};

export default listFilmsService;
