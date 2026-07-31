import { authenticate } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.middleware.js";
import { Router } from "express";
import {
  createWorkspaceSchema,
  deleteWorkspaceSchema,
  inviteMemberSchema,
  updateWorkspaceSchema,
  getWorkspaceSchema,
  updateMemberRoleSchema,
} from "./validations/workspace.validation.js";
import {
  createWorkspaceController,
  deleteWorkspaceController,
  inviteMemberController,
  updateWorkspaceController,
  getAllWorkspacesController,
  getWorkspaceByIdController,
  removeMemberController,
  updateMemberRoleController,
} from "./workspace.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", validate(createWorkspaceSchema), createWorkspaceController);
router.get("/", validate(getWorkspaceSchema), getAllWorkspacesController);
router.get("/:workspaceId", validate(getWorkspaceSchema), getWorkspaceByIdController);
router.patch("/:workspaceId", validate(updateWorkspaceSchema), updateWorkspaceController);
router.delete("/:workspaceId", validate(deleteWorkspaceSchema), deleteWorkspaceController);
router.post("/:workspaceId/invite", validate(inviteMemberSchema), inviteMemberController);
router.delete(
  "/:workspaceId/members/:userId",
  validate(getWorkspaceSchema),
  removeMemberController,
);
router.patch(
  "/:workspaceId/members/:userId",
  validate(updateMemberRoleSchema),
  updateMemberRoleController,
);

export default router;
