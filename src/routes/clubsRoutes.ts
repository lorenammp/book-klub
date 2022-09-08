import { Router } from "express";
import clubListByIdController from "../controllers/clubs/clubListById.controller.";

import clubsListController from "../controllers/clubs/clubsList.controller";
import createClubController from "../controllers/clubs/createClub.controller";
import deleteClubController from "../controllers/clubs/deleteClub.controller";
import admMiddlleware from "../middlewares/adm.middleware";
import AuthMiddlewares from "../middlewares/auth.middleware";

const clubRouter = Router();

clubRouter.post("", AuthMiddlewares, createClubController);
clubRouter.get("", clubsListController);
clubRouter.delete(
  "/:id",
  AuthMiddlewares,
  admMiddlleware,
  deleteClubController
);
clubRouter.get("/:id", clubListByIdController);

export default clubRouter;
