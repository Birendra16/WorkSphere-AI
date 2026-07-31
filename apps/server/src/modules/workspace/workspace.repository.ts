import { Workspace } from "./workspace.model.js";
import { IWorkspace } from "./workspace.types.js";

export const createWorkspaceDB = async (data: Partial<IWorkspace>) => {
  const workspace = new Workspace(data);
  return await workspace.save();
};

export const findWorkspaceById = async (id: string) => {
  return await Workspace.findById(id);
};

export const updateWorkspaceDB = async (id: string, data: Partial<IWorkspace>) => {
  return await Workspace.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

export const deleteWorkspaceDB = async (id: string) => {
  return await Workspace.findByIdAndDelete(id);
};

export const addMemberToWorkspaceDB = async (workspaceId: string, userId: string, role: string) => {
  return await Workspace.findByIdAndUpdate(
    workspaceId,
    { $push: { members: { user: userId, role } } },
    { returnDocument: "after" },
  ).populate("members.user", "name email");
};

export const findUserWorkspacesDB = async (userId: string) => {
  return await Workspace.find({ "members.user": userId }).populate(
    "members.user",
    "name email avatar",
  );
};

export const removeMemberFromWorkspaceDB = async (workspaceId: string, userId: string) => {
  return await Workspace.findByIdAndUpdate(
    workspaceId,
    { $pull: { members: { user: userId } } },
    { returnDocument: "after" },
  ).populate("members.user", "name email");
};

export const updateMemberRoleDB = async (workspaceId: string, userId: string, role: string) => {
  return await Workspace.findOneAndUpdate(
    { _id: workspaceId, "members.user": userId },
    { $set: { "members.$.role": role } },
    { returnDocument: "after" },
  ).populate("members.user", "name email");
};
