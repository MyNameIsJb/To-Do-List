import { model, Schema } from "mongoose";

export interface Task {
  taskName: string;
  status: string;
  category: string;
  description: string;
  endDate: Date;
  createdAt: Date;
  creator: string;
}

const TaskSchema = new Schema<Task>({
  taskName: { type: String, required: true },
  status: { type: String, default: "pending" },
  category: { type: String, required: true },
  description: { type: String, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: new Date() },
  creator: { type: String, required: true },
});

export default model<Task>("Task", TaskSchema);
