import app from "./app.js";
import { env } from "@/config/env.js";
import { connectMongoDB } from "@/infrastructure/database/index.js";

export async function startServer() {
  await connectMongoDB();

  return app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}
