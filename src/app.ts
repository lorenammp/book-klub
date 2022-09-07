import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/appError";
import categoryRoutes from "./routes/categoriesRoutes";
import clubRouter from "./routes/clubsRoutes";
import userRouter from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use("/users", userRouter)
app.use("/categories", categoryRoutes);
app.use("/clubs", clubRouter);


app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export default app;
