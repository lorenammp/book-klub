import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import ClubListThreadsService from "../../services/clubs/clubListThreads.service";

const ClubListThreadsController = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.id;

    const clubThreads = await ClubListThreadsService(clubId);

    return res.status(200).send(clubThreads);
  } catch (error: any) {
    handleError(error, res);
  }
};

export default ClubListThreadsController;
