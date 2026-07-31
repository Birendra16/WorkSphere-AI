import type { Express } from "express";
import healthRoute from "../modules/health/health.route.js";
import authRoute from "../modules/auth/auth.route.js";
import { workspaceRoutes } from "@/modules/workspace/index.js";
import { projectRoutes } from "@/modules/project/index.js";

export function registerRoutes(app: Express) {
  app.use("/api/v1/health", healthRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/workspaces", workspaceRoutes);
  app.use("/api/v1/workspaces/:workspaceId/projects", projectRoutes);
}
