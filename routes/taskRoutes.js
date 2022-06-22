import Task from "../models/Task.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const taskRouter = Router();

taskRouter.post("/todo", authMiddleware, async (req, res) => {
  if (req.body.action) {
    // Task.create(req.body).then((data) => res.json(data));
    const action = req.body.action;
    const newTask = new Task({ action, owner: req.user.userId });
    await newTask.save();
    res.status(201).json({ newTask });
  } else {
    res.json({ error: "the input is empty" });
  }
});

taskRouter.get("/todo", authMiddleware, async (req, res) => {
  //   Task.find({}, "action").then((data) => res.json(data));
  const taskList = await Task.find({ owner: req.user.userId });
  res.json(taskList);
});

taskRouter.delete("/todo/:id", authMiddleware, async (req, res) => {
  Task.findOneAndDelete({ _id: req.params.id }).then((data) => res.json(data));
});
