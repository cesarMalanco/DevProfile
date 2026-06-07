import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CVContext = createContext();

export const CVProvider = ({ children }) => {

  const user = localStorage.getItem("loggedUser") || "guest";

  // datos personales
  const [personalInfo, setPersonalInfo] =
    useLocalStorage(
      `${user}_personalInfo`,
      {
        fullName: "",
        profession: "",
        city: "",
        email: "",
        phone: "",
        description: "",
        github: "",
        linkedin: "",
        portfolio: ""
      }
    );

  // imagen de perfil
  const [profileImage, setProfileImage] =
    useLocalStorage(
      `${user}_profileImage`,
      ""
    );

  // habilidades
  const [skills, setSkills] =
    useLocalStorage(
      `${user}_skills`,
      []
    );

  // proyectos
  const [projects, setProjects] =
    useLocalStorage(
      `${user}_projects`,
      []
    );

  // educación
  const [education, setEducation] =
    useLocalStorage(
      `${user}_education`,
      []
    );

  // idiomas
  const [languages, setLanguages] =
    useLocalStorage(
      `${user}_languages`,
      []
    );

    // el context API proporciona el estado y las funciones para actualizarlo 
    // a todos los componentes hijos, esto se logra con el Provider del contexto, 
    // que envuelve a los componentes y les da acceso a los datos del CV y 
    // las funciones para modificarlos

  return (
    <CVContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,

        profileImage,
        setProfileImage,

        skills,
        setSkills,

        projects,
        setProjects,

        education,
        setEducation,

        languages,
        setLanguages
      }}
    >
      {children}
    </CVContext.Provider>
  );
};