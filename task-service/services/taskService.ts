import { ITask } from '../interfaces/taskInterface';
import Task from '../models/Task';

export const getAllTasks = async (): Promise<ITask[]> => {
    try {
        const tasks: ITask[] = await Task.find();
        return tasks;
    } catch (error) {
        throw new Error('Internal Server Error');
    }
};

export const createTask = async (taskData: ITask): Promise<ITask> => {
    const task: ITask = new Task(taskData);
    try {
        const newTask: ITask = await task.save();
        return newTask;
    } catch (error) {
        throw new Error('Bad Request');
    }
};

export const updateTask = async (taskId: string, updateData: Partial<ITask>): Promise<ITask | null> => {
    try {
        const updatedTask: ITask | null = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
        return updatedTask;
    } catch (error) {
        throw new Error('Bad Request');
    }
};

export const deleteTask = async (taskId: string): Promise<ITask | null> => {
    try {
        const deletedTask: any = await Task.findByIdAndDelete(taskId);
        return deletedTask;
    } catch (error) {
        throw new Error('Internal Server Error');
    }
};

export const getTask = async (taskId: string): Promise<ITask | null> => {
    try {
        const task: ITask | null = await Task.findById(taskId);
        return task;
    } catch (error) {
        throw new Error('Internal Server Error');
    }
};