import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());

// Import the route
import taskRoute from "./routes/taskRoute";
import authRoute from "./routes/authRoute";

// Declare the routes path
app.use("/api/tasks", taskRoute);
app.use("/api/auth", authRoute);

export { app };
