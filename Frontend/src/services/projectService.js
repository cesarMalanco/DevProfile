import { API_BASE_URL } from "../utils/apiConfig.js";

const API_URL = `${API_BASE_URL}/projects`;

export const createProject = async (data) => {
    const response = await fetch(API_URL, {
        method: "POST",
        body: data 
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Error creating project");
    }

    return response.json();
};

export const updateProject = async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        body: data
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Error updating project");
    }

    return response.json();
};

export const deleteProject = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error deleting project");
    return response.json();
};