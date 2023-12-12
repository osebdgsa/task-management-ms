import TaskStatus from "../enums/TaskStatus";

export type Task = {
    _id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
}