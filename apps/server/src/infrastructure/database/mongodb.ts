import { env } from "@/config/env.js";
import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    await mongoose.connect(env.MONGODB_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);

    process.exit(1);
  }
}

export async function disconnectMongoDB() {
  await mongoose.disconnect();

  console.log("MongoDB disconnected");
}
