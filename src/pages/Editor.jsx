import "../styles/EditorStyles.css";
import "../styles/FormStyles.css";

import PersonalForm from "../components/forms/PersonalForm";
import ImageProfile from "../components/forms/ImageProfile";
import SkillForm from "../components/forms/SkillForm";
import ProjectForm from "../components/forms/ProjectForm";
import EducationForm from "../components/forms/EducationForm";
import LanguageForm from "../components/forms/LanguageForm";

function Editor() {

  const user = localStorage.getItem("loggedUser");

  if (!user) {
    return (
      <div className="editor-locked">
        <div className="editor-locked-card">
          <h1>🔒 Acceso Restringido</h1>

          <p>
            Debes iniciar sesión para acceder
            al editor de CV.
          </p>

          <p>
            Inicia sesión desde el botón ubicado
            en la parte superior derecha.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">

      <h1 className="editor-title">
        Editor de CV
      </h1>

      <div className="forms-grid">

        <PersonalForm />
        <ImageProfile />
        <SkillForm />
        <ProjectForm />
        <EducationForm />
        <LanguageForm />

      </div>

    </div>
  );
}

export default Editor;