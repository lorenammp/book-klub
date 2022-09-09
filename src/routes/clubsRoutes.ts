import { Router } from "express";
import ClubEntryController from "../controllers/clubs/clubEntry.controller";
import clubListByIdController from "../controllers/clubs/clubListById.controller.";

import clubsListController from "../controllers/clubs/clubsList.controller";
import createClubController from "../controllers/clubs/createClub.controller";
import deleteClubController from "../controllers/clubs/deleteClub.controller";
import updateClubController from "../controllers/clubs/updateClub.controller";
import admMiddlleware from "../middlewares/adm.middleware";
import AuthMiddlewares from "../middlewares/auth.middleware";
import clubsListMeetingsController from "../controllers/clubs/clubsListMeetings.controller";

const clubRouter = Router();

clubRouter.post("", AuthMiddlewares, createClubController);
clubRouter.get("", clubsListController);
clubRouter.delete(
  "/:id",
  AuthMiddlewares,
  admMiddlleware,
  deleteClubController
);
clubRouter.get("/:id/meetings", clubsListMeetingsController)
clubRouter.get("/:id", clubListByIdController);
clubRouter.patch("/:id", updateClubController);
clubRouter.post("/:id/entry", AuthMiddlewares, ClubEntryController);

export default clubRouter;
