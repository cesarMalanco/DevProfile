import { API_BASE_URL } from "../utils/apiConfig.js";

const API_URL = `${API_BASE_URL}/auth`;

export const loginUser = async (credentials) => {

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }
    );

    return await response.json();
};

export const registerUser = async (userData) => {

    const response = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }
    );

    return await response.json();
};