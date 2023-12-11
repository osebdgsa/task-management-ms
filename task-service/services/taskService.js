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
exports.getTask = exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        return tasks;
    }
    catch (error) {
        throw new Error('Internal Server Error');
    }
});
exports.getAllTasks = getAllTasks;
const createTask = (taskData) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new Task_1.default(taskData);
    try {
        const newTask = yield task.save();
        return newTask;
    }
    catch (error) {
        throw new Error('Bad Request');
    }
});
exports.createTask = createTask;
const updateTask = (taskId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield Task_1.default.findByIdAndUpdate(taskId, updateData, { new: true });
        return updatedTask;
    }
    catch (error) {
        throw new Error('Bad Request');
    }
});
exports.updateTask = updateTask;
const deleteTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield Task_1.default.findByIdAndDelete(taskId);
        return deletedTask;
    }
    catch (error) {
        throw new Error('Internal Server Error');
    }
});
exports.deleteTask = deleteTask;
const getTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.default.findById(taskId);
        return task;
    }
    catch (error) {
        throw new Error('Internal Server Error');
    }
});
exports.getTask = getTask;
