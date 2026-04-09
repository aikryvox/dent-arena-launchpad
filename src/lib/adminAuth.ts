// Simple admin authentication
// In production, use proper authentication with backend

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

export const validateAdminLogin = (username: string, password: string): boolean => {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};

export const getAdminToken = (): string | null => {
    return localStorage.getItem("adminToken");
};

export const setAdminToken = (token: string): void => {
    localStorage.setItem("adminToken", token);
};

export const removeAdminToken = (): void => {
    localStorage.removeItem("adminToken");
};

export const isAdminLoggedIn = (): boolean => {
    return !!getAdminToken();
};
