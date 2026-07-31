import z from "zod";
import { WorkspaceRole } from "../workspace.types.js";

export const createWorkspaceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),

  description: z.string().max(500).optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(3).max(100).optional(),

  description: z.string().max(500).optional(),
});

export const inviteMemberSchema = z.object({
  email: z.string().email("Invalid email format"),
  role: z
    .enum([WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER])
    .optional()
    .default(WorkspaceRole.MEMBER),
});

export const deleteWorkspaceSchema = z.any();

export const updateMemberRoleSchema = z.object({
  role: z.enum([WorkspaceRole.OWNER, WorkspaceRole.ADMIN, WorkspaceRole.MEMBER]),
});

export const getWorkspaceSchema = z.any();
