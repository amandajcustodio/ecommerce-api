import { Joi } from "celebrate";

export type User = {
  id: string,
  name: string,
  email: string,
  password: string
}

export const createUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const updateUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6)
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
});