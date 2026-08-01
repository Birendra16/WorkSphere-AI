import { authenticate } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.middleware.js";
import { Router } from "express";
import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
  assignTaskSchema,
} from "./validations/task.validation.js";
import {
  createTaskController,
  deleteTaskController,
  getTaskController,
  updateTaskController,
  getTasksController,
  updateTaskStatusController,
  assignTaskController,
  getUserTasksController,
  getOverdueTasksController,
  getTaskStatsController,
} from "./task.controller.js";

const projectTaskRoutes = Router({ mergeParams: true });

projectTaskRoutes.use(authenticate);

projectTaskRoutes.post("/", validate(createTaskSchema), createTaskController);
projectTaskRoutes.get("/", getTasksController);
projectTaskRoutes.get("/:id", getTaskController);
projectTaskRoutes.patch("/:id", validate(updateTaskSchema), updateTaskController);
projectTaskRoutes.delete("/:id", deleteTaskController);
projectTaskRoutes.patch(
  "/:id/status",
  validate(updateTaskStatusSchema),
  updateTaskStatusController,
);
projectTaskRoutes.patch("/:id/assign", validate(assignTaskSchema), assignTaskController);

const userTaskRoutes = Router({ mergeParams: true });

userTaskRoutes.use(authenticate);

userTaskRoutes.get("/my", getUserTasksController);
userTaskRoutes.get("/overdue", getOverdueTasksController);
userTaskRoutes.get("/stats", getTaskStatsController);

export { projectTaskRoutes, userTaskRoutes };
