import { Router } from "express";
import loginUserController from "../controllers/session/loginUser.controller";

const sessionRouter = Router();

sessionRouter.post("", loginUserController);

export default sessionRouter;
