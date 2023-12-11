"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authenticate_1 = require("../middlewares/authenticate");
const router = express_1.default.Router();
router.use(authenticate_1.authenticateUser);
// GET /tasks - Get all tasks
router.get('/', taskController_1.getAllTasks);
// POST /tasks - Create a new task
router.post('/', taskController_1.createTask);
// PUT /tasks/:id - Update a task by ID
router.put('/:id', taskController_1.updateTask);
// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', taskController_1.deleteTask);
// GET /tasks/:id - Get a task by ID
router.get('/:id', taskController_1.getTask);
exports.default = router;
