import { Router } from "express";
import clubBookEntryController from "../controllers/clubs/clubBooksEntry.controller";
import ClubEntryController from "../controllers/clubs/clubEntry.controller";
import clubListByIdController from "../controllers/clubs/clubListById.controller.";

import clubsListController from "../controllers/clubs/clubsList.controller";
import ClubUserListController from "../controllers/clubs/clubUserList.controller";
import createClubController from "../controllers/clubs/createClub.controller";
import deleteClubController from "../controllers/clubs/deleteClub.controller";
import updateClubController from "../controllers/clubs/updateClub.controller";
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
clubRouter.patch("/:id", updateClubController);
clubRouter.post("/:id/entry", AuthMiddlewares, ClubEntryController);
clubRouter.post("/:id/book", AuthMiddlewares, clubBookEntryController);
clubRouter.get("/:id/users", AuthMiddlewares, ClubUserListController);

export default clubRouter;
