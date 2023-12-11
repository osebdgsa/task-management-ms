import express from 'express';
import { Request, Response, Router } from 'express';
import { ITask } from '../interfaces/taskInterface';
import Task from '../models/Task';

const router: Router = express.Router();

// GET /tasks - Get all tasks
router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks: ITask[] = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "asdf" });
    }
});

// POST /tasks - Create a new task
router.post('/', async (req: Request, res: Response) => {
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
        res.status(400).json({ message: "asdf" });
    }
});

// Other routes like PUT, DELETE, etc., can be added similarly

export default router;
