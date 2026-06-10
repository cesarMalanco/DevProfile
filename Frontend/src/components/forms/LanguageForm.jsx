import { useContext, useState } from "react";
import { CVContext } from "../../context/CVContext";
import { validateSkillLevel } from "../../utils/validations";

function LanguageForm() {
  const { languages, setLanguages } = useContext(CVContext);

  const [form, setForm] = useState({
    language: "",
    level: "Básico"
  });

  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // VALIDACIONES
  const validateForm = () => {
    if (!form.language || !form.level) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    if (!validateSkillLevel(form.level)) {
      setError("Nivel inválido");
      return false;
    }

    const exists = languages.some(
      (lang, index) =>
        lang.language.toLowerCase() ===
          form.language.toLowerCase() &&
        index !== editIndex
    );

    if (exists) {
      setError("Este idioma ya existe");
      return false;
    }

    setError("");
    return true;
  };

  // CREAR
  const addLanguage = () => {
    if (!validateForm()) return;

    setLanguages([...languages, form]);
    clearForm();
  };

  // EDITAR
  const updateLanguage = () => {
    if (!validateForm()) return;

    const updated = [...languages];
    updated[editIndex] = form;

    setLanguages(updated);
    clearForm();
  };

  // ELIMINAR
  const deleteLanguage = (index) => {
    const updated = languages.filter((_, i) => i !== index);
    setLanguages(updated);
  };

  // LIMPIAR
  const clearForm = () => {
    setForm({
      language: "",
      level: "Básico"
    });

    setEditIndex(null);
    setError("");
  };

  // CARGAR PARA EDICIÓN
  const startEdit = (language, index) => {
    setForm(language);
    setEditIndex(index);
  };

  return (
    <div className="form-card">
      <h2>Idiomas</h2>

      <input
        type="text"
        name="language"
        placeholder="Idioma"
        value={form.language}
        onChange={handleChange}
      />

      <select
        name="level"
        value={form.level}
        onChange={handleChange}
      >
        <option>Básico</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </select>

      <p style={{ color: "red" }}>{error}</p>

      {editIndex === null ? (
        <button type="button" className="btn-primary" onClick={addLanguage}>
          Agregar
        </button>
      ) : (
        <button type="button" className="btn-edit" onClick={updateLanguage}>
          Actualizar
        </button>
      )}

      <button type="button" className="btn-clear" onClick={clearForm}>
        Limpiar
      </button>

      <ul className="item-list">
        {languages.map((lang, index) => (
          <li key={index}>
            <strong>{lang.language}</strong> - {lang.level}

            <button
              type="button"
              className="btn-edit"

              onClick={() =>
                startEdit(lang, index)
              }
            >
              Editar
            </button>

            <button
              type="button"
              className="btn-delete"
              onClick={() =>
                deleteLanguage(index)
              }
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LanguageForm;