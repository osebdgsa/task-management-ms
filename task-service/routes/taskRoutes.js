"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Task_1 = __importDefault(require("../models/Task"));
const router = express_1.default.Router();
// GET /tasks - Get all tasks
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "asdf" });
    }
}));
// POST /tasks - Create a new task
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new Task_1.default({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
    });
    try {
        const newTask = yield task.save();
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(400).json({ message: "asdf" });
    }
}));
// Other routes like PUT, DELETE, etc., can be added similarly
exports.default = router;
