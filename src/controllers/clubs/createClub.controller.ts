import createClubService from "../../services/clubs/clubCreate.service";
import {AppError, handleError} from "../../errors/appError"
import { Request, Response } from "express";

const createClubController = (req: Request, res: Response) => {
    try {
        const {name, description} = req.body
        const admId = req.body.id

        const response = createClubService({name, description,admId})

        return res.status(201).json(response)
    } catch (error) {
        if(error instanceof AppError) {
            handleError(error, res)
        }
    }
}

export default createClubController