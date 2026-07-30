import type { Express } from "express";
import healthRoute from "../modules/health/health.route.js";
import authRoute from "../modules/auth/auth.route.js";

export function registerRoutes(app: Express) {
  app.use("/api/v1/health", healthRoute);
  app.use("/api/v1/auth", authRoute);
}
