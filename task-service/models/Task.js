"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    dueDate: { type: Date, required: true }
});
exports.default = (0, mongoose_1.model)('Task', TaskSchema);
