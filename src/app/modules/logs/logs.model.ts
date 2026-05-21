import mongoose, { Schema, Document } from "mongoose";
import { TLogs } from "./logs.interface";

const LogsSchema = new Schema<TLogs & Document>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String },

  },
  {
    timestamps: true,
  }
);

const Logs = mongoose.model<TLogs & Document>("Logs", LogsSchema);
export default Logs;
