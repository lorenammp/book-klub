import { Router } from "express";
import loginUserController from "../controllers/users/loginUser.controller";

const sessionRouter = Router();

sessionRouter.post("", loginUserController);

export default sessionRouter;
