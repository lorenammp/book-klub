import { Request, Response, NextFunction } from "express";

const OwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const idUser = req.body.id;

  if (id !== idUser) {
    return res.status(403).json({
      error: "Error",
      message: "Not a owner",
    });
  }
  next();
};

export default OwnerMiddleware;
