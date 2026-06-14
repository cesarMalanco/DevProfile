import "../../styles/EditorStyles.css";
import "../../styles/globalStyles.css";
import AccordionItem from "../Accordion";

function LanguageForm({ languageData, setLanguageData, languagesList = [], onAdd, onClear, onUpdate, onDelete, errors = {} }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLanguageData({
      ...languageData,
      [name]: value
    });
  };

  const handleListChange = (index, name, value) => {
    onUpdate(index, name, value);
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

        {languagesList.length > 0 && (
          <div className="accordion-group">
            {languagesList.map((language, index) => (
              <AccordionItem
                key={index}
                title={`${language.idioma || "Language"}${language.nivel ? ` - ${language.nivel}` : ""}`}
                icon="fa-solid fa-language"
                onDelete={() => onDelete && onDelete(index)}
              >
                <div className="input-group">
                  <label>Language</label>
                  <input
                    type="text"
                    value={language.idioma}
                    onChange={(e) => handleListChange(index, "idioma", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Proficiency Level</label>
                  <select
                    value={language.nivel}
                    onChange={(e) => handleListChange(index, "nivel", e.target.value)}
                  >
                    <option value="Basico">Basic</option>
                    <option value="Intermedio">Intermediate</option>
                    <option value="Avanzado">Advanced</option>
                    <option value="Nativo">Native</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Description / Certification</label>
                  <textarea
                    rows="3"
                    value={language.descripcion}
                    onChange={(e) => handleListChange(index, "descripcion", e.target.value)}
                  />
                </div>
              </AccordionItem>
            ))}
          </div>
        )}

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
          {errors?.idioma && <span className="error-message">{errors.idioma}</span>}
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
          {errors?.nivel && <span className="error-message">{errors.nivel}</span>}
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
          {errors?.descripcion && <span className="error-message">{errors.descripcion}</span>}
        </div>

        <div className="skill-actions">
          <button type="button" className="btn-upload" onClick={onAdd}>
            <i className="fa-solid fa-plus"></i>
            Add Language
          </button>

          <button type="button" className="btn-upload" onClick={onClear}>
            <i className="fa-solid fa-eraser"></i>
            Clear
          </button>
        </div>

      </div>
    </section>
  );
}

export default LanguageForm;