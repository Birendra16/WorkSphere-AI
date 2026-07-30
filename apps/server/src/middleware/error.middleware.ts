import { NextFunction, Request, Response } from "express";
import { logger } from "@/lib/logger.js";
import { AppError } from "@/shared/errors/AppError.js";

export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  logger.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
