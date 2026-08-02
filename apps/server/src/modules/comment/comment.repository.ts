import { Comment } from "./comment.model.js";
import { ICommentQuery } from "./comment.types.js";

export const createCommentDB = async (data: { task: string; author: string; content: string }) => {
  const comment = await Comment.create(data);
  return await comment.populate("author", "name email avatar");
};

export const findCommentsByTaskDB = async (taskId: string, query: ICommentQuery) => {
  const { page = 1, limit = 20, sortBy = "createdAt", sortOrder = "desc" } = query;

  const filter = { task: taskId };
  const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
  const skip = (page - 1) * limit;

  const [comments, total] = await Promise.all([
    Comment.find(filter)
      .sort(sort as Record<string, 1 | -1>)
      .skip(skip)
      .limit(limit)
      .populate("author", "name email avatar"),
    Comment.countDocuments(filter),
  ]);

  return {
    comments,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const findCommentByIdDB = async (id: string) => {
  return await Comment.findById(id).populate("author", "name email avatar");
};

export const updateCommentDB = async (id: string, content: string) => {
  return await Comment.findByIdAndUpdate(
    id,
    { content },
    { new: true, runValidators: true },
  ).populate("author", "name email avatar");
};

export const deleteCommentDB = async (id: string) => {
  return await Comment.findByIdAndDelete(id);
};
