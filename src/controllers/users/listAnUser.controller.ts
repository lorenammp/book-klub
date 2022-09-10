import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListAnUsersService from "../../services/users/listAnUser.service";

const ListAnUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const User = await ListAnUsersService(id);

    return res.status(200).json(User);
  } catch (error: any) {
    handleError(error, res);
  }
};

export default ListAnUserController;
