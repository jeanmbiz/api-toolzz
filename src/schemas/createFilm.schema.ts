import * as yup from "yup";
import { SchemaOf } from "yup";
import { iFilmRequest, iFilmResponse } from "../interfaces/film.interfaces";
import { userResponseSchema } from "./createUser.schema";

const createFilmSchema: SchemaOf<iFilmRequest> = yup.object().shape({
  name: yup
    .string()
    .max(50, "Name cannot be longer than 50 characters")
    .required("Name is required"),
  gender: yup
    .string()
    .max(50, "Gender cannot be longer than 50 characters")
    .required("Gender is required"),
  durationInMinutes: yup.number().required("durationInMinutes is required"),
  launchYear: yup.number().required("Launch year is required"),
  synopsis: yup
    .string()
    .max(500, "Synopsis cannot be longer than 500 characters")
    .required("Synopsis is required"),
});

export { createFilmSchema };
