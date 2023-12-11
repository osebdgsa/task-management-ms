import { Request, Response } from 'express';
import { ITask } from '../interfaces/taskInterface';
import Task from '../models/Task';

// GET /tasks - Get all tasks
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks: ITask[] = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// POST /tasks - Create a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
    const task: ITask = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
    });

    try {
        const newTask: ITask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Bad Request" });
    }
};

// PUT /tasks/:id - Update a task by ID
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const taskId: string = req.params.id;
    const updateData: Partial<ITask> = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
    };

    try {
        const updatedTask: ITask | null = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Bad Request" });
    }
};

// DELETE /tasks/:id - Delete a task by ID
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const taskId: string = req.params.id;

    try {
        const deletedTask: ITask | null = await Task.findByIdAndDelete(taskId);
        if (deletedTask) {
            res.status(200).json(deletedTask);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
