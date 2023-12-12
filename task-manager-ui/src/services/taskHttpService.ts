import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {NewTask} from "../types/NewTask";
import {Task} from "../types/Task";


let taskHttpService: AxiosInstance | null = null;

const getTaskHttpService = (): AxiosInstance => {
    if (!taskHttpService) {
        taskHttpService = axios.create({
            baseURL: 'http://localhost:3000', // Replace with your task service URL
        });

        taskHttpService.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
    return taskHttpService;
};

const createTask = async (data: NewTask): Promise<AxiosResponse> => {
    try {
        const response = await getTaskHttpService().post('/tasks/', data);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

const fetchTasks = async (): Promise<AxiosResponse> => {
    try {
        const response = await getTaskHttpService().get('/tasks');
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

const updateTask = async (updatedTask: Task): Promise<AxiosResponse> => {
    try {
        const response = await getTaskHttpService().put(`/tasks/${updatedTask._id}`, updatedTask);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

const deleteTask = async (taskId: string): Promise<AxiosResponse> => {
    try {
        const response = await getTaskHttpService().delete(`/tasks/${taskId}`);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};


export { createTask, fetchTasks, updateTask, deleteTask };
