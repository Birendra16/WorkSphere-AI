import { AppError } from "@/shared/errors/AppError.js";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt.js";
import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateRefreshToken,
} from "../user/user.repository.js";

// ─── Register ─────────────────────────────────────────────────────────────────

export async function registerUser(data: { name: string; email: string; password: string }) {
  const { name, email, password } = data;

  const existing = await findUserByEmail(email);

  if (existing) {
    throw new AppError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return user;
}

// ─── Login ────────────────────────────────────────────────────────────────────

export async function loginService(data: { email: string; password: string }) {
  const { email, password } = data;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError(401, "Invalid email or password");
  }

  const payload = { id: user._id, role: user.role };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await updateRefreshToken(String(user._id), hashedRefreshToken);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

// ─── Get Me ───────────────────────────────────────────────────────────────────

export async function getMeService(userId: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}
