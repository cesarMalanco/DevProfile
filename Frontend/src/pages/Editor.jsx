import "../styles/EditorStyles.css";
import PersonalForm from "../components/forms/PersonalForm";
import SkillForm from "../components/forms/SkillForm";
import ProjectForm from "../components/forms/ProjectForm";
import EducationForm from "../components/forms/EducationForm";
import LanguageForm from "../components/forms/LanguageForm";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createProfile } from "../services/profileService";
import { createCv, getCvById, updateCv } from "../services/cvService";
import { useContext } from "react";
import { CVContext } from "../context/CVContext";
import { createProject } from "../services/projectService";
import { createEducation } from "../services/educationService";
import { createLanguage } from "../services/languajeService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isEmail, isURL } from "../utils/validations";


function Editor() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addSkill } = useContext(CVContext);
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
  const [foto, setFoto] = useState(null);

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingCvId, setEditingCvId] = useState(null);

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (e) {
    }
  }, []);

  const validatePersonalForm = () => {
    const newErrors = {};

    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = "El nombre es obligatorio";
    } else if (formData.nombre_completo.length < 3) {
      newErrors.nombre_completo = "Mínimo 3 caracteres";
    }

    if (!formData.profesion.trim()) {
      newErrors.profesion = "La profesión es obligatoria";
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!isEmail(formData.correo)) {
      newErrors.correo = "Correo electrónico inválido";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^\d+$/.test(formData.telefono)) {
      newErrors.telefono = "El teléfono solo debe contener números";
    } else if (formData.telefono.length !== 10) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
    }

    if (!formData.ciudad.trim()) {
      newErrors.ciudad = "La ciudad es obligatoria";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    } else if (formData.descripcion.length < 20) {
      newErrors.descripcion =
        "La descripción debe tener al menos 20 caracteres";
    }

    if (formData.github && !isURL(formData.github)) {
      newErrors.github = "URL de GitHub inválida";
    }

    if (formData.linkedin && !isURL(formData.linkedin)) {
      newErrors.linkedin = "URL de LinkedIn inválida";
    }

    if (formData.portafolio && !isURL(formData.portafolio)) {
      newErrors.portafolio = "URL del portafolio inválida";
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
          title: "Formulario inválido",
          text: "Corrige los errores antes de continuar"
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

      if (isEditing && editingCvId) {
        const newName = formData.nombre_completo
          ? `${formData.nombre_completo} CV`
          : `${user.nombre} CV`;

        await updateCv(editingCvId, { nombre_cv: newName });
      } else {
        const cvPayload = {
          id_usuario: user.id_usuario,
          id_plantilla: null,
          nombre_cv: formData.nombre_completo
            ? `${formData.nombre_completo} CV`
            : `${user.nombre} CV`
        };

        const cvResult = await createCv(cvPayload);
        const id_cv = cvResult.insertId;

            const skillResult = await addSkill({
              ...skillData,
              id_usuario: user.id_usuario,
              id_perfil: id_perfil,
              id_cv
            });

        const projectForm = new FormData();
        projectForm.append("id_usuario", user.id_usuario);
        projectForm.append("id_perfil", id_perfil);
        projectForm.append("id_cv", id_cv);

        projectForm.append("nombre", projectData.nombre);
        projectForm.append("descripcion", projectData.descripcion);
        projectForm.append("tecnologias", projectData.tecnologias);
        projectForm.append("repositorio", projectData.repositorio);
        projectForm.append("deploy", projectData.deploy);

        if (projectData.imagen) {
          projectForm.append("Foto_proyecto", projectData.imagen);
        }

        const projectResult = await createProject(projectForm);

        const educationResult = await createEducation({
          ...educationData,
          id_usuario: user.id_usuario,
          id_perfil: id_perfil,
          id_cv
        });

        const languageResult = await createLanguage({
          ...languageData,
          id_usuario: user.id_usuario,
          id_perfil: id_perfil,
          id_cv
        });
      }

      localStorage.removeItem("formData");
      localStorage.removeItem("skillData");
      localStorage.removeItem("projectData");
      localStorage.removeItem("educationData");
      localStorage.removeItem("languageData");

      await Swal.fire({
        icon: "success",
        title: "Perfil guardado",
        text: "La información se guardó correctamente",
        confirmButtonText: "Ver CV"
      });

      navigate("/preview");
    }catch(error){
      console.error("Error al guardar:", error);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la información"
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
        }

        if (data.skills && data.skills.length > 0) {
          const s = data.skills[0];
          setSkillData({
            nombre: s.nombre || "",
            categoria: s.categoria || "",
            nivel: s.nivel || "",
            descripcion: s.descripcion || ""
          });
        }

        if (data.projects && data.projects.length > 0) {
          const p = data.projects[0];
          setProjectData({
            nombre: p.nombre || "",
            descripcion: p.descripcion || "",
            tecnologias: p.tecnologias || "",
            repositorio: p.repositorio || "",
            deploy: p.deploy || "",
            imagen: null
        });
        }

        if (data.education && data.education.length > 0) {
          const e = data.education[0];
          setEducationData({
            institucion: e.institucion || "",
            programa: e.programa || "",
            periodo: e.periodo || "",
            descripcion: e.descripcion || "",
            evidencia: e.evidencia || ""
          });
        }

        if (data.languages && data.languages.length > 0) {
          const l = data.languages[0];
          setLanguageData({
            idioma: l.idioma || "",
            nivel: l.nivel || "",
            descripcion: l.descripcion || ""
          });
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
        />
        <ProjectForm
          projectData={projectData}
          setProjectData={setProjectData}
        />
        <EducationForm
          educationData={educationData}
          setEducationData={setEducationData}
        />
        <LanguageForm
          languageData={languageData}
          setLanguageData={setLanguageData}
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
