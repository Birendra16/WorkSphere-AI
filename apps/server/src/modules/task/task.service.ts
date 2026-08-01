import { AppError } from "@/shared/errors/AppError.js";
import { findProjectByIdDB } from "../project/project.repository.js";
import { findWorkspaceById } from "../workspace/workspace.repository.js";
import { ITask, ITaskQuery, TaskStatus } from "./task.types.js";
import {
  createTaskDB,
  findTaskByIdDB,
  softDeleteTaskDB,
  updateTaskDB,
  findTasksDB,
  findUserTasksDB,
  findOverdueTasksDB,
  getTaskStatsDB,
} from "./task.repository.js";

const assertWorkspaceMember = async (workspaceId: string, userId: string) => {
  const workspace = await findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError(404, "Workspace not found");

  const isMember = workspace.members.some((m) => m.user.toString() === userId);
  if (!isMember) throw new AppError(403, "You do not have access to this workspace");

  return workspace;
};

export const createTaskService = async (
  userId: string,
  projectId: string,
  data: Partial<ITask>,
) => {
  const project = await findProjectByIdDB(projectId);
  if (!project) throw new AppError(404, "Project not found");

  await assertWorkspaceMember(project.workspace.toString(), userId);

  return await createTaskDB({
    ...data,
    project: projectId,
    createdBy: userId,
  });
};

export const getTaskService = async (userId: string, id: string) => {
  const task = await findTaskByIdDB(id);
  if (!task) throw new AppError(404, "Task not found");

  const project = await findProjectByIdDB(task.project.toString());
  if (project) await assertWorkspaceMember(project.workspace.toString(), userId);

  return task;
};

export const updateTaskService = async (userId: string, id: string, data: Partial<ITask>) => {
  const task = await findTaskByIdDB(id);
  if (!task) throw new AppError(404, "Task not found");

  const project = await findProjectByIdDB(task.project.toString());
  if (project && project.owner.toString() !== userId && task.createdBy.toString() !== userId) {
    throw new AppError(403, "Only project owner or creator can update task details");
  }

  return await updateTaskDB(id, data);
};

export const deleteTaskService = async (userId: string, id: string) => {
  const task = await findTaskByIdDB(id);
  if (!task) throw new AppError(404, "Task not found");

  const project = await findProjectByIdDB(task.project.toString());
  if (project && project.owner.toString() !== userId && task.createdBy.toString() !== userId) {
    throw new AppError(403, "Only project owner or creator can delete task");
  }

  return await softDeleteTaskDB(id);
};

export const getTasksService = async (userId: string, projectId: string, query: ITaskQuery) => {
  const project = await findProjectByIdDB(projectId);
  if (!project) throw new AppError(404, "Project not found");

  await assertWorkspaceMember(project.workspace.toString(), userId);

  return await findTasksDB(projectId, query);
};

export const updateTaskStatusService = async (
  userId: string,
  taskId: string,
  status: TaskStatus,
) => {
  const task = await findTaskByIdDB(taskId);
  if (!task) throw new AppError(404, "Task not found");

  const project = await findProjectByIdDB(task.project.toString());
  if (project) await assertWorkspaceMember(project.workspace.toString(), userId);

  return await updateTaskDB(taskId, { status });
};

export const assignTaskService = async (
  userId: string,
  taskId: string,
  assignee: string | undefined,
) => {
  const task = await findTaskByIdDB(taskId);
  if (!task) throw new AppError(404, "Task not found");

  const project = await findProjectByIdDB(task.project.toString());
  if (project) await assertWorkspaceMember(project.workspace.toString(), userId);

  return await updateTaskDB(taskId, { assignee });
};

export const getUserTasksService = async (userId: string, query: ITaskQuery) => {
  return await findUserTasksDB(userId, query);
};

export const getOverdueTasksService = async (userId: string, query: ITaskQuery) => {
  return await findOverdueTasksDB(userId, query);
};

export const getTaskStatsService = async (userId: string) => {
  return await getTaskStatsDB(userId);
};
