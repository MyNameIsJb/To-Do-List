import { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";

export const getAllTasks = async (req: Request, res: Response) => {
  const task = await Task.find();
  try {
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const taskToCreate = await Task.create(req.body);
  try {
    return res
      .status(201)
      .json({ taskToCreate, message: "Created task successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Couldn't create the task" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Invalid ID" });

  const singleTask = await Task.findById({ _id: id });

  try {
    return res.status(200).json(singleTask);
  } catch (error) {
    return res.status(500).json({ err: error, message: "Invalid ID" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { updator } = req.body;
  const singleTask = await Task.findById({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Invalid ID" });

  if (updator !== singleTask!.creator)
    return res.status(404).json({ message: "Invalid creator" });

  const taskToUpdate = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!taskToUpdate) {
    return res.status(404).json({ message: "Invalid ID" });
  } else {
    return res
      .status(202)
      .json({ taskToUpdate, message: "Successfully updated task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "Invalid ID" });

  await Task.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Couldn't delete the game" });
  }
};

export const statusUpdate = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const { updator } = req.body;
  const singleTask = await Task.findById({ _id: _id });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "Invalid ID" });

  if (updator !== singleTask!.creator)
    return res.status(404).json({ message: "Invalid creator" });

  const statusToUpdate = await Task.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!statusToUpdate) {
    return res.status(404).json({ message: "Invalid ID" });
  } else {
    return res
      .status(202)
      .json({ statusToUpdate, message: "Successfully updated status" });
  }
};
