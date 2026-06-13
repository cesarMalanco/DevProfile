const API_URL = "http://localhost:3000/api/projects";

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