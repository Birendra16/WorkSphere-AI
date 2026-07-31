import expressAsyncHandler from "express-async-handler";
import {
  createProjectService,
  deleteProjectService,
  getProjectService,
  listProjectsService,
  updateProjectService,
} from "./project.service.js";
import { successResponse } from "@/shared/response/success.js";
import { IProjectQuery } from "./project.types.js";

export const createProjectController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const project = await createProjectService(req.user!.id, workspaceId, req.body);
  res.status(201);
  successResponse(res, project, "Project created successfully");
});

export const listProjectsController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const query: IProjectQuery = {
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
    search: req.query.search as string | undefined,
    status: req.query.status as IProjectQuery["status"],
    priority: req.query.priority as IProjectQuery["priority"],
    sortedBy: req.query.sortBy as string | undefined,
    sortOrder: (req.query.sortOrder as "asc" | "desc") ?? "desc",
  };

  const result = await listProjectsService(req.user!.id, workspaceId, query);
  successResponse(res, result, "Projects fetched successfully");
});

export const getProjectController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const projectId = req.params.projectId as string;
  const project = await getProjectService(req.user!.id, workspaceId, projectId);
  successResponse(res, project, "Project fetched successfully");
});

export const updateProjectController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const projectId = req.params.projectId as string;
  const project = await updateProjectService(req.user!.id, workspaceId, projectId, req.body);
  successResponse(res, project, "Project updated successfully");
});

export const deleteProjectController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const projectId = req.params.projectId as string;
  await deleteProjectService(req.user!.id, workspaceId, projectId);
  successResponse(res, null, "Project deleted successfully");
});
