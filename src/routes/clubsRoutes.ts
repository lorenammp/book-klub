import {Router} from "express"

import createClubController from "../controllers/clubs/createClub.controller"
import authMiddlewares from "../middlewares/auth.middleware"

const clubRouter = Router()

clubRouter.post ("", authMiddlewares, createClubController)


export default clubRouter