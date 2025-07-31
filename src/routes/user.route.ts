import { Router } from "express";
import { UsersController } from "../controllers/user.controller";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { createUserSchema, updateUserSchema } from "../models/user.model";
import { idSchema } from "../models/base.model";

export const usersRoute = Router();

usersRoute.get("/users", asyncHandler(UsersController.getAll));

usersRoute.get("/users/:id", celebrate({ [Segments.PARAMS]: idSchema }), asyncHandler(UsersController.getById));

usersRoute.post("/users", celebrate({ [Segments.BODY]: createUserSchema }), asyncHandler(UsersController.create));

usersRoute.put("/users/:id", celebrate({ [Segments.PARAMS]: idSchema, [Segments.BODY]: updateUserSchema }), asyncHandler(UsersController.update));

usersRoute.delete("/users/:id", celebrate({ [Segments.PARAMS]: idSchema }), asyncHandler(UsersController.delete));
