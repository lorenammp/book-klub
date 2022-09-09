import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import clubsListMeetingsService from "../../services/clubs/clubsListMeetings.service";

const clubsListMeetingsController = async (req: Request, res: Response) => {
    try {
        const clubId = req.params.id;
        const meetinngs = clubsListMeetingsService(clubId);

        return res.status(200).json(meetinngs);
    }  catch (error: any) {
        handleError(error, res);
      }
}

export default clubsListMeetingsController