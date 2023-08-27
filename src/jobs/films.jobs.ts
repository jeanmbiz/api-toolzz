import Bull, { Queue } from "bull";
import "dotenv/config";
import AppDataSource from "../data-source";
import { Films } from "../entities/film.entities";
import { redis } from "../redis.service";

class FilmsJobs {
  private filmsQuere: Queue;

  private static INSTANCE: FilmsJobs;

  public static getIntance(): FilmsJobs {
    if (!FilmsJobs.INSTANCE) {
      FilmsJobs.INSTANCE = new FilmsJobs();
    }
    return FilmsJobs.INSTANCE;
  }

  constructor() {
    this.filmsQuere = new Bull("films", {
      //   redis: { password: process.env.REDIS_PASSWORD },
    });

    this.filmsQuere.process("allFilms", async (job) => {
      await redis.set("getAllFilms", job.data);

      await redis.set("getAllFilms:validation", "true", "EX", 60);

      await redis.del("getAllFilms:is-refetching");
    });
  }

  async setAllFilmsProducer() {
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

    await this.filmsQuere.add("allFilms", JSON.stringify(films));
  }
}

export { FilmsJobs };
