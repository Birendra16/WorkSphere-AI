import expressAsyncHandler from "express-async-handler";
import {
  createWorkspaceService,
  deleteWorkspaceService,
  inviteMemberService,
  updateWorkspaceService,
  getAllWorkspacesService,
  getWorkspaceByIdService,
  removeMemberService,
  updateMemberRoleService,
} from "./workspace.service.js";
import { successResponse } from "@/shared/response/success.js";

export const createWorkspaceController = expressAsyncHandler(async (req, res) => {
  const workspace = await createWorkspaceService(req.user!.id, req.body);
  res.status(201);
  successResponse(res, workspace, "Workspace created successfully");
});

export const updateWorkspaceController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const workspace = await updateWorkspaceService(req.user!.id, workspaceId, req.body);
  successResponse(res, workspace, "Workspace updated successfully");
});

export const deleteWorkspaceController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  await deleteWorkspaceService(req.user!.id, workspaceId);
  successResponse(res, null, "Workspace deleted successfully");
});

export const inviteMemberController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const { email, role } = req.body;
  const workspace = await inviteMemberService(req.user!.id, workspaceId, email, role);
  successResponse(res, workspace, "Member invited successfully");
});

export const getAllWorkspacesController = expressAsyncHandler(async (req, res) => {
  const workspaces = await getAllWorkspacesService(req.user!.id);
  successResponse(res, workspaces, "Workspaces fetched successfully");
});

export const getWorkspaceByIdController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const workspace = await getWorkspaceByIdService(req.user!.id, workspaceId);
  successResponse(res, workspace, "Workspace fetched successfully");
});

export const removeMemberController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const userIdToRemove = req.params.userId as string;
  const workspace = await removeMemberService(req.user!.id, workspaceId, userIdToRemove);
  successResponse(res, workspace, "Member removed successfully");
});

export const updateMemberRoleController = expressAsyncHandler(async (req, res) => {
  const workspaceId = req.params.workspaceId as string;
  const userIdToUpdate = req.params.userId as string;
  const { role } = req.body;
  const workspace = await updateMemberRoleService(req.user!.id, workspaceId, userIdToUpdate, role);
  successResponse(res, workspace, "Member role updated successfully");
});
