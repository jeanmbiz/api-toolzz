import { Router } from "express";
import { createFilmController, deleteFilmController, listFilmsController } from "../controller/films.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureOwnFilmMiddleware from "../middlewares/ensureOwnFilm.middleware";


const filmsRoutes = Router();

filmsRoutes.post("", ensureAuthMiddleware, createFilmController );
filmsRoutes.get("", listFilmsController );
filmsRoutes.delete("/:id", ensureAuthMiddleware, ensureOwnFilmMiddleware, deleteFilmController );

export default filmsRoutes;
