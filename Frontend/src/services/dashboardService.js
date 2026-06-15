import { API_BASE_URL } from "../utils/apiConfig.js";

const API_URL = `${API_BASE_URL}/profile`;

export const getProfileStats = async (userId) => {
  const response = await fetch(`${API_URL}/stats?id_usuario=${userId}`);
  if (!response.ok) {
    throw new Error("Error fetching dashboard stats");
  }
  return response.json();
};
