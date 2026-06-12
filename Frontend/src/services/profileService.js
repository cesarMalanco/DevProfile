const API_URL = "http://localhost:3000/api/profile";

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