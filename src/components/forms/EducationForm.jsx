import { useContext, useState } from "react";
import { CVContext } from "../../context/CVContext";

function EducationForm() {
  const { education, setEducation } = useContext(CVContext);

  const [form, setForm] = useState({
    institution: "",
    program: "",
    period: "",
    description: "",
    evidence: ""
  });

  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // validar
  const validateForm = () => {
    if (!form.institution || !form.program || !form.period) {
      setError("Institución, programa y periodo son obligatorios");
      return false;
    }

    setError("");
    return true;
  };

  // crear
  const addEducation = () => {
    if (!validateForm()) return;

    setEducation([...education, form]);
    clearForm();
  };

  // editar
  const updateEducation = () => {
    if (!validateForm()) return;

    const updated = [...education];
    updated[editIndex] = form;

    setEducation(updated);
    clearForm();
  };

  // eliminar
  const deleteEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  // limpiar
  const clearForm = () => {
    setForm({
      institution: "",
      program: "",
      period: "",
      description: "",
      evidence: ""
    });
    setEditIndex(null);
  };

  // editar
  const startEdit = (item, index) => {
    setForm(item);
    setEditIndex(index);
  };

  return (
    <div className="form-card">
      <h2>Educación / Certificaciones</h2>

      <input
        name="institution"
        placeholder="Institución"
        value={form.institution}
        onChange={handleChange}
      />

      <input
        name="program"
        placeholder="Programa o curso"
        value={form.program}
        onChange={handleChange}
      />

      <input
        name="period"
        placeholder="Año o periodo"
        value={form.period}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="evidence"
        placeholder="Link de evidencia (opcional)"
        value={form.evidence}
        onChange={handleChange}
      />

      <p className="error-message">
        {error}
      </p>

      {/* BOTONES */}
      {editIndex === null ? (
        <button type="button" className="btn-primary" onClick={addEducation}>
          Agregar
        </button>
      ) : (
        <button type="button" className="btn-edit" onClick={updateEducation}>
          Actualizar
        </button>
      )}

      <button type="button" className="btn-clear" onClick={clearForm}>
        Limpiar
      </button>

      {/* LISTA */}
      <ul className="item-list">
        {education.map((item, index) => (
          <li key={index}>
            <strong>{item.institution}</strong> - {item.program}

            <button type="button" className="btn-edit" onClick={() => startEdit(item, index)}>
              Editar
            </button>

            <button type="button" className="btn-delete" onClick={() => deleteEducation(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EducationForm;