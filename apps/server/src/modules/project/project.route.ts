import { authenticate } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.middleware.js";
import { Router } from "express";
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
  listProjectsSchema,
  updateProjectSchema,
} from "./validations/project.validation.js";
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  listProjectsController,
  updateProjectController,
} from "./project.controller.js";

// mergeParams: true  ← allows access to :workspaceId from the parent router
const router = Router({ mergeParams: true });

router.use(authenticate);

router.post("/", validate(createProjectSchema), createProjectController);
router.get("/", validate(listProjectsSchema), listProjectsController);
router.get("/:projectId", validate(getProjectSchema), getProjectController);
router.patch("/:projectId", validate(updateProjectSchema), updateProjectController);
router.delete("/:projectId", validate(deleteProjectSchema), deleteProjectController);

export default router;
