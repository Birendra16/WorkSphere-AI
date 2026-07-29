import { Request, Response } from "express";

export function healthController(req: Request, res: Response) {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date(),
  });
}
