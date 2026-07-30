import { startServer } from "./app/startup.js";
import { disconnectMongoDB } from "./infrastructure/database/index.js";
import { logger } from "@/lib/logger.js";

const server = await startServer();

async function gracefulShutdown(signal: string) {
  logger.info(`${signal} received. Shutting down...`);

  server.close(async () => {
    await disconnectMongoDB();
    process.exit(0);
  });
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
