import express from "express";
import { UsersController } from "../controllers/user.controller";
import asyncHandler from "express-async-handler";

export const usersRoute = express.Router();
usersRoute.use(express.json());

usersRoute.get("/users", asyncHandler(UsersController.getAll));

usersRoute.get("/users/:id", asyncHandler(UsersController.getById));

usersRoute.post("/users", asyncHandler(UsersController.create));

usersRoute.put("/users/:id", asyncHandler(UsersController.update));

usersRoute.delete("/users/:id", asyncHandler(UsersController.delete));
