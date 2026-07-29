import type { Express } from "express";
import healthRoute from "../modules/health/health.route.js";

export function registerRoutes(app: Express) {
  app.use("/api/v1/health", healthRoute);
}
