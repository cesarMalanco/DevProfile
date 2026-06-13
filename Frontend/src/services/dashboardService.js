const API_URL = "http://localhost:3000/api/profile";

export const getProfileStats = async (userId) => {
  const response = await fetch(`${API_URL}/stats?id_usuario=${userId}`);
  if (!response.ok) {
    throw new Error("Error fetching dashboard stats");
  }
  return response.json();
};
