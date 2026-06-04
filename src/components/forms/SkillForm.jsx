import { useContext, useState } from "react";
import useFormValidation from "../../hooks/useFormValidation";
import { CVContext } from "../../context/CVContext";
import { validateSkillLevel } from "../../utils/validations";

function SkillForm() {
  const { skills, setSkills } = useContext(CVContext);

  const [form, setForm] = useState({
    name: "",
    category: "",
    level: "Básico",
    description: ""
  });

  const [editIndex, setEditIndex] = useState(null);

  const {
    errors,
    setErrors,
    clearErrors
  } = useFormValidation();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔎 VALIDACIONES
  const validateForm = () => {
    if (!form.name || !form.category || !form.description) {
      setErrors({
        skill: "Todos los campos son obligatorios"
      });
      return false;
    }

    if (!validateSkillLevel(form.level)) {
      setErrors({
        skill: "Nivel inválido"
      });
      return false;
    }

    // 🚫 duplicados
    const exists = skills.some(
      (skill, index) =>
        skill.name.toLowerCase().trim() === form.name.toLowerCase().trim() &&
        index !== editIndex
    );

    if (exists) {
      setErrors({
        skill: "Esta habilidad ya existe"
      });
      return false;
    }

    clearErrors();
    return true;
  };

  // ➕ CREAR
  const addSkill = () => {
    if (!validateForm()) return;

    setSkills([...skills, form]);
    clearForm();
  };

  // ✏️ EDITAR
  const updateSkill = () => {
    if (!validateForm()) return;

    const updated = [...skills];
    updated[editIndex] = form;

    setSkills(updated);
    clearForm();
  };

  // 🗑️ ELIMINAR
  const deleteSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  // 🧹 LIMPIAR
  const clearForm = () => {
    setForm({
      name: "",
      category: "",
      level: "Básico",
      description: ""
    });

    setEditIndex(null);
    clearErrors();
  };

  // ✏️ cargar en edición
  const startEdit = (skill, index) => {
    setForm(skill);
    setEditIndex(index);
  };

  return (
    <div>
      <h2>Habilidades</h2>

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Categoría"
        value={form.category}
        onChange={handleChange}
      />

      <select name="level" value={form.level} onChange={handleChange}>
        <option>Básico</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </select>

      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.skill}
      </p>

      {/* BOTONES */}
      {editIndex === null ? (
        <button onClick={addSkill}>Agregar</button>
      ) : (
        <button onClick={updateSkill}>Actualizar</button>
      )}

      <button onClick={clearForm}>Limpiar</button>

      {/* LISTA */}
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            <strong>{skill.name}</strong> - {skill.level}

            <button onClick={() => startEdit(skill, index)}>
              Editar
            </button>

            <button onClick={() => deleteSkill(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillForm;