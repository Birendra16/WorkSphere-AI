import expressAsyncHandler from "express-async-handler";
import {
  createCommentService,
  deleteCommentService,
  getCommentsService,
  updateCommentService,
} from "./comment.service.js";
import { listCommentsQuerySchema } from "./validations/comment.validation.js";
import { successResponse } from "@/shared/response/success.js";

export const createCommentController = expressAsyncHandler(async (req, res) => {
  const taskId = req.params.taskId as string;
  const comment = await createCommentService(req.user!.id, taskId, req.body.content);

  res.status(201);
  successResponse(res, comment, "Comment created successfully");
});

export const getCommentsController = expressAsyncHandler(async (req, res) => {
  const taskId = req.params.taskId as string;
  const query = listCommentsQuerySchema.parse(req.query);

  const result = await getCommentsService(req.user!.id, taskId, query);

  successResponse(res, result, "Comments fetched successfully");
});

export const updateCommentController = expressAsyncHandler(async (req, res) => {
  const commentId = req.params.id as string;
  const comment = await updateCommentService(req.user!.id, commentId, req.body.content);

  successResponse(res, comment, "Comment updated successfully");
});

export const deleteCommentController = expressAsyncHandler(async (req, res) => {
  const commentId = req.params.id as string;
  await deleteCommentService(req.user!.id, commentId);

  successResponse(res, null, "Comment deleted successfully");
});
