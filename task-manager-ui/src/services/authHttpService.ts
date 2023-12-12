import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface RegisterData {
    username: string;
    password: string;
}

interface LoginData {
    username: string;
    password: string;
}

let authHttpService: AxiosInstance | null = null;

const getAuthHttpService = (): AxiosInstance => {
    if (!authHttpService) {
        authHttpService = axios.create({
            baseURL: 'http://localhost:3001/api', // Replace with your auth service URL
        });

        authHttpService.interceptors.request.use(
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
    return authHttpService;
};

const register = async (data: RegisterData): Promise<AxiosResponse> => {
    try {
        const response = await getAuthHttpService().post('/auth/register', data);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

const login = async (data: LoginData): Promise<AxiosResponse> => {
    try {
        const response = await getAuthHttpService().post('/auth/login', data);
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export { register, login };
