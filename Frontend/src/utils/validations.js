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

export const validateSkillData = (skill, prefix = "Skill") => {
  const newErrors = {};

  if (!skill.nombre?.trim()) {
    newErrors.nombre = `${prefix} name is required`;
  }

  if (!skill.categoria?.trim()) {
    newErrors.categoria = `${prefix} category is required`;
  }

  if (!skill.nivel?.trim()) {
    newErrors.nivel = `${prefix} level is required`;
  }

  if (!skill.descripcion?.trim()) {
    newErrors.descripcion = `${prefix} description is required`;
  }

  return newErrors;
};

export const validateProjectData = (project, prefix = "Project") => {
  const newErrors = {};

  if (!project.nombre?.trim()) {
    newErrors.nombre = `${prefix} name is required`;
  }

  if (!project.descripcion?.trim()) {
    newErrors.descripcion = `${prefix} description is required`;
  }

  if (!project.tecnologias?.trim()) {
    newErrors.tecnologias = `${prefix} technologies are required`;
  }

  if (project.repositorio && !isURL(project.repositorio)) {
    newErrors.repositorio = `${prefix} repository must be a valid URL`;
  }

  if (project.deploy && !isURL(project.deploy)) {
    newErrors.deploy = `${prefix} live demo must be a valid URL`;
  }

  return newErrors;
};

export const validateEducationData = (education, prefix = "Education entry") => {
  const newErrors = {};

  if (!education.institucion?.trim()) {
    newErrors.institucion = `${prefix} institution is required`;
  }

  if (!education.programa?.trim()) {
    newErrors.programa = `${prefix} program or course is required`;
  }

  if (!education.periodo?.trim()) {
    newErrors.periodo = `${prefix} period is required`;
  }

  if (education.evidencia && !isURL(education.evidencia)) {
    newErrors.evidencia = `${prefix} evidence link must be a valid URL`;
  }

  return newErrors;
};

export const validateLanguageData = (language, prefix = "Language") => {
  const newErrors = {};

  if (!language.idioma?.trim()) {
    newErrors.idioma = `${prefix} is required`;
  }

  if (!language.nivel?.trim()) {
    newErrors.nivel = `${prefix} level is required`;
  }

  if (!language.descripcion?.trim()) {
    newErrors.descripcion = `${prefix} description is required`;
  }

  return newErrors;
};

export const validateListItems = (list, validator, title) => {
  for (let i = 0; i < list.length; i++) {
    const itemErrors = validator(list[i], `${title} ${i + 1}`);

    if (Object.keys(itemErrors).length > 0) {
      return itemErrors;
    }
  }

  return {};
};

export const getFirstValidationMessage = (validationErrors) =>
  Object.values(validationErrors)[0] ||
  "Please complete all required fields.";