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

        authHttpService.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const newAccessToken = await refreshAccessToken(); // Implement this function
                        if (newAccessToken) {
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axios(originalRequest);
                        } else {
                            // Handle token refresh failure, logout user or redirect to login page
                            // For example: authService.logout();
                            // Or: window.location.href = '/login';
                        }
                    } catch (refreshError) {
                        // Handle refresh error, logout user or redirect to login page
                    }
                }
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

const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/refresh-token', { refreshToken });
        const newAccessToken = response.data.token;
        localStorage.setItem('token', newAccessToken);
        return newAccessToken;
    } catch (error) {
        throw new Error('Failed to refresh access token');
    }
}

export { register, login };
