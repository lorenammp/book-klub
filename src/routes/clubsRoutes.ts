import { Router } from "express";

import clubsListController from "../controllers/clubs/clubsList.controller";
import createClubController from "../controllers/clubs/createClub.controller";
import AuthMiddlewares from "../middlewares/auth.middleware";

const clubRouter = Router();

clubRouter.post("", AuthMiddlewares, createClubController);
clubRouter.get("", clubsListController)

export default clubRouter;
