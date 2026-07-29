import { Response } from "express";

export function successResponse<T>(res: Response, data: T, message = "Success") {
  return res.json({
    success: true,
    message,
    data,
  });
}
