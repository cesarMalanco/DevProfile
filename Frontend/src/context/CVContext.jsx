import { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import * as SkillService from "../services/skillService";

export const CVContext = createContext();

export const CVProvider = ({ children }) => {
  const { user } = useAuth();

  const [personalInfo, setPersonalInfo] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [languages, setLanguages] = useState([]);

  const fetchSkills = async () => {
    try {
      if (!user?.id_usuario || isNaN(user.id_usuario)) return;
      const data = await SkillService.getSkills(user.id_usuario);
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [user]);

  const addSkill = async (skillPayload) => {
    const res = await SkillService.createSkill(skillPayload);
    await fetchSkills();
    return res;
  };

  const editSkill = async (id, payload) => {
    const res = await SkillService.updateSkill(id, payload);
    await fetchSkills();
    return res;
  };

  const removeSkill = async (id) => {
    const res = await SkillService.deleteSkill(id);
    await fetchSkills();
    return res;
  };

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
        setLanguages,
        fetchSkills,
        addSkill,
        editSkill,
        removeSkill
      }}
    >
      {children}
    </CVContext.Provider>
  );
};