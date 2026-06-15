import { API_BASE_URL } from "../utils/apiConfig.js";

const API_URL = `${API_BASE_URL}/languages`;

export const createLanguage = async (data) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return response.json();
};

export const updateLanguage = async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Error updating language");
    return response.json();
};

export const deleteLanguage = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error deleting language");
    return response.json();
};