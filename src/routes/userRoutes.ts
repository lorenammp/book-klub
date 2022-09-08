import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import ListAnUserController from "../controllers/users/ListAnUser.controller";
import ListUsersController from "../controllers/users/ListUsers.controller";
import UpdateAnUserController from "../controllers/users/UpdateAnUser.controller";
import admMiddlleware from "../middlewares/adm.middleware";
import AuthMiddlewares from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", AuthMiddlewares, admMiddlleware, ListUsersController);
userRouter.get("/:id", AuthMiddlewares, ListAnUserController);
userRouter.patch("/:id", AuthMiddlewares, UpdateAnUserController);
userRouter.delete(
  "/:id",
  AuthMiddlewares,
  admMiddlleware,
  deleteUserController
);

export default userRouter;
