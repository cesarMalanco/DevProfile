import "../styles/EditorStyles.css";
import PersonalForm from "../components/forms/PersonalForm";
import SkillForm from "../components/forms/SkillForm";
import ProjectForm from "../components/forms/ProjectForm";
import EducationForm from "../components/forms/EducationForm";
import LanguageForm from "../components/forms/LanguageForm";
import AccordionItem from "../components/Accordion";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createProfile } from "../services/profileService";
import { createCv, getCvById, updateCv } from "../services/cvService";
import { useContext } from "react";
import { CVContext } from "../context/CVContext";
import { createProject, updateProject, deleteProject } from "../services/projectService";
import { createEducation, updateEducation, deleteEducation } from "../services/educationService";
import { createLanguage, updateLanguage, deleteLanguage } from "../services/languajeService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isEmail, isURL } from "../utils/validations";


function Editor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addSkill, editSkill, removeSkill } = useContext(CVContext);
  const [formData, setFormData] = useState({
    nombre_completo: "",
    profesion: "",
    ciudad: "",
    correo: "",
    telefono: "",
    descripcion: "",
    github: "",
    linkedin: "",
    portafolio: ""
  });

  const [skillData, setSkillData] = useState({
    nombre: "",
    categoria: "",
    nivel: "",
    descripcion: ""
  });

  const [projectData, setProjectData] = useState({
    nombre: "",
    descripcion: "",
    tecnologias: "",
    repositorio: "",
    deploy: "",
    imagen: null
  });

  const [educationData, setEducationData] = useState({
    institucion: "",
    programa: "",
    periodo: "",
    descripcion: "",
    evidencia: ""
  });

  const [languageData, setLanguageData] = useState({
    idioma: "",
    nivel: "",
    descripcion: ""
  });

  const [skillsList, setSkillsList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);

  const [foto, setFoto] = useState(null);

  const [errors, setErrors] = useState({});
  const [skillErrors, setSkillErrors] = useState({});
  const [projectErrors, setProjectErrors] = useState({});
  const [educationErrors, setEducationErrors] = useState({});
  const [languageErrors, setLanguageErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingCvId, setEditingCvId] = useState(null);

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (e) {
    }
  }, []);

  const hasFormValues = (obj) =>
    Object.values(obj).some((value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (value instanceof File) return true;
      return Boolean(value);
    });

  const getFirstValidationMessage = (validationErrors) =>
    Object.values(validationErrors)[0] || "Please complete all required fields.";

  const validateSkillData = (skill, prefix = "Skill") => {
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

  const validateProjectData = (project, prefix = "Project") => {
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

  const validateEducationData = (education, prefix = "Education entry") => {
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

  const validateLanguageData = (language, prefix = "Language") => {
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

  const validateListItems = (list, validator, title) => {
    for (let i = 0; i < list.length; i += 1) {
      const itemErrors = validator(list[i], `${title} ${i + 1}`);
      if (Object.keys(itemErrors).length > 0) {
        return itemErrors;
      }
    }
    return {};
  };

  const handleAddSkill = async () => {
    if (!hasFormValues(skillData)) {
      await Swal.fire({
        icon: "warning",
        title: "Action not allowed",
        text: "Please complete and save the current skill before adding a new one."
      });
      return;
    }

    const validationErrors = validateSkillData(skillData);
    if (Object.keys(validationErrors).length > 0) {
      setSkillErrors(validationErrors);
      await Swal.fire({
        icon: "error",
        title: "Invalid skill",
        text: getFirstValidationMessage(validationErrors)
      });
      return;
    }

    setSkillErrors({});
    setSkillsList((prev) => [...prev, skillData]);
    setSkillData({ nombre: "", categoria: "", nivel: "", descripcion: "" });
  };

  const handleClearSkill = () => {
    setSkillData({ nombre: "", categoria: "", nivel: "", descripcion: "" });
    setSkillErrors({});
  };

  const handleUpdateSkill = (index, field, value) => {
    setSkillsList((prev) =>
      prev.map((skill, idx) =>
        idx === index ? { ...skill, [field]: value } : skill
      )
    );
  };

  const handleDeleteSkill = async (index) => {
    const skill = skillsList[index];
    try {
      if (skill && skill.id_habilidad) {
        await removeSkill(skill.id_habilidad);
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
    setSkillsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddProject = async () => {
    if (!hasFormValues(projectData)) {
      await Swal.fire({
        icon: "warning",
        title: "Action not allowed",
        text: "Please complete and save the current project before adding a new one."
      });
      return;
    }

    const validationErrors = validateProjectData(projectData);
    if (Object.keys(validationErrors).length > 0) {
      setProjectErrors(validationErrors);
      await Swal.fire({
        icon: "error",
        title: "Invalid project",
        text: getFirstValidationMessage(validationErrors)
      });
      return;
    }

    setProjectErrors({});
    setProjectsList((prev) => [...prev, projectData]);
    setProjectData({
      nombre: "",
      descripcion: "",
      tecnologias: "",
      repositorio: "",
      deploy: "",
      imagen: null
    });
  };

  const handleClearProject = () => {
    setProjectData({
      nombre: "",
      descripcion: "",
      tecnologias: "",
      repositorio: "",
      deploy: "",
      imagen: null
    });
    setProjectErrors({});
  };

  const handleUpdateProject = (index, field, value) => {
    setProjectsList((prev) =>
      prev.map((project, idx) =>
        idx === index ? { ...project, [field]: value } : project
      )
    );
  };

  const handleDeleteProject = async (index) => {
    const project = projectsList[index];
    try {
      if (project && project.id_proyecto) {
        await deleteProject(project.id_proyecto);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
    setProjectsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddEducation = async () => {
    if (!hasFormValues(educationData)) {
      await Swal.fire({
        icon: "warning",
        title: "Action not allowed",
        text: "Please complete and save the current education entry before adding a new one."
      });
      return;
    }

    const validationErrors = validateEducationData(educationData);
    if (Object.keys(validationErrors).length > 0) {
      setEducationErrors(validationErrors);
      await Swal.fire({
        icon: "error",
        title: "Invalid education entry",
        text: getFirstValidationMessage(validationErrors)
      });
      return;
    }

    setEducationErrors({});
    setEducationList((prev) => [...prev, educationData]);
    setEducationData({
      institucion: "",
      programa: "",
      periodo: "",
      descripcion: "",
      evidencia: ""
    });
  };

  const handleClearEducation = () => {
    setEducationData({
      institucion: "",
      programa: "",
      periodo: "",
      descripcion: "",
      evidencia: ""
    });
    setEducationErrors({});
  };

  const handleUpdateEducation = (index, field, value) => {
    setEducationList((prev) =>
      prev.map((education, idx) =>
        idx === index ? { ...education, [field]: value } : education
      )
    );
  };

  const handleDeleteEducation = async (index) => {
    const education = educationList[index];
    try {
      if (education && education.id_educacion) {
        await deleteEducation(education.id_educacion);
      }
    } catch (error) {
      console.error("Error deleting education:", error);
    }
    setEducationList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddLanguage = async () => {
    if (!hasFormValues(languageData)) {
      await Swal.fire({
        icon: "warning",
        title: "Action not allowed",
        text: "Please complete and save the current language before adding a new one."
      });
      return;
    }

    const validationErrors = validateLanguageData(languageData);
    if (Object.keys(validationErrors).length > 0) {
      setLanguageErrors(validationErrors);
      await Swal.fire({
        icon: "error",
        title: "Invalid language entry",
        text: getFirstValidationMessage(validationErrors)
      });
      return;
    }

    setLanguageErrors({});
    setLanguagesList((prev) => [...prev, languageData]);
    setLanguageData({ idioma: "", nivel: "", descripcion: "" });
  };

  const handleClearLanguage = () => {
    setLanguageData({ idioma: "", nivel: "", descripcion: "" });
    setLanguageErrors({});
  };

  const handleUpdateLanguage = (index, field, value) => {
    setLanguagesList((prev) =>
      prev.map((language, idx) =>
        idx === index ? { ...language, [field]: value } : language
      )
    );
  };

  const handleDeleteLanguage = async (index) => {
    const language = languagesList[index];
    try {
      if (language && language.id_idioma) {
        await deleteLanguage(language.id_idioma);
      }
    } catch (error) {
      console.error("Error deleting language:", error);
    }
    setLanguagesList((prev) => prev.filter((_, i) => i !== index));
  };

  const validatePersonalForm = () => {
    const newErrors = {};

    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = "Name is required";
    } else if (formData.nombre_completo.length < 3) {
      newErrors.nombre_completo = "Minimum 3 characters";
    }

    if (!formData.profesion.trim()) {
      newErrors.profesion = "Profession is required";
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "Email is required";
    } else if (!isEmail(formData.correo)) {
      newErrors.correo = "Invalid email address";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "Phone is required";
    } else if (!/^\d+$/.test(formData.telefono)) {
      newErrors.telefono = "Phone must contain only numbers";
    } else if (formData.telefono.length !== 10) {
      newErrors.telefono = "Phone must be 10 digits";
    }

    if (!formData.ciudad.trim()) {
      newErrors.ciudad = "Address is required";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "Description is required";
    } else if (formData.descripcion.length < 20) {
      newErrors.descripcion =
        "Description must have at least 20 characters";
    }

    if (formData.github && !isURL(formData.github)) {
      newErrors.github = "Invalid GitHub URL";
    }

    if (formData.linkedin && !isURL(formData.linkedin)) {
      newErrors.linkedin = "Invalid LinkedIn URL";
    }

    if (formData.portafolio && !isURL(formData.portafolio)) {
      newErrors.portafolio = "Invalid portfolio URL";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    try{
      const validationErrors = validatePersonalForm();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);

        await Swal.fire({
          icon: "error",
          title: "Invalid form",
          text: "Please fix the errors before continuing",
        });
        return;
      }

      const currentSkillErrors = hasFormValues(skillData) ? validateSkillData(skillData, "Current skill") : {};
      if (Object.keys(currentSkillErrors).length > 0) {
        await Swal.fire({
          icon: "error",
          title: "Invalid skill",
          text: getFirstValidationMessage(currentSkillErrors)
        });
        return;
      }

      const currentProjectErrors = hasFormValues(projectData) ? validateProjectData(projectData, "Current project") : {};
      if (Object.keys(currentProjectErrors).length > 0) {
        await Swal.fire({
          icon: "error",
          title: "Invalid project",
          text: getFirstValidationMessage(currentProjectErrors)
        });
        return;
      }

      const currentEducationErrors = hasFormValues(educationData) ? validateEducationData(educationData, "Current education entry") : {};
      if (Object.keys(currentEducationErrors).length > 0) {
        await Swal.fire({
          icon: "error",
          title: "Invalid education entry",
          text: getFirstValidationMessage(currentEducationErrors)
        });
        return;
      }

      const currentLanguageErrors = hasFormValues(languageData) ? validateLanguageData(languageData, "Current language") : {};
      if (Object.keys(currentLanguageErrors).length > 0) {
        await Swal.fire({
          icon: "error",
          title: "Invalid language entry",
          text: getFirstValidationMessage(currentLanguageErrors)
        });
        return;
      }

      const listSkillErrors = validateListItems(skillsList, validateSkillData, "Skill");
      if (Object.keys(listSkillErrors).length > 0) {
        await Swal.fire({
          icon: "error",
          title: "Invalid skill",
          text: getFirstValidationMessage(listSkillErrors)
        });
        return;
      }

      const listProjectErrors = validateListItems(projectsList, validateProjectData, "Project");
      if (Object.keys(listProjectErrors).length > 0) {
        await Swal.fire({
          icon: "error",
          title: "Invalid project",
          text: getFirstValidationMessage(listProjectErrors)
        });
        return;
      }

      const listEducationErrors = validateListItems(educationList, validateEducationData, "Education entry");
      if (Object.keys(listEducationErrors).length > 0) {
        await Swal.fire({
          icon: "error",
          title: "Invalid education entry",
          text: getFirstValidationMessage(listEducationErrors)
        });
        return;
      }

      const listLanguageErrors = validateListItems(languagesList, validateLanguageData, "Language");
      if (Object.keys(listLanguageErrors).length > 0) {
        await Swal.fire({
          icon: "error",
          title: "Invalid language entry",
          text: getFirstValidationMessage(listLanguageErrors)
        });
        return;
      }

      const data = new FormData();

      data.append("id_usuario", user.id_usuario);
      data.append("nombre_completo", formData.nombre_completo);
      data.append("profesion", formData.profesion);
      data.append("ciudad", formData.ciudad);
      data.append("correo", formData.correo);
      data.append("telefono", formData.telefono);
      data.append("descripcion", formData.descripcion);
      data.append("github", formData.github);
      data.append("linkedin", formData.linkedin);
      data.append("portafolio", formData.portafolio);

      if (foto) {
        data.append("foto_perfil", foto);
      }

      const profileResult = await createProfile(data);
      const id_perfil = profileResult.insertId;
      let id_cv = isEditing && editingCvId ? editingCvId : null;

      const newName = formData.nombre_completo
        ? `${formData.nombre_completo} CV`
        : `${user.nombre} CV`;

      if (isEditing && editingCvId) {
        await updateCv(editingCvId, { nombre_cv: newName });
      } else {
        const cvPayload = {
          id_usuario: user.id_usuario,
          id_plantilla: null,
          nombre_cv: newName
        };

        const cvResult = await createCv(cvPayload);
        id_cv = cvResult.insertId;
      }

      if (isEditing) {
        try {
          for (const skill of skillsList.filter((s) => s._saved)) {
            if (skill.id_habilidad) {
              await editSkill(skill.id_habilidad, {
                nombre: skill.nombre,
                categoria: skill.categoria,
                nivel: skill.nivel,
                descripcion: skill.descripcion
              });
            }
          }

          for (const project of projectsList.filter((p) => p._saved)) {
            if (project.id_proyecto) {
              const projectForm = new FormData();
              projectForm.append("nombre", project.nombre);
              projectForm.append("descripcion", project.descripcion);
              projectForm.append("tecnologias", project.tecnologias);
              projectForm.append("repositorio", project.repositorio);
              projectForm.append("deploy", project.deploy);
              if (project.imagen instanceof File) {
                projectForm.append("Foto_proyecto", project.imagen);
              } else if (project.imagen) {
                projectForm.append("imagen", project.imagen);
              }

              await updateProject(project.id_proyecto, projectForm);
            }
          }

          for (const education of educationList.filter((e) => e._saved)) {
            if (education.id_educacion) {
              await updateEducation(education.id_educacion, {
                institucion: education.institucion,
                programa: education.programa,
                periodo: education.periodo,
                descripcion: education.descripcion,
                evidencia: education.evidencia
              });
            }
          }

          for (const language of languagesList.filter((l) => l._saved)) {
            if (language.id_idioma) {
              await updateLanguage(language.id_idioma, {
                idioma: language.idioma,
                nivel: language.nivel,
                descripcion: language.descripcion
              });
            }
          }
        } catch (err) {
          console.error("Error updating saved items:", err);
        }
      }

      const skillsToSave = [
        ...skillsList.filter((skill) => !isEditing || !skill._saved),
        ...(hasFormValues(skillData) ? [skillData] : [])
      ].filter(hasFormValues);

      for (const skill of skillsToSave) {
        await addSkill({
          ...skill,
          id_usuario: user.id_usuario,
          id_perfil,
          id_cv
        });
      }

      const projectsToSave = [
        ...projectsList.filter((project) => !isEditing || !project._saved),
        ...(hasFormValues(projectData) ? [projectData] : [])
      ].filter(hasFormValues);

      for (const project of projectsToSave) {
        const projectForm = new FormData();
        projectForm.append("id_usuario", user.id_usuario);
        projectForm.append("id_perfil", id_perfil);
        projectForm.append("id_cv", id_cv);
        projectForm.append("nombre", project.nombre);
        projectForm.append("descripcion", project.descripcion);
        projectForm.append("tecnologias", project.tecnologias);
        projectForm.append("repositorio", project.repositorio);
        projectForm.append("deploy", project.deploy);

        if (project.imagen) {
          projectForm.append("Foto_proyecto", project.imagen);
        }

        await createProject(projectForm);
      }

      const educationToSave = [
        ...educationList.filter((education) => !isEditing || !education._saved),
        ...(hasFormValues(educationData) ? [educationData] : [])
      ].filter(hasFormValues);

      for (const education of educationToSave) {
        await createEducation({
          ...education,
          id_usuario: user.id_usuario,
          id_perfil,
          id_cv
        });
      }

      const languagesToSave = [
        ...languagesList.filter((language) => !isEditing || !language._saved),
        ...(hasFormValues(languageData) ? [languageData] : [])
      ].filter(hasFormValues);

      for (const language of languagesToSave) {
        await createLanguage({
          ...language,
          id_usuario: user.id_usuario,
          id_perfil,
          id_cv
        });
      }

      setSkillsList([]);
      setProjectsList([]);
      setEducationList([]);
      setLanguagesList([]);

      localStorage.removeItem("formData");
      localStorage.removeItem("skillData");
      localStorage.removeItem("projectData");
      localStorage.removeItem("educationData");
      localStorage.removeItem("languageData");

      await Swal.fire({
        icon: "success",
        title: "Profile saved",
        text: "Information saved successfully",
        confirmButtonText: "View CV"
      });

      navigate("/preview");
    }catch(error){
      console.error("Error saving:", error);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not save information"
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cvId = params.get("cvId");

    if (!cvId) {
      localStorage.removeItem("formData");
      localStorage.removeItem("skillData");
      localStorage.removeItem("projectData");
      localStorage.removeItem("educationData");
      localStorage.removeItem("languageData");

      setFormData({
        nombre_completo: "",
        profesion: "",
        ciudad: "",
        correo: "",
        telefono: "",
        descripcion: "",
        github: "",
        linkedin: "",
        portafolio: ""
      });

      setSkillData({ nombre: "", categoria: "", nivel: "", descripcion: "" });
      setProjectData({ nombre: "", descripcion: "", tecnologias: "", repositorio: "", deploy: "", imagen: null });
      setEducationData({ institucion: "", programa: "", periodo: "", descripcion: "", evidencia: "" });
      setLanguageData({ idioma: "", nivel: "", descripcion: "" });

      return;
    }

    const savedFormData = localStorage.getItem("formData");
    const savedSkillData = localStorage.getItem("skillData");
    const savedProjectData = localStorage.getItem("projectData");
    const savedEducationData = localStorage.getItem("educationData");
    const savedLanguageData = localStorage.getItem("languageData");

    if (savedFormData) setFormData(JSON.parse(savedFormData));
    if (savedSkillData) setSkillData(JSON.parse(savedSkillData));
    if (savedProjectData) setProjectData(JSON.parse(savedProjectData));
    if (savedEducationData) setEducationData(JSON.parse(savedEducationData));
    if (savedLanguageData) setLanguageData(JSON.parse(savedLanguageData));
  }, []);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cvId = params.get("cvId");

    if (!cvId) return;

    const loadCv = async () => {
      try {
        const data = await getCvById(cvId);
        if (!data) return;

        setIsEditing(true);
        setEditingCvId(cvId);

        if (data.profile) {
          setFormData({
            nombre_completo: data.profile.nombre_completo || "",
            profesion: data.profile.profesion || "",
            ciudad: data.profile.ciudad || "",
            correo: data.profile.correo || "",
            telefono: data.profile.telefono || "",
            descripcion: data.profile.descripcion || "",
            github: data.profile.github || "",
            linkedin: data.profile.linkedin || "",
            portafolio: data.profile.portafolio || ""
          });
          setFoto(data.profile.foto_perfil || null);
        }

        if (data.skills && data.skills.length > 0) {
          setSkillsList(data.skills.map((item) => ({ ...item, _saved: true })));
          setSkillData({ nombre: "", categoria: "", nivel: "", descripcion: "" });
        }

        if (data.projects && data.projects.length > 0) {
          setProjectsList(data.projects.map((item) => ({ ...item, _saved: true })));
          setProjectData({
            nombre: "",
            descripcion: "",
            tecnologias: "",
            repositorio: "",
            deploy: "",
            imagen: null
          });
        }

        if (data.education && data.education.length > 0) {
          setEducationList(data.education.map((item) => ({ ...item, _saved: true })));
          setEducationData({
            institucion: "",
            programa: "",
            periodo: "",
            descripcion: "",
            evidencia: ""
          });
        }

        if (data.languages && data.languages.length > 0) {
          setLanguagesList(data.languages.map((item) => ({ ...item, _saved: true })));
          setLanguageData({ idioma: "", nivel: "", descripcion: "" });
        }

      } catch (error) {
        console.error("Error loading CV:", error);
      }
    };

    loadCv();
  }, []);
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  useEffect(() => {
    localStorage.setItem("skillData", JSON.stringify(skillData));
  }, [skillData]);
  useEffect(() => {
    localStorage.setItem("educationData", JSON.stringify(educationData));
  }, [educationData]);
  useEffect(() => {
    localStorage.setItem("languageData", JSON.stringify(languageData));
  }, [languageData]);
  
  useEffect(() => {
    const projectToSave = {...projectData, imagen: null};

    localStorage.setItem(
      "projectData",
      JSON.stringify(projectToSave)
    );
  }, [projectData]);


  return (
    <section className="editor-section">
      <form className="form-card">
        <PersonalForm
          formData={formData}
          setFormData={setFormData}
          foto={foto}
          setFoto={setFoto}
          errors={errors}
        />
        <SkillForm
          skillData={skillData}
          setSkillData={setSkillData}
          skillsList={skillsList}
          onAdd={handleAddSkill}
          onClear={handleClearSkill}
          onUpdate={handleUpdateSkill}
          onDelete={handleDeleteSkill}
          errors={skillErrors}
        />
        <ProjectForm
          projectData={projectData}
          setProjectData={setProjectData}
          projectsList={projectsList}
          onAdd={handleAddProject}
          onClear={handleClearProject}
          onUpdate={handleUpdateProject}
          onDelete={handleDeleteProject}
          errors={projectErrors}
        />
        <EducationForm
          educationData={educationData}
          setEducationData={setEducationData}
          educationList={educationList}
          onAdd={handleAddEducation}
          onClear={handleClearEducation}
          onUpdate={handleUpdateEducation}
          onDelete={handleDeleteEducation}
          errors={educationErrors}
        />
        <LanguageForm
          languageData={languageData}
          setLanguageData={setLanguageData}
          languagesList={languagesList}
          onAdd={handleAddLanguage}
          onClear={handleClearLanguage}
          onUpdate={handleUpdateLanguage}
          onDelete={handleDeleteLanguage}
          errors={languageErrors}
        />
        <div className ="form-actions">
          <button type ="button" className="cta-btn-primary" onClick={handleSubmit}>
            <i className ="fa-solid fa-floppy-disk"></i>
            Save  
          </button> 
        </div>
      </form>
    </section>
  );
}

export default Editor;
