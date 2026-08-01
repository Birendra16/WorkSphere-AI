import { model, Schema } from "mongoose";
import { ITask, TaskPriority, TaskStatus } from "./task.types.js";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxLength: 1000,
    },

    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },

    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    labels: {
      type: [String],
      default: [],
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

taskSchema.index({ project: 1, isDeleted: 1 });

export const Task = model<ITask>("Task", taskSchema);
