import { AppError } from "@/shared/errors/AppError.js";
import { findWorkspaceById } from "../workspace/workspace.repository.js";
import {
  createProjectDB,
  findProjectByIdDB,
  findProjectsByWorkspaceDB,
  softDeleteProjectDB,
  updateProjectDB,
  findProjectByIdForAuthDB,
} from "./project.repository.js";
import { IProjectQuery, ProjectPriority, ProjectStatus } from "./project.types.js";

const assertWorkspaceMember = async (workspaceId: string, userId: string) => {
  const workspace = await findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError(404, "Workspace not found");

  const isMember = workspace.members.some((m) => m.user.toString() === userId);
  if (!isMember) throw new AppError(403, "You do not have access to this workspace");

  return workspace;
};

const assertProjectOwner = async (projectId: string, userId: string) => {
  const project = await findProjectByIdForAuthDB(projectId);
  if (!project) throw new AppError(404, "Project not found");

  if (project.owner.toString() !== userId) {
    throw new AppError(403, "Only the project owner can perform this action");
  }

  return project;
};

export const createProjectService = async (
  userId: string,
  workspaceId: string,
  data: {
    name: string;
    description?: string;
    priority?: ProjectPriority;
    startDate?: Date;
    dueDate?: Date;
  },
) => {
  await assertWorkspaceMember(workspaceId, userId);
  return await createProjectDB({ ...data, workspace: workspaceId, owner: userId });
};

export const listProjectsService = async (
  userId: string,
  workspaceId: string,
  query: IProjectQuery,
) => {
  await assertWorkspaceMember(workspaceId, userId);
  return await findProjectsByWorkspaceDB(workspaceId, query);
};

export const getProjectService = async (userId: string, workspaceId: string, projectId: string) => {
  await assertWorkspaceMember(workspaceId, userId);
  const project = await findProjectByIdDB(projectId);
  if (!project) throw new AppError(404, "Project not found");

  if (project.workspace.toString() !== workspaceId) {
    throw new AppError(403, "Project does not belong to this workspace");
  }

  return project;
};

export const updateProjectService = async (
  userId: string,
  workspaceId: string,
  projectId: string,
  data: {
    name?: string;
    description?: string;
    status?: ProjectStatus;
    priority?: ProjectPriority;
    startDate?: Date;
    dueDate?: Date;
  },
) => {
  await assertWorkspaceMember(workspaceId, userId);
  await assertProjectOwner(projectId, userId);
  return await updateProjectDB(projectId, data);
};

export const deleteProjectService = async (
  userId: string,
  workspaceId: string,
  projectId: string,
) => {
  await assertWorkspaceMember(workspaceId, userId);
  await assertProjectOwner(projectId, userId);
  return await softDeleteProjectDB(projectId);
};
