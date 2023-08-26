import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin, IUserRequest, IUserResponse, IUserUpdateRequest } from "../interfaces/user.interfaces";


const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().max(50, 'Name cannot be longer than 50 characters').required("Name is required"),
  email: yup.string().max(50, 'Email cannot be longer than 50 characters').email("Must be a valid email").required("Email is required"),
  password: yup.string().max(100, 'Password cannot be longer than 120 characters')
  .matches(/[A-Z]/, "Must contain at least 1 capital letter")
      .matches(/[a-z]/, "Must contain at least 1 lowercase letter")
      .matches(/(\d)/, "Must contain at least 1 number")
      .matches(/(\W)|_/, "Must contain at least 1 special character")
      .matches(/.{8,}/, "Must contain at least 8 characters")
      .required("Password is required"),
});

const userResponseSchema: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  isActive: yup.boolean().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

const userUpdateSchema: SchemaOf<IUserUpdateRequest> = yup.object().shape({
  name: yup.string().max(50, 'Name cannot be longer than 50 characters').notRequired(),
  email: yup.string().max(50, 'Email cannot be longer than 50 characters').email("Must be a valid email").notRequired(),
  password: yup.string().max(100, 'Password cannot be longer than 120 characters')
  .matches(/[A-Z]/, "Must contain at least 1 capital letter")
      .matches(/[a-z]/, "Must contain at least 1 lowercase letter")
      .matches(/(\d)/, "Must contain at least 1 number")
      .matches(/(\W)|_/, "Must contain at least 1 special character")
      .matches(/.{8,}/, "Must contain at least 8 characters")
      .notRequired(),
});

const userLoginSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export {
  createUserSchema,
  userResponseSchema,
  userUpdateSchema,
  userLoginSchema,
};
