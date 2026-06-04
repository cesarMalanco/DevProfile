import PersonalForm from "../components/forms/PersonalForm";
import ImageProfile from "../components/forms/ImageProfile";
import SkillForm from "../components/forms/SkillForm";
import ProjectForm from "../components/forms/ProjectForm";
import EducationForm from "../components/forms/EducationForm";
import LanguageForm from "../components/forms/LanguageForm";

function Editor() {
  return (
    <div>
      <h1>Editor del CV</h1>

      <PersonalForm />
      <ImageProfile />
      <SkillForm />
      <ProjectForm />
      <EducationForm />
      <LanguageForm />
    </div>
  );
}

export default Editor;