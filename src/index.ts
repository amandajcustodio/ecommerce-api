import express from "express";
import { routes } from "./routes/index"
import { initializeApp } from 'firebase-admin/app';
import { errorHandler } from "./middlewares/error-handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";

initializeApp();
const app = express();

routes(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(3000);