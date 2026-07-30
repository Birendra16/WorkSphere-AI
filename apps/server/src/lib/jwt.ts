import jwt from "jsonwebtoken";

import { authConfig } from "@/config/auth.config.js";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, authConfig.accessSecret, {
    expiresIn: authConfig.accessExpires,
  } as jwt.SignOptions);
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, authConfig.refreshSecret, {
    expiresIn: authConfig.refreshExpires,
  } as jwt.SignOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, authConfig.accessSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, authConfig.refreshSecret);
};
