export const isEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isURL = (url) => {
  if (!url) return true;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};