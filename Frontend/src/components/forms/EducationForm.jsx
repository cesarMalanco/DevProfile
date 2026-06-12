import "../../styles/EditorStyles.css";
import "../../styles/globalStyles.css";

function EducationForm({ educationData, setEducationData }){
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData({ ...educationData, [name]: value });
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
        </div>

        <div className="skill-actions">
          <button type="button" className="btn-upload">
            <i className="fa-solid fa-plus"></i>
            Add Education
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

export default EducationForm;