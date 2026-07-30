import { successResponse } from "@/shared/response/success.js";
import expressAsyncHandler from "express-async-handler";
import { loginService, registerUser, getMeService } from "./auth.service.js";

// ─── Register ─────────────────────────────────────────────────────────────────

export const registerController = expressAsyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  successResponse(res, user, "User registered successfully");
});

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginController = expressAsyncHandler(async (req, res) => {
  const result = await loginService(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  successResponse(
    res,
    {
      accessToken: result.accessToken,
      user: result.user,
    },
    "Login successful",
  );
});

// ─── Get Me ───────────────────────────────────────────────────────────────────

export const getMeController = expressAsyncHandler(async (req, res) => {
  const user = await getMeService(req.user!.id);
  successResponse(res, user, "User fetched successfully");
});
