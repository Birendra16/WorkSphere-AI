import { HydratedDocument, Types } from "mongoose";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  name: string;

  email: string;

  password: string;

  role: UserRole;

  refreshToken?: string | null;

  avatar?: string | null;

  createdAt: Date;

  updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;

export interface JwtPayload {
  id: Types.ObjectId;
  email: string;
  role: UserRole;
}
