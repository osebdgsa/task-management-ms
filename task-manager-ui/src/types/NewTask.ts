import TaskStatus from "../enums/TaskStatus";

export type NewTask = {
    title: string;
    assignee: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
}