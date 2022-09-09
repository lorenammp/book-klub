import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import ListUsersService from "../../services/users/listUsers.service";

const ListUsersController = async (req: Request, res: Response) => {
  try {
    const Users = await ListUsersService();
    if (!Users) {
      return res.status(400).json({ message: "No user registered" });
    }
    return res.status(200).json(Users);
  }  catch (error: any) {
    handleError(error, res);
  }
};

export default ListUsersController;
