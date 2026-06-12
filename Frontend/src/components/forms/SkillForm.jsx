import "../../styles/EditorStyles.css";
import "../../styles/globalStyles.css";

function SkillForm({ skillData, setSkillData }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkillData({...skillData, [name]: value});};

  return (
    <section>
      <div className="form-section">
        <div className="section-header-forms">
          <div className="section-icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <div>
            <h3>Skill Information</h3>
            <p>
              Showcase your strongest abilities
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label>
              <i className="fa-solid fa-star"></i>
              Skill Name
            </label>
            <input
              type="text"
              name="nombre"
              value={skillData.nombre}
              onChange={handleChange}
              placeholder="React"
            />
          </div>

          <div className="input-group">
            <label>
              <i className="fa-solid fa-layer-group"></i>
              Category
            </label>
            <input
              type="text"
              name="categoria"
              value={skillData.categoria}
              onChange={handleChange}
              placeholder="Frontend Development"
            />
          </div>
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-chart-line"></i>
            Level
          </label>
          <select
            name="nivel"
            value={skillData.nivel}
            onChange={handleChange}
          >
            <option value="">Select a level</option>
            <option value="Basico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>

        <div className="input-group">
          <label>
            <i className="fa-solid fa-align-left"></i>
            Description
          </label>
          <textarea
            rows="5"
            name="descripcion"
            value={skillData.descripcion}
            onChange={handleChange}
            placeholder="Describe your experience...">
          </textarea>
        </div>

        <div className="skill-actions">
          <button type="button" className="btn-upload">
            <i className="fa-solid fa-plus"></i>
            Add Skill
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

export default SkillForm;