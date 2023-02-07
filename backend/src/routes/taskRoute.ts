import { Router } from "express";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  statusUpdate,
  updateTask,
} from "../controllers/taskController";
import auth from "../middleware/auth";

const router: Router = Router();

router.get("/", auth, getAllTasks);
router.post("/addTask", auth, addTask);
router.get("/task/:id", auth, getTaskById);
router.put("/updateTask/:id", auth, updateTask);
router.delete("/deleteTask/:id", auth, deleteTask);
router.put("/updateStatus", auth, statusUpdate);

export default router;
