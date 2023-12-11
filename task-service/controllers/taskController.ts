import { Request, Response } from 'express';
import { ITask } from '../interfaces/taskInterface';
import * as taskService from '../services/taskService';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks: ITask[] = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }

        res.status(500).json({ message: "Something went wrong" });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const taskData: ITask = req.body;
    try {
        const newTask: ITask = await taskService.createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }

        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const taskId: string = req.params.id;
    const updateData: Partial<ITask> = req.body;
    try {
        const updatedTask: ITask | null = await taskService.updateTask(taskId, updateData);
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }

        res.status(500).json({ message: "Something went wrong" });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const taskId: string = req.params.id;
    try {
        const deletedTask: ITask | null = await taskService.deleteTask(taskId);
        if (deletedTask) {
            res.status(200).json(deletedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }

        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
    const taskId: string = req.params.id;
    try {
        const task: ITask | null = await taskService.getTask(taskId);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }

        res.status(500).json({ message: "Something went wrong" });
    }
};