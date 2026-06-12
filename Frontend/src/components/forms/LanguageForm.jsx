import "../../styles/EditorStyles.css";
import "../../styles/globalStyles.css";

function LanguageForm({ languageData, setLanguageData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLanguageData({
      ...languageData,
      [name]: value
    });
  };

  return (
    <section>
      <div className="form-section">

        <div className="section-header-forms">
          <div className="section-icon">
            <i className="fa-solid fa-language"></i>
          </div>

          <div>
            <h3>Language Information</h3>
            <p>Add the languages you speak and your proficiency level</p>
          </div>
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-earth-americas"></i>
            Language
          </label>
          <input
            type="text"
            name="idioma"
            value={languageData.idioma}
            onChange={handleChange}
            placeholder="English"
          />
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-chart-line"></i>
            Proficiency Level
          </label>

          <select
            name="nivel"
            value={languageData.nivel}
            onChange={handleChange}
          >
            <option value="Basico">Basic</option>
            <option value="Intermedio">Intermediate</option>
            <option value="Avanzado">Advanced</option>
            <option value="Nativo">Native</option>
          </select>
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-certificate"></i>
            Description / Certification
          </label>

          <textarea
            name="descripcion"
            rows="4"
            value={languageData.descripcion}
            onChange={handleChange}
            placeholder="Example: TOEFL iBT Score 95..."
          />
        </div>

        <div className="skill-actions">
          <button type="button" className="btn-upload">
            <i className="fa-solid fa-plus"></i>
            Add Language
          </button>

          <button type="button" className="btn-upload">
            <i className="fa-solid fa-eraser"></i>
            Clear
          </button>
        </div>

      </div>
    </section>
  );
}

export default LanguageForm;