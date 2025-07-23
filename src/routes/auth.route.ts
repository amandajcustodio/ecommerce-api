import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AuthController } from "../controllers/auth.controller";
import { celebrate, Segments } from "celebrate";
import { loginSchema } from "../models/user.model";

export const authRoute = Router();

authRoute.post("/auth/login", celebrate({ [Segments.BODY]: loginSchema }), asyncHandler(AuthController.login));