import { Project } from "./project.model.js";
import { IProject, IProjectQuery, ProjectFilter } from "./project.types.js";

export const createProjectDB = async (data: Partial<IProject>) => {
  const project = new Project(data);
  return await project.save();
};

export const findProjectByIdDB = async (id: string) => {
  return await Project.findOne({ _id: id, isDeleted: false }).populate(
    "owner",
    "name email avatar",
  );
};

export const findProjectByIdForAuthDB = async (id: string) => {
  return await Project.findOne({ _id: id, isDeleted: false });
};

export const findProjectsByWorkspaceDB = async (workspaceId: string, query: IProjectQuery) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    priority,
    sortedBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const filter: ProjectFilter = { workspace: workspaceId, isDeleted: false };

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const ALLOWED_SORT = ["name", "createdAt", "updatedAt", "dueDate", "priority", "status"];
  const sortField = ALLOWED_SORT.includes(sortedBy) ? sortedBy : "createdAt";
  const sortDir = sortOrder === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .populate("owner", "name email avatar")
      .sort({ [sortField]: sortDir })
      .skip(skip)
      .limit(limit),
    Project.countDocuments(filter),
  ]);

  return {
    projects,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

export const updateProjectDB = async (id: string, data: Partial<IProject>) => {
  return await Project.findOneAndUpdate({ _id: id, isDeleted: false }, data, {
    returnDocument: "after",
  }).populate("owner", "name email avatar");
};

export const softDeleteProjectDB = async (id: string) => {
  return await Project.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { returnDocument: "after" },
  );
};
