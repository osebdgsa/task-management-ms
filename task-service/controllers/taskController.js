"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const taskService = __importStar(require("../services/taskService"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskService.getAllTasks();
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskData = req.body;
    try {
        const newTask = yield taskService.createTask(taskData);
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const updateData = req.body;
    try {
        const updatedTask = yield taskService.updateTask(taskId, updateData);
        if (updatedTask) {
            res.status(200).json(updatedTask);
        }
        else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const deletedTask = yield taskService.deleteTask(taskId);
        if (deletedTask) {
            res.status(200).json(deletedTask);
        }
        else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.deleteTask = deleteTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const task = yield taskService.getTask(taskId);
        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getTask = getTask;
