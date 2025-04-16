import express from "express";
import { UsersController } from "../controllers/user.controller";

export const usersRoute = express.Router();
usersRoute.use(express.json());

usersRoute.get("/users", UsersController.getAll);

usersRoute.get("/users/:id", UsersController.getOne);

usersRoute.post("/users", UsersController.create);

usersRoute.put("/users/:id", UsersController.update);

usersRoute.delete("/users/:id", UsersController.delete);
