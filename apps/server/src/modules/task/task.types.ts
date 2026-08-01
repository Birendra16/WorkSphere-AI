import { Document, Types } from "mongoose";

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;

  project: Types.ObjectId | string;
  assignee?: Types.ObjectId | string;
  createdBy: Types.ObjectId | string;

  dueDate?: Date;
  labels: string[];
  isDeleted: boolean;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: string;
  label?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
