import { verifyAccessToken } from "@/lib/jwt.js";
import { AppError } from "@/shared/errors/AppError.js";
import { NextFunction, Request, Response } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new AppError(401, "Access token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token) as {
      id: string;
      role: string;
    };

    req.user = {
      id: payload.id,
      role: payload.role,
    };

    next();
  } catch {
    throw new AppError(401, "Invalid or expired access token");
  }
}
