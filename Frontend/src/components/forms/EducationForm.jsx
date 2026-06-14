import "../../styles/EditorStyles.css";
import "../../styles/globalStyles.css";
import AccordionItem from "../Accordion";

function EducationForm({ educationData, setEducationData, educationList = [], onAdd, onClear, onUpdate, onDelete, errors = {} }){
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData({ ...educationData, [name]: value });
  };

  const handleListChange = (index, name, value) => {
    onUpdate(index, name, value);
  };

  return (
    <section>
      <div className="form-section">
        <div className="section-header-forms">
          <div className="section-icon">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>
          <div>
            <h3>Academic Information</h3>
            <p>
              Include your studies and professional training
            </p>
          </div>
        </div>

        {educationList.length > 0 && (
          <div className="accordion-group">
            {educationList.map((education, index) => (
              <AccordionItem
                key={index}
                title={`${education.institucion || "Education"}${education.programa ? ` - ${education.programa}` : ""}`}
                icon="fa-solid fa-graduation-cap"
                onDelete={() => onDelete && onDelete(index)}
              >
                <div className="form-grid">
                  <div className="input-group">
                    <label>Institution</label>
                    <input
                      type="text"
                      value={education.institucion}
                      onChange={(e) => handleListChange(index, "institucion", e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Program / Course</label>
                    <input
                      type="text"
                      value={education.programa}
                      onChange={(e) => handleListChange(index, "programa", e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Period</label>
                  <input
                    type="text"
                    value={education.periodo}
                    onChange={(e) => handleListChange(index, "periodo", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea
                    rows="4"
                    value={education.descripcion}
                    onChange={(e) => handleListChange(index, "descripcion", e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Evidence Link</label>
                  <input
                    type="text"
                    value={education.evidencia}
                    onChange={(e) => handleListChange(index, "evidencia", e.target.value)}
                  />
                </div>
              </AccordionItem>
            ))}
          </div>
        )}

        <div className="form-grid">
          <div className="input-group">
            <label>
              <i className="fa-solid fa-school"></i>
              Institution
            </label>
            <input
              type="text"
              name="institucion"
              value={educationData.institucion}
              onChange={handleChange}
              placeholder="Universidad Autónoma de Aguascalientes"
            />
            {errors?.institucion && <span className="error-message">{errors.institucion}</span>}
          </div>

          <div className="input-group">
            <label>
              <i className="fa-solid fa-book-open"></i>
              Program / Course
            </label>
            <input
              type="text"
              name="programa"
              value={educationData.programa}
              onChange={handleChange}
              placeholder="Computer Systems Engineering"
            />
            {errors?.programa && <span className="error-message">{errors.programa}</span>}
          </div>
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-calendar"></i>
            Period
          </label>
          <input
            type="text"
            name="periodo"
            value={educationData.periodo}
            onChange={handleChange}
            placeholder="2022 - 2026"
          />
          {errors?.periodo && <span className="error-message">{errors.periodo}</span>}
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-align-left"></i>
            Description
          </label>
          <textarea 
            rows="5"
            name="descripcion"
            value={educationData.descripcion}
            onChange={handleChange}
            placeholder="Describe your studies, achievements, or certification details...">
          </textarea>
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-link"></i>
            Evidence Link
          </label>
          <input
            type="text"
            name="evidencia"
            value={educationData.evidencia}
            onChange={handleChange}
            placeholder="https://certificate-link.com"
          />
          {errors?.evidencia && <span className="error-message">{errors.evidencia}</span>}
        </div>

        <div className="skill-actions">
          <button type="button" className="btn-upload" onClick={onAdd}>
            <i className="fa-solid fa-plus"></i>
            Add Education
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

export default EducationForm;