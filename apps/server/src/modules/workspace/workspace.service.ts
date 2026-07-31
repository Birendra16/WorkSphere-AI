import { AppError } from "@/shared/errors/AppError.js";
import {
  addMemberToWorkspaceDB,
  createWorkspaceDB,
  deleteWorkspaceDB,
  findWorkspaceById,
  updateWorkspaceDB,
  findUserWorkspacesDB,
  removeMemberFromWorkspaceDB,
  updateMemberRoleDB,
} from "./workspace.repository.js";
import { WorkspaceRole } from "./workspace.types.js";
import { findUserByEmail } from "../user/user.repository.js";

export const createWorkspaceService = async (
  userId: string,
  data: { name: string; description?: string },
) => {
  const workspaceData = {
    ...data,
    createdBy: userId,
    members: [{ user: userId, role: WorkspaceRole.OWNER }],
  };

  return await createWorkspaceDB(workspaceData);
};

export const updateWorkspaceService = async (
  userId: string,
  workspaceId: string,
  data: { name?: string; description?: string },
) => {
  const workspace = await findWorkspaceById(workspaceId);

  if (!workspace) throw new AppError(404, "Workspace not found");

  const member = workspace.members.find((m) => m.user.toString() === userId);
  if (!member || (member.role !== WorkspaceRole.OWNER && member.role !== WorkspaceRole.ADMIN)) {
    throw new AppError(403, "You donot have permission to update this workspace");
  }

  return await updateWorkspaceDB(workspaceId, data);
};

export const deleteWorkspaceService = async (userId: string, workspaceId: string) => {
  const workspace = await findWorkspaceById(workspaceId);

  if (!workspace) throw new AppError(404, "Workspace not found");

  const member = workspace.members.find((m) => m.user.toString() === userId);
  if (!member || member.role !== WorkspaceRole.OWNER) {
    throw new AppError(403, "Only the owner can delete the workspace");
  }

  return await deleteWorkspaceDB(workspaceId);
};

export const inviteMemberService = async (
  adminId: string,
  workspaceId: string,
  email: string,
  role: WorkspaceRole,
) => {
  const workspace = await findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError(404, "Workspace not found");

  const adminMember = workspace.members.find((m) => m.user.toString() === adminId);
  if (
    !adminMember ||
    (adminMember.role !== WorkspaceRole.OWNER && adminMember.role !== WorkspaceRole.ADMIN)
  ) {
    throw new AppError(403, "You do not have permission to invite members");
  }

  const userToInvite = await findUserByEmail(email);
  if (!userToInvite) throw new AppError(404, "User with this email not found");

  const isAlreadyMember = workspace.members.find(
    (m) => m.user.toString() === userToInvite._id.toString(),
  );

  if (isAlreadyMember) throw new AppError(409, "User is already a member of this workspace");

  return await addMemberToWorkspaceDB(workspaceId, userToInvite._id.toString(), role);
};

export const getAllWorkspacesService = async (userId: string) => {
  return await findUserWorkspacesDB(userId);
};

export const getWorkspaceByIdService = async (userId: string, workspaceId: string) => {
  const workspace = await findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError(404, "Workspace not found");

  const isMember = workspace.members.some((m) => m.user.toString() === userId);
  if (!isMember) throw new AppError(403, "You do not have access to this workspace");

  return workspace;
};

export const removeMemberService = async (
  adminId: string,
  workspaceId: string,
  userIdToRemove: string,
) => {
  const workspace = await findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError(404, "Workspace not found");

  const adminMember = workspace.members.find((m) => m.user.toString() === adminId);
  if (
    !adminMember ||
    (adminMember.role !== WorkspaceRole.OWNER && adminMember.role !== WorkspaceRole.ADMIN)
  ) {
    throw new AppError(403, "You do not have permission to remove members");
  }

  const memberToRemove = workspace.members.find((m) => m.user.toString() === userIdToRemove);
  if (!memberToRemove) throw new AppError(404, "Member not found in workspace");

  if (memberToRemove.role === WorkspaceRole.OWNER) {
    throw new AppError(400, "Cannot remove the workspace owner");
  }

  return await removeMemberFromWorkspaceDB(workspaceId, userIdToRemove);
};

export const updateMemberRoleService = async (
  adminId: string,
  workspaceId: string,
  userIdToUpdate: string,
  newRole: WorkspaceRole,
) => {
  const workspace = await findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError(404, "Workspace not found");

  const adminMember = workspace.members.find((m) => m.user.toString() === adminId);
  if (
    !adminMember ||
    (adminMember.role !== WorkspaceRole.OWNER && adminMember.role !== WorkspaceRole.ADMIN)
  ) {
    throw new AppError(403, "You do not have permission to update member roles");
  }

  const memberToUpdate = workspace.members.find((m) => m.user.toString() === userIdToUpdate);
  if (!memberToUpdate) throw new AppError(404, "Member not found in workspace");

  if (memberToUpdate.role === WorkspaceRole.OWNER) {
    throw new AppError(400, "Cannot change the role of the workspace owner");
  }

  return await updateMemberRoleDB(workspaceId, userIdToUpdate, newRole);
};
