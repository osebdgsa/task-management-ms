import express from 'express';
import { Router } from 'express';
import {createTask, deleteTask, getAllTasks, updateTask} from "../controllers/taskController";

const router: Router = express.Router();

// GET /tasks - Get all tasks
router.get('/', getAllTasks);

// POST /tasks - Create a new task
router.post('/', createTask);

// PUT /tasks/:id - Update a task by ID
router.put('/:id', updateTask); // PUT /tasks/:id - Update a task by ID

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', deleteTask); // DELETE /tasks/:id - Delete a task by ID


export default router;
