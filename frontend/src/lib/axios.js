import axios from 'axios'
import { useauthstore } from '../store/useauthstore'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = useauthstore.getState().token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Try to refresh the token
                const res = await axiosInstance.post('/auth/refresh');
                if (res.data.token) {
                    useauthstore.getState().setToken(res.data.token);
                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, clear auth state
                useauthstore.getState().clearAuth();
            }
        }
        
        // If it's a 401 error and we've already tried to refresh, clear auth state
        if (error.response?.status === 401) {
            useauthstore.getState().clearAuth();
        }
        
        return Promise.reject(error);
    }
);