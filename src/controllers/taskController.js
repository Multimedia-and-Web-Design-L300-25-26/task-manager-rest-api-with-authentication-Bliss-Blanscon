// src/controllers/taskController.js
import Task from "../models/Task.js";

// Create task
export const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });

  const task = new Task({ title, description, owner: req.user._id });
  await task.save();
  res.status(201).json(task);
};

// Get user tasks
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id });
  res.json(tasks);
};

// Delete task
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};