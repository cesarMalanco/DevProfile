import { API_BASE_URL } from "../utils/apiConfig.js";

const API_URL = `${API_BASE_URL}/skills`;

export const createSkill = async (skillData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(skillData)
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    return response.json();
};

export const getSkills = async (userId) => {
    const response = await fetch(`${API_URL}?id_usuario=${userId}`);
    if (!response.ok) {
        throw new Error("Error fetching skills");
    }
    return response.json();
};

export const updateSkill = async (id, skillData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillData)
    });
    if (!response.ok) throw new Error("Error updating skill");
    return response.json();
};

export const deleteSkill = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error deleting skill");
    return response.json();
};