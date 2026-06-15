import { API_BASE_URL } from "../utils/apiConfig.js";

const API_URL = `${API_BASE_URL}/cvs`;

export const createCv = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();
};

export const getUserCvs = async (userId) => {
  const response = await fetch(`${API_URL}?userId=${userId}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();
};

export const updateCv = async (cvId, data) => {
  const response = await fetch(`${API_URL}/${cvId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();
};

export const deleteCv = async (cvId) => {
  const response = await fetch(`${API_URL}/${cvId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();
};

export const getCvById = async (cvId) => {
  const response = await fetch(`${API_URL}/${cvId}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.json();
};
