import express from "express";
import { UsersController } from "../controllers/user.controller";
import asyncHandler from "express-async-handler";
import { celebrate, Joi, Segments } from "celebrate";

export const usersRoute = express.Router();
usersRoute.use(express.json());

usersRoute.get("/users", asyncHandler(UsersController.getAll));

usersRoute.get("/users/:id", asyncHandler(UsersController.getById));

usersRoute.post("/users", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required()
  })
}), asyncHandler(UsersController.create));

usersRoute.put("/users/:id", asyncHandler(UsersController.update));

usersRoute.delete("/users/:id", asyncHandler(UsersController.delete));
