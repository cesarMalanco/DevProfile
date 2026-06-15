export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://devprofile-ohk6.onrender.com/api";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://devprofile-ohk6.onrender.com";
export const UPLOADS_URL = (fileName) => `${BACKEND_URL}/uploads/${fileName}`;
