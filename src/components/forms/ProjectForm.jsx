import { useContext, useState } from "react";
import { CVContext } from "../../context/CVContext";
import { validateURL } from "../../utils/validations";

function ProjectForm() {
  const { projects, setProjects } = useContext(CVContext);

  const [form, setForm] = useState({
    name: "",
    description: "",
    tech: "",
    repo: "",
    deploy: "",
    image: ""
  });

  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // validación
  const validateForm = () => {
    if (!form.name || !form.description || !form.tech) {
      setError("Nombre, descripción y tecnologías son obligatorios");
      return false;
    }

    if (!validateURL(form.repo) || !validateURL(form.deploy)) {
      setError("URLs inválidas");
      return false;
    }

    // duplicados
    const exists = projects.some(
      (p, index) =>
        p.name.toLowerCase().trim() === form.name.toLowerCase().trim() &&
        index !== editIndex
    );

    if (exists) {
      setError("Este proyecto ya existe");
      return false;
    }

    setError("");
    return true;
  };

  // crear
  const addProject = () => {
    if (!validateForm()) return;

    setProjects([...projects, form]);
    clearForm();
  };

  // editar
  const updateProject = () => {
    if (!validateForm()) return;

    const updated = [...projects];
    updated[editIndex] = form;

    setProjects(updated);
    clearForm();
  };

  // eliminar
  const deleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // limpiar
  const clearForm = () => {
    setForm({
      name: "",
      description: "",
      tech: "",
      repo: "",
      deploy: "",
      image: ""
    });
    setEditIndex(null);
  };

  // editar
  const startEdit = (project, index) => {
    setForm(project);
    setEditIndex(index);
  };

  return (
    <div className="form-card">
      <h2>Proyectos</h2>

      <input
        name="name"
        placeholder="Nombre del proyecto"
        value={form.name}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="tech"
        placeholder="Tecnologías (React, Node, etc)"
        value={form.tech}
        onChange={handleChange}
      />

      <input
        name="repo"
        placeholder="Repositorio URL"
        value={form.repo}
        onChange={handleChange}
      />

      <input
        name="deploy"
        placeholder="Deploy URL"
        value={form.deploy}
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Imagen URL (opcional)"
        value={form.image}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>{error}</p>

      {/* BOTONES */}
      {editIndex === null ? (
        <button type="button" className="btn-primary" onClick={addProject}>
          Agregar
        </button>
      ) : (
        <button type="button" className="btn-edit" onClick={updateProject}>
          Actualizar
        </button>
      )}

      <button type="button" className="btn-clear" onClick={clearForm}>
        Limpiar
      </button>

      {/* LISTA */}
      <ul className="item-list">
        {projects.map((project, index) => (
          <li key={index}>
            <strong>{project.name}</strong>

            <p>{project.tech}</p>

            <button type="button" className="btn-edit" onClick={() => startEdit(project, index)}>
              Editar
            </button>

            <button type="button" className="btn-delete" onClick={() => deleteProject(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectForm;