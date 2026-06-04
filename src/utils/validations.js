export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateURL = (url) => {
  if (!url) return true;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Para la imagen de perfil, se permite una URL vacía (sin imagen)
//  o una URL válida que termine con una extensión de imagen común
export const validateImageURL = (url) => {
  if (!url) return true;

  return /\.(jpg|jpeg|png|webp|gif)$/.test(url);
};

export const validateSkillLevel = (level) => {
  const validLevels = ["Básico", "Intermedio", "Avanzado"];
  return validLevels.includes(level);
};

export const validateLength = (
  text,
  min = 3,
  max = 100
) => {
  return text.length >= min && text.length <= max;
};