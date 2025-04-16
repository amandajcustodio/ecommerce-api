import express from "express";
import { usersRoute } from "./user.route";

export const routes = (app: express.Express) => {
  app.use(express.json()); // Diz que a API e o front utilizarão arquivos .json
  app.use(
    usersRoute
  )
}