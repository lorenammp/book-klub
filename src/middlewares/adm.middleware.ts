import { Request, Response, NextFunction } from "express";

const admMiddlleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adm = req.body.isAdm;

  if (adm === false) {
    return res.status(401).send({
      message: "Permission denied",
    });
  }
  next();
};

export default admMiddlleware;
