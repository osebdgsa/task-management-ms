import express from 'express';
import { Router } from 'express';
import {createTask, deleteTask, getAllTasks, getTask, updateTask} from "../controllers/taskController";
import {authenticateUser} from "../middlewares/authenticate";

const router: Router = express.Router();

router.use(authenticateUser);

// GET /tasks - Get all tasks
router.get('/', getAllTasks);

// POST /tasks - Create a new task
router.post('/', createTask);

// PUT /tasks/:id - Update a task by ID
router.put('/:id', updateTask);

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', deleteTask);

// GET /tasks/:id - Get a task by ID
router.get('/:id', getTask);


export default router;
