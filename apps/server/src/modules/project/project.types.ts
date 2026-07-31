import { Document, Types } from "mongoose";

export enum ProjectStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
}

export enum ProjectPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export interface IProject extends Document {
  name: string;
  description?: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  workspace: Types.ObjectId | string;
  owner: Types.ObjectId | string;
  startDate?: Date;
  dueDate?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProjectStatus;
  priority?: ProjectPriority;
  sortedBy?: string;
  sortOrder?: "asc" | "desc";
}

export type ProjectFilter = {
  workspace?: string;
  isDeleted?: boolean;
  status?: ProjectStatus;
  priority?: ProjectPriority;

  $or?: Array<{
    name?: {
      $regex: string;
      $options: string;
    };
    description?: {
      $regex: string;
      $options: string;
    };
  }>;
};
