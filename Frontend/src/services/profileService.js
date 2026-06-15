import { API_BASE_URL } from "../utils/apiConfig.js";

const API_URL = `${API_BASE_URL}/profile`;

export const createProfile = async (formData) => {
    const response = await fetch(
        API_URL,
        {
            method: "POST",
            body: formData
        }
    );

    return await response.json();
};