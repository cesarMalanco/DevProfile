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
import { useTheme } from "../context/ThemeContext";
import { showAlert } from "../utils/swalHelpers";
import {validateSkillData,validateProjectData,validateEducationData,validateLanguageData,validateListItems,getFirstValidationMessage} from "../utils/validations";
import { isEmail, isURL } from "../utils/validations";
import { useEditorHandlers } from "../hooks/useEditorHandlers";


function Editor() {
  const { darkMode } = useTheme();
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


  const hasFormValues = (obj) =>
    Object.values(obj).some((value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (value instanceof File) return true;
      return Boolean(value);
    });
  const {
    handleAddSkill,
    handleClearSkill,
    handleUpdateSkill,
    handleDeleteSkill,

    handleAddProject,
    handleClearProject,
    handleUpdateProject,
    handleDeleteProject,

    handleAddEducation,
    handleClearEducation,
    handleUpdateEducation,
    handleDeleteEducation,

    handleAddLanguage,
    handleClearLanguage,
    handleUpdateLanguage,
    handleDeleteLanguage
  } = useEditorHandlers({
    skillData,
    setSkillData,
    skillsList,
    setSkillsList,
    setSkillErrors,
    removeSkill,

    projectData,
    setProjectData,
    projectsList,
    setProjectsList,
    setProjectErrors,
    deleteProject,
    validateProjectData,

    educationData,
    setEducationData,
    educationList,
    setEducationList,
    setEducationErrors,
    deleteEducation,
    validateEducationData,

    languageData,
    setLanguageData,
    languagesList,
    setLanguagesList,
    setLanguageErrors,
    deleteLanguage,
    validateLanguageData,

    darkMode,
    showAlert,
    validateSkillData,
    getFirstValidationMessage,
    hasFormValues
  });

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (e) {
    }
  }, []);

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

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }

      if (typeof file === "string") {
        resolve(file);
        return;
      }

      if (!(file instanceof Blob)) {
        reject(new TypeError("fileToBase64 expected a Blob/File or base64 string"));
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    try{
      const validationErrors = validatePersonalForm();
      console.log("SKILLS LIST:", skillsList);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);

        await showAlert(darkMode, {
          icon: "error",
          title: "Invalid form",
          text: "Please fix the errors before continuing",
        });
        return;
      }

      const currentSkillErrors = hasFormValues(skillData) ? validateSkillData(skillData, "Current skill") : {};
      if (Object.keys(currentSkillErrors).length > 0) {
        await showAlert(darkMode, {
          icon: "error",
          title: "Invalid skill",
          text: getFirstValidationMessage(currentSkillErrors)
        });
        return;
      }

      const currentProjectErrors = hasFormValues(projectData) ? validateProjectData(projectData, "Current project") : {};
      if (Object.keys(currentProjectErrors).length > 0) {
        await showAlert(darkMode, {
          icon: "error",
          title: "Invalid project",
          text: getFirstValidationMessage(currentProjectErrors)
        });
        return;
      }

      const currentEducationErrors = hasFormValues(educationData) ? validateEducationData(educationData, "Current education entry") : {};
      if (Object.keys(currentEducationErrors).length > 0) {
        await showAlert(darkMode, {
          icon: "error",
          title: "Invalid education entry",
          text: getFirstValidationMessage(currentEducationErrors)
        });
        return;
      }

      const currentLanguageErrors = hasFormValues(languageData) ? validateLanguageData(languageData, "Current language") : {};
      if (Object.keys(currentLanguageErrors).length > 0) {
        await showAlert(darkMode, {
          icon: "error",
          title: "Invalid language entry",
          text: getFirstValidationMessage(currentLanguageErrors)
        });
        return;
      }

      const listSkillErrors = validateListItems(skillsList, validateSkillData, "Skill");
      if (Object.keys(listSkillErrors).length > 0) {
        await showAlert(darkMode, {
          icon: "error",
          title: "Invalid skill",
          text: getFirstValidationMessage(listSkillErrors)
        });
        return;
      }

      const listProjectErrors = validateListItems(projectsList, validateProjectData, "Project");
      if (Object.keys(listProjectErrors).length > 0) {
        await showAlert(darkMode, {
          icon: "error",
          title: "Invalid project",
          text: getFirstValidationMessage(listProjectErrors)
        });
        return;
      }

      const listEducationErrors = validateListItems(educationList, validateEducationData, "Education entry");
      if (Object.keys(listEducationErrors).length > 0) {
        await showAlert(darkMode, {
          icon: "error",
          title: "Invalid education entry",
          text: getFirstValidationMessage(listEducationErrors)
        });
        return;
      }

      const listLanguageErrors = validateListItems(languagesList, validateLanguageData, "Language");
      if (Object.keys(listLanguageErrors).length > 0) {
        await showAlert(darkMode, {
          icon: "error",
          title: "Invalid language entry",
          text: getFirstValidationMessage(listLanguageErrors)
        });
        return;
      }

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

      const fotoBase64 = await fileToBase64(foto);

      const data = {
        id_usuario: user.id_usuario,
        id_cv: id_cv,
        nombre_completo: formData.nombre_completo,
        profesion: formData.profesion,
        ciudad: formData.ciudad,
        correo: formData.correo,
        telefono: formData.telefono,
        descripcion: formData.descripcion,
        github: formData.github,
        linkedin: formData.linkedin,
        portafolio: formData.portafolio,
        foto_perfil: fotoBase64 || null
      };

      const profileResult = await createProfile(data);
      const id_perfil = profileResult.insertId;

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
              const projectImage =
                project.imagen instanceof File
                  ? await fileToBase64(project.imagen)
                  : project.imagen || null;

              await updateProject(project.id_proyecto, {
                nombre: project.nombre,
                descripcion: project.descripcion,
                tecnologias: project.tecnologias,
                repositorio: project.repositorio,
                deploy: project.deploy,
                imagen: projectImage
              });
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
        const projectImage =
          project.imagen instanceof File
            ? await fileToBase64(project.imagen)
            : project.imagen || null;

        await createProject({
          id_usuario: user.id_usuario,
          id_perfil,
          id_cv,
          nombre: project.nombre,
          descripcion: project.descripcion,
          tecnologias: project.tecnologias,
          repositorio: project.repositorio,
          deploy: project.deploy,
          imagen: projectImage
        });
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

      await showAlert(darkMode, {
        icon: "success",
        title: "Profile saved",
        text: "Information saved successfully",
        confirmButtonText: "View CV"
      });

      navigate(`/preview?cvId=${id_cv}`);
    }catch(error){
      console.error("Error saving:", error);

      await showAlert(darkMode, {
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
