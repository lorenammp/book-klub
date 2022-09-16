import { Request, Response } from "express";
import { handleError } from "../../errors/appError";
import ClubCreateThreadService from "../../services/clubs/clubeCreateThread.service";

const ClubCreateThreadController = async (req: Request, res: Response) => {
  try {
    const clubId = req.params.id;
    const authorId = req.body.id;
    const { title, text } = req.body;

    const newThread = await ClubCreateThreadService({
      clubId,
      authorId,
      title,
      text,
    });

    return res.status(201).send(newThread);
  } catch (error: any) {
    handleError(error, res);
  }
};

export default ClubCreateThreadController;
