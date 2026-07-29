import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import { registerRoutes } from "./register-routes.js";
import { notFoundMiddleware } from "@/middleware/not-found.middleware.js";
import { errorMiddleware } from "@/middleware/error.middleware.js";

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// Request Logger
app.use(morgan("dev"));

// Routes
registerRoutes(app);

// 404 Handler
app.use(notFoundMiddleware);

// Error handler
app.use(errorMiddleware);

export default app;
