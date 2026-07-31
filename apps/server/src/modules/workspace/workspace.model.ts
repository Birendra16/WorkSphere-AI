import { model, Schema } from "mongoose";
import { IWorkspace, WorkspaceRole } from "./workspace.types.js";

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },

    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        role: {
          type: String,
          enum: Object.values(WorkspaceRole),
          default: WorkspaceRole.MEMBER,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  },
);

export const Workspace = model<IWorkspace>("Workspace", workspaceSchema);
