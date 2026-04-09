// Simple admin authentication
// In production, use proper authentication with backend

const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123", // Change this to a secure password
};

export const validateAdminLogin = (username: string, password: string): boolean => {
    return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
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
