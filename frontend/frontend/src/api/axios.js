import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(
    (config) => {

        // These endpoints do NOT require authentication
        const publicRoutes = [
        "/accounts/login/",
        "/accounts/register/",
        "/accounts/verify-otp/",
        "/accounts/forgot-password/",
        "/accounts/verify-reset-otp/",
        "/accounts/reset-password/",
        "/accounts/token/refresh/",
];

        if (publicRoutes.includes(config.url)) {
            return config;
        }

        // Attach JWT token to protected endpoints
        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;