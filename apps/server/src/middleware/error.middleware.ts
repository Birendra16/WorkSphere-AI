import { NextFunction, Request, Response } from "express";
import { logger } from "@/lib/logger.js";

export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
