import { Document, Types } from "mongoose";

export enum WorkspaceRole {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member",
}

export interface IWorkspaceMember {
  user: Types.ObjectId | string;
  role: WorkspaceRole;
}

export interface IWorkspace extends Document {
  name: string;
  description?: string;
  members: IWorkspaceMember[];
  createdBy: Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}
