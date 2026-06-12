const API_URL = "http://localhost:3000/api/skills";

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