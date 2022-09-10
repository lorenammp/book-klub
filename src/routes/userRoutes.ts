import { Router } from "express";
import loginUserController from "../controllers/users/loginUser.controller";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import ListAnUserController from "../controllers/users/listAnUser.controller";
import ListUsersController from "../controllers/users/listUsers.controller";
import UpdateAnUserController from "../controllers/users/UpdateAnUser.controller";
import admMiddlleware from "../middlewares/adm.middleware";
import AuthMiddlewares from "../middlewares/auth.middleware";
import OwnerMiddleware from "../middlewares/ownerUser.middleware";
import listUserClubsController from "../controllers/users/listUserClubs.controller";
import booksUserController from "../controllers/users/userBooks.controller";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.post("/login", loginUserController);
userRouter.get("", ListUsersController);
userRouter.get("/:id/clubs", AuthMiddlewares, listUserClubsController);
userRouter.get("/:id", AuthMiddlewares, ListAnUserController);
userRouter.patch(
  "/:id",
  AuthMiddlewares,
  OwnerMiddleware,
  UpdateAnUserController
);
userRouter.delete(
  "/:id",
  AuthMiddlewares,
  admMiddlleware,
  deleteUserController
);
userRouter.get("/:id/book", booksUserController);

export default userRouter;
