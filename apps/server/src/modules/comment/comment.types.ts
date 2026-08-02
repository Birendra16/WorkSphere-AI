import { Document, Types } from "mongoose";

export interface IComment extends Document {
  task: Types.ObjectId | string;
  author: Types.ObjectId | string;
  content: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
