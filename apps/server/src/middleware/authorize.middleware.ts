import { AppError } from "@/shared/errors/AppError.js";
import { NextFunction, Request, Response } from "express";

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(401, "Not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(403, "You do not have permission to perform this action");
    }

    next();
  };
}
