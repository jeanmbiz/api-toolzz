import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError";
import userRoutes from "./routes/users.routes";
import filmsRoutes from "./routes/films.routes";


const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/films", filmsRoutes);

app.use(handleError);

export default app;
