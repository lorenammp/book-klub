import { Router } from "express";

import createClubController from "../controllers/clubs/createClub.controller";
import AuthMiddlewares from "../middlewares/auth.middleware";

const clubRouter = Router();

clubRouter.post("", AuthMiddlewares, createClubController);

export default clubRouter;
