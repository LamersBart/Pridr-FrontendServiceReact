import axios from "axios";
import KeycloakService from "./Keycloak";

const createApiInstance = (baseURL) => {
    const api = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    api.interceptors.request.use(
        async (config) => {
            const token = KeycloakService.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                console.error("Server Error:", error.response.data);
            } else if (error.request) {
                console.error("Network Error:", error.request);
            } else {
                console.error("Request Error:", error.message);
            }
            return Promise.reject(error);
        }
    );

    return api;
};

export const userApi = createApiInstance(import.meta.env.VITE_USER_SERVICE_URL);
export const eventApi = createApiInstance(import.meta.env.VITE_EVENT_SERVICE_URL);
export const chatApi = createApiInstance(import.meta.env.VITE_CHAT_SERVICE_URL);
