import { Response } from "express";

export class AppError extends Error {
  statusCode;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (error: AppError, res: Response) => {
  const { statusCode, message } = error;

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
