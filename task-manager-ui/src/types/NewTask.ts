import TaskStatus from "../enums/TaskStatus";

export type NewTask = {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
}