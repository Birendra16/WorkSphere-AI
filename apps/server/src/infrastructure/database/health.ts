import mongoose from "mongoose";

export function databaseStatus() {
  return mongoose.connection.readyState === 1 ? "connected" : "disconnected";
}
