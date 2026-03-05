// src/routes/taskRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTask, getTasks, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

// Apply authentication middleware to all task routes
router.use(authMiddleware);

// POST /api/tasks → create a new task
router.post("/", createTask);

// GET /api/tasks → get all tasks for the authenticated user
router.get("/", getTasks);

// DELETE /api/tasks/:id → delete a task by ID
router.delete("/:id", deleteTask);

export default router;