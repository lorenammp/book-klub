import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/appError';

const admMiddlleware = async (req: Request, res: Response, next: NextFunction) => {
    
  const adm = req.body.isAdm
  
  if (adm === false) {
    throw new AppError(403,"Not authorization")
  } 
  next();


};

export default admMiddlleware;