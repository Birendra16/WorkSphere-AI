import expressAsyncHandler from "express-async-handler";
import {
  createTaskService,
  deleteTaskService,
  getTaskService,
  updateTaskService,
  getTasksService,
  updateTaskStatusService,
  assignTaskService,
  getUserTasksService,
  getOverdueTasksService,
  getTaskStatsService,
} from "./task.service.js";
import { listTasksSchema } from "./validations/task.validation.js";
import { successResponse } from "@/shared/response/success.js";

export const createTaskController = expressAsyncHandler(async (req, res) => {
  const projectId = req.params.projectId as string;

  const task = await createTaskService(req.user!.id, projectId, req.body);

  successResponse(res, task, "Task created successfully");
});

export const getTaskController = expressAsyncHandler(async (req, res) => {
  const task = await getTaskService(req.user!.id, req.params.id as string);

  successResponse(res, task, "Task fetched successfully");
});

export const updateTaskController = expressAsyncHandler(async (req, res) => {
  const task = await updateTaskService(req.user!.id, req.params.id as string, req.body);

  successResponse(res, task, "Task updated successfully");
});

export const deleteTaskController = expressAsyncHandler(async (req, res) => {
  await deleteTaskService(req.user!.id, req.params.id as string);

  successResponse(res, null, "Task deleted successfully");
});

export const getTasksController = expressAsyncHandler(async (req, res) => {
  const projectId = req.params.projectId as string;
  const query = listTasksSchema.parse(req.query);
  const tasks = await getTasksService(req.user!.id, projectId, query);

  successResponse(res, tasks, "Tasks fetched successfully");
});

export const updateTaskStatusController = expressAsyncHandler(async (req, res) => {
  const task = await updateTaskStatusService(
    req.user!.id,
    req.params.id as string,
    req.body.status,
  );

  successResponse(res, task, "Task status updated successfully");
});

export const assignTaskController = expressAsyncHandler(async (req, res) => {
  const task = await assignTaskService(req.user!.id, req.params.id as string, req.body.assignee);

  successResponse(res, task, "Task assigned successfully");
});

export const getUserTasksController = expressAsyncHandler(async (req, res) => {
  const query = listTasksSchema.parse(req.query);
  const tasks = await getUserTasksService(req.user!.id, query);

  successResponse(res, tasks, "User tasks fetched successfully");
});

export const getOverdueTasksController = expressAsyncHandler(async (req, res) => {
  const query = listTasksSchema.parse(req.query);
  const tasks = await getOverdueTasksService(req.user!.id, query);

  successResponse(res, tasks, "Overdue tasks fetched successfully");
});

export const getTaskStatsController = expressAsyncHandler(async (req, res) => {
  const stats = await getTaskStatsService(req.user!.id);

  successResponse(res, stats, "Task stats fetched successfully");
});
