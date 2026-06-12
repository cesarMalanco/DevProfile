const API_URL = "http://localhost:3000/api/languages";

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