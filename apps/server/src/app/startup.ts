import app from "./app.js";
import { env } from "@/config/env.js";
import { connectMongoDB } from "@/infrastructure/database/index.js";
import { logger } from "@/lib/logger.js";

export async function startServer() {
  await connectMongoDB();

  return app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
  });
}
