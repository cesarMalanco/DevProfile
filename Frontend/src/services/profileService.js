import { API_BASE_URL } from "../utils/apiConfig.js";

const API_URL = `${API_BASE_URL}/profile`;

export const createProfile = async (profileData) => {
    const response = await fetch(
        API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profileData)
        }
    );

    return await response.json();
};