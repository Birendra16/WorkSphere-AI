import { env } from "@/config/env.js";
import mongoose from "mongoose";
import { logger } from "@/lib/logger.js";

export async function connectMongoDB() {
  try {
    await mongoose.connect(env.MONGODB_URI);

    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error({ err: error }, "MongoDB connection failed");

    process.exit(1);
  }
}

export async function disconnectMongoDB() {
  await mongoose.disconnect();

  logger.info("MongoDB disconnected");
}
