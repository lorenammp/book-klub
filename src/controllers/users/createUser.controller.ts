import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUserService({ name, email, password });

    return res.status(201).json(user);
  } catch (error: any) {
    handleError(error, res);
  }
};

export default createUserController;
