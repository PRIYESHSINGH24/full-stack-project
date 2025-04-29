import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useauthstore = create((set) => ({
    authuser: null, 
    token: null,
    issigningup: false,
    isloggingin: false,
    isupdatingprofile: false,
    ischeckingauth: true,

    setAuthUser: (user) => {
        console.log("Setting auth user:", user);
        set({ authuser: user });
    },
    setToken: (token) => {
        console.log("Setting token:", token);
        set({ token });
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    },
    clearAuth: () => {
        console.log("Clearing auth");
        set({ 
            authuser: null,
            token: null,
            ischeckingauth: false 
        });
        localStorage.removeItem('token');
    },

    checkauth: async() => {
        try {
            const token = localStorage.getItem('token');
            console.log("Checking auth with token:", token);
            if (token) {
                set({ token });
                const res = await axiosInstance.get("/auth/check");
                if (res.data && res.data.user) {
                    console.log("Auth check successful:", res.data.user);
                    set({ 
                        authuser: res.data.user,
                        token: res.data.token,
                        ischeckingauth: false 
                    });
                    localStorage.setItem('token', res.data.token);
                } else {
                    console.log("Auth check failed - no user data");
                    set({ 
                        authuser: null,
                        token: null,
                        ischeckingauth: false 
                    });
                    localStorage.removeItem('token');
                }
            } else {
                console.log("No token found");
                set({ 
                    authuser: null,
                    token: null,
                    ischeckingauth: false 
                });
            }
        } catch (error) {
            console.error("Error in checkauth:", error);
            set({ 
                authuser: null,
                token: null,
                ischeckingauth: false 
            });
            localStorage.removeItem('token');
        }
    },

    signup: async(data) => {
        set({ issigningup: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            if (res.data && res.data.user) {
                console.log("Signup successful:", res.data.user);
                set({
                    authuser: res.data.user,
                    token: res.data.token,
                    issigningup: false
                });
                localStorage.setItem('token', res.data.token);
                toast.success("Account created successfully");
                return res.data;
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Signup failed:", error);
            toast.error(error.response?.data?.message || "Signup failed");
            set({ issigningup: false });
            throw error;
        }
    },

    login: async(data) => {
        set({ isloggingin: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            console.log("Login response:", res.data);
            
            if (!res.data) {
                throw new Error("No response data received");
            }

            if (res.data.error) {
                throw new Error(res.data.error);
            }

            if (!res.data.user || !res.data.token) {
                throw new Error("Invalid response format - missing user or token");
            }

            console.log("Login successful:", res.data.user);
            set({
                authuser: res.data.user,
                token: res.data.token,
                isloggingin: false
            });
            localStorage.setItem('token', res.data.token);
            toast.success("Logged in successfully");
            return res.data;
        } catch (error) {
            console.error("Login failed:", error);
            const errorMessage = error.response?.data?.message || error.message || "Login failed";
            toast.error(errorMessage);
            set({ isloggingin: false });
            throw error;
        }
    },

    logout: () => {
        console.log("Logging out");
        set({ 
            authuser: null,
            token: null
        });
        localStorage.removeItem('token');
        toast.success("Logged out successfully");
    }
}));