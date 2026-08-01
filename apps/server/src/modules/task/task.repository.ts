import { Types } from "mongoose";
import { Task } from "./task.model.js";
import { ITask, ITaskQuery } from "./task.types.js";

export const createTaskDB = async (data: Partial<ITask>) => {
  return await Task.create(data);
};

export const findTaskByIdDB = async (id: string) => {
  return await Task.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("assignee", "name email avatar")
    .populate("createdBy", "name email");
};

export const updateTaskDB = async (id: string, data: Partial<ITask>) => {
  return await Task.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    data,
    {
      returnDocument: "after",
    },
  );
};

export const softDeleteTaskDB = async (id: string) => {
  return await Task.findOneAndUpdate(
    {
      _id: id,
    },
    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    {
      returnDocument: "after",
    },
  );
};

export const findTasksDB = async (projectId: string, query: ITaskQuery) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    priority,
    assignee,
    label,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const filter: Record<string, unknown> = {
    project: projectId,
    isDeleted: false,
  };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignee) filter.assignee = assignee;
  if (label) filter.labels = { $in: [label] };

  const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .sort(sort as Record<string, 1 | -1>)
      .skip(skip)
      .limit(limit)
      .populate("assignee", "name email avatar")
      .populate("createdBy", "name email"),
    Task.countDocuments(filter),
  ]);

  return {
    tasks,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const findUserTasksDB = async (userId: string, query: ITaskQuery) => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    priority,
    sortBy = "dueDate",
    sortOrder = "asc",
  } = query;

  const filter: Record<string, unknown> = {
    assignee: userId,
    isDeleted: false,
  };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .sort(sort as Record<string, 1 | -1>)
      .skip(skip)
      .limit(limit)
      .populate("project", "name")
      .populate("createdBy", "name email"),
    Task.countDocuments(filter),
  ]);

  return {
    tasks,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const findOverdueTasksDB = async (userId: string, query: ITaskQuery) => {
  const { page = 1, limit = 10, sortBy = "dueDate", sortOrder = "asc" } = query;

  const filter: Record<string, unknown> = {
    assignee: userId,
    isDeleted: false,
    dueDate: { $lt: new Date() },
    status: { $ne: "done" },
  };

  const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .sort(sort as Record<string, 1 | -1>)
      .skip(skip)
      .limit(limit)
      .populate("project", "name")
      .populate("createdBy", "name email"),
    Task.countDocuments(filter),
  ]);

  return {
    tasks,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getTaskStatsDB = async (userId: string) => {
  const stats = await Task.aggregate([
    {
      $match: {
        assignee: new Types.ObjectId(userId),
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const total = stats.reduce((acc, curr) => acc + curr.count, 0);
  const byStatus = stats.reduce(
    (acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    total,
    byStatus,
  };
};
