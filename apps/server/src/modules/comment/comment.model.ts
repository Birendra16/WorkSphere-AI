import { model, Schema } from "mongoose";
import { IComment } from "./comment.types.js";

const commentSchema = new Schema<IComment>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
      index: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

commentSchema.index({ task: 1, createdAt: -1 });

export const Comment = model<IComment>("Comment", commentSchema);
