import "../../styles/EditorStyles.css";
import "../../styles/globalStyles.css";
import AccordionItem from "../Accordion";

function SkillForm({ skillData, setSkillData, skillsList = [], onAdd, onClear, onUpdate, onDelete, errors = {} }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkillData({ ...skillData, [name]: value });
  };

  const handleListChange = (index, name, value) => {
    onUpdate(index, name, value);
  };

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

        {skillsList.length > 0 && (
          <div className="accordion-group">
            {skillsList.map((skill, index) => (
              <AccordionItem
                key={index}
                title={`${skill.nombre || "Skill"}${skill.categoria ? ` - ${skill.categoria}` : ""}`}
                icon="fa-solid fa-star"
                onDelete={() => onDelete && onDelete(index)}
              >
                <div className="form-grid">
                  <div className="input-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={skill.nombre}
                      onChange={(e) => handleListChange(index, "nombre", e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={skill.categoria}
                      onChange={(e) => handleListChange(index, "categoria", e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Level</label>
                  <select
                    value={skill.nivel}
                    onChange={(e) => handleListChange(index, "nivel", e.target.value)}
                  >
                    <option value="">Select a level</option>
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea
                    rows="4"
                    value={skill.descripcion}
                    onChange={(e) => handleListChange(index, "descripcion", e.target.value)}
                  />
                </div>
              </AccordionItem>
            ))}
          </div>
        )}

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
            {errors?.nombre && <span className="error-message">{errors.nombre}</span>}
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
            {errors?.categoria && <span className="error-message">{errors.categoria}</span>}
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
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {errors?.nivel && <span className="error-message">{errors.nivel}</span>}
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
          {errors?.descripcion && <span className="error-message">{errors.descripcion}</span>}
        </div>

        <div className="skill-actions">
          <button type="button" className="btn-upload" onClick={onAdd}>
            <i className="fa-solid fa-plus"></i>
            Add Skill
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

export default SkillForm;