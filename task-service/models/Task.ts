import { Document, Schema, model } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    status: string;
    dueDate: Date;
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    dueDate: { type: Date, required: true }
});

export default model<ITask>('Task', TaskSchema);
