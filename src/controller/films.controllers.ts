import { Request, Response } from "express";
import { iFilmRequest } from "../interfaces/film.interfaces";
import createFilmService from "../service/films/createFilm.service";
import listFilmsService from "../service/films/listFilms.service";
import deleteFilmService from "../service/films/deleteFilm.service";

const createFilmController = async (req: Request, res: Response) => {
  const filmData: iFilmRequest = req.body;
  const userId: string = req.user.id;
  const newFilm = await createFilmService(filmData, userId);
  return res.status(201).json(newFilm);
};

const listFilmsController = async (req: Request, res: Response) => {
  console.time();
  const films = await listFilmsService();
  console.timeEnd();
  return res.json(films);
};

const deleteFilmController = async (req: Request, res: Response) => {
  const filmId: string = req.params.id;

  await deleteFilmService(filmId);

  return res.status(204).send();
};

export { createFilmController, listFilmsController, deleteFilmController };
