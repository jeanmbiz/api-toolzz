import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLogin, IUserRequest, IUserResponse, IUserUpdateRequest } from "../interfaces/user.interfaces";


const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
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
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
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
