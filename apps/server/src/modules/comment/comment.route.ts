import { authenticate } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.middleware.js";
import { Router } from "express";
import {
  createCommentController,
  deleteCommentController,
  getCommentsController,
  updateCommentController,
} from "./comment.controller.js";
import { createCommentSchema, updateCommentSchema } from "./validations/comment.validation.js";

const taskCommentRoutes = Router({ mergeParams: true });

taskCommentRoutes.use(authenticate);

taskCommentRoutes.post("/", validate(createCommentSchema), createCommentController);
taskCommentRoutes.get("/", getCommentsController);

const directCommentRoutes = Router({ mergeParams: true });

directCommentRoutes.use(authenticate);

directCommentRoutes.patch("/:id", validate(updateCommentSchema), updateCommentController);
directCommentRoutes.delete("/:id", deleteCommentController);

export { taskCommentRoutes, directCommentRoutes };
