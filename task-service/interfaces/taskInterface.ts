import { Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    assignee: string;
    // Other properties if needed
}
