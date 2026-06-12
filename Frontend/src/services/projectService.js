const API_URL = "http://localhost:3000/api/projects";

export const createProject = async (data) => {
    const response = await fetch(API_URL, {
        method: "POST",
        body: data // FormData
    });

    return response.json();
};