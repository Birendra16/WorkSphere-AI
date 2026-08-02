import { AppError } from "@/shared/errors/AppError.js";
import { findTaskByIdDB } from "../task/task.repository.js";
import { findProjectByIdDB } from "../project/project.repository.js";
import { findWorkspaceById } from "../workspace/workspace.repository.js";
import {
  createCommentDB,
  deleteCommentDB,
  findCommentByIdDB,
  findCommentsByTaskDB,
  updateCommentDB,
} from "./comment.repository.js";
import { ICommentQuery } from "./comment.types.js";

const assertTaskAndWorkspaceAccess = async (taskId: string, userId: string) => {
  const task = await findTaskByIdDB(taskId);
  if (!task || task.isDeleted) {
    throw new AppError(404, "Task not found");
  }

  const project = await findProjectByIdDB(task.project.toString());
  if (!project) {
    throw new AppError(404, "Project not found");
  }

  const workspace = await findWorkspaceById(project.workspace.toString());
  if (!workspace) {
    throw new AppError(404, "Workspace not found");
  }

  const isMember = workspace.members.some((m) => m.user.toString() === userId);
  if (!isMember) {
    throw new AppError(403, "You do not have access to this workspace");
  }

  return { task, project, workspace };
};

export const createCommentService = async (userId: string, taskId: string, content: string) => {
  await assertTaskAndWorkspaceAccess(taskId, userId);

  return await createCommentDB({
    task: taskId,
    author: userId,
    content,
  });
};

export const getCommentsService = async (userId: string, taskId: string, query: ICommentQuery) => {
  await assertTaskAndWorkspaceAccess(taskId, userId);

  return await findCommentsByTaskDB(taskId, query);
};

export const updateCommentService = async (userId: string, commentId: string, content: string) => {
  const comment = await findCommentByIdDB(commentId);
  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  const authorId =
    typeof comment.author === "object" && comment.author !== null && "_id" in comment.author
      ? (comment.author as { _id: { toString(): string } })._id.toString()
      : comment.author.toString();

  if (authorId !== userId) {
    throw new AppError(403, "Only the comment author can update this comment");
  }

  return await updateCommentDB(commentId, content);
};

export const deleteCommentService = async (userId: string, commentId: string) => {
  const comment = await findCommentByIdDB(commentId);
  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  const authorId =
    typeof comment.author === "object" && comment.author !== null && "_id" in comment.author
      ? (comment.author as { _id: { toString(): string } })._id.toString()
      : comment.author.toString();

  if (authorId !== userId) {
    throw new AppError(403, "Only the comment author can delete this comment");
  }

  await deleteCommentDB(commentId);
};
