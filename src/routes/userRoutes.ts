import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";

const userRouter = Router();

userRouter.post("", createUserController);

export default userRouter;
