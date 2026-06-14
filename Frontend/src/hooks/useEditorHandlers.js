export const useEditorHandlers = ({
    skillData,
    setSkillData,
    skillsList,
    setSkillsList,
    setSkillErrors,
    removeSkill,

    darkMode,
    showAlert,
    validateSkillData,
    getFirstValidationMessage,
    hasFormValues,

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
}) => {

    const handleAddSkill = async () => {
        if (!hasFormValues(skillData)) {
            await showAlert(darkMode, {
                icon: "warning",
                title: "Action not allowed",
                text: "Please complete and save the current skill before adding a new one."
            });
            return;
        }

        const validationErrors = validateSkillData(skillData);

        if (Object.keys(validationErrors).length > 0) {
            setSkillErrors(validationErrors);

            await showAlert(darkMode, {
                icon: "error",
                title: "Invalid skill",
                text: getFirstValidationMessage(validationErrors)
            });

            return;
        }

        setSkillErrors({});
        setSkillsList(prev => [...prev, skillData]);

        setSkillData({
            nombre: "",
            categoria: "",
            nivel: "",
            descripcion: ""
        });
    };

    const handleClearSkill = () => {
        setSkillData({
            nombre: "",
            categoria: "",
            nivel: "",
            descripcion: ""
        });

        setSkillErrors({});
    };

    const handleUpdateSkill = (index, field, value) => {
        setSkillsList(prev =>
            prev.map((skill, idx) =>
                idx === index
                    ? { ...skill, [field]: value }
                    : skill
            )
        );
    };

    const handleDeleteSkill = async (index) => {
        const skill = skillsList[index];

        try {
            if (skill?.id_habilidad) {
                await removeSkill(skill.id_habilidad);
            }
        } catch (error) {
            console.error("Error deleting skill:", error);
        }

        setSkillsList(prev =>
            prev.filter((_, i) => i !== index)
        );
    };

    const handleAddProject = async () => {
        if (!hasFormValues(projectData)) {
            await showAlert(darkMode, {
                icon: "warning",
                title: "Action not allowed",
                text: "Please complete and save the current project before adding a new one."
            });
            return;
        }

        const validationErrors = validateProjectData(projectData);
        if (Object.keys(validationErrors).length > 0) {
            setProjectErrors(validationErrors);
            await showAlert(darkMode, {
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
            await showAlert(darkMode, {
                icon: "warning",
                title: "Action not allowed",
                text: "Please complete and save the current education entry before adding a new one."
            });
            return;
        }

        const validationErrors = validateEducationData(educationData);
        if (Object.keys(validationErrors).length > 0) {
            setEducationErrors(validationErrors);
            await showAlert(darkMode, {
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
            await showAlert(darkMode, {
                icon: "warning",
                title: "Action not allowed",
                text: "Please complete and save the current language before adding a new one."
            });
            return;
        }

        const validationErrors = validateLanguageData(languageData);
        if (Object.keys(validationErrors).length > 0) {
            setLanguageErrors(validationErrors);
            await showAlert(darkMode, {
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

    return {
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
    };
};