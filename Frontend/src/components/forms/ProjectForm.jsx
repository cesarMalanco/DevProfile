import { useEffect, useState } from "react";
import "../../styles/EditorStyles.css";
import "../../styles/globalStyles.css";
import AccordionItem from "../Accordion";

const useImagePreview = (image) => {
  const [preview, setPreview] = useState(null);
  const backendUrl = "http://localhost:3000";

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    if (typeof image === "string") {
      const fullUrl =
        image.startsWith("http") || image.startsWith("/")
          ? image
          : `${backendUrl}/uploads/${image}`;
      setPreview(fullUrl);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  return preview;
};

const ImagePreview = ({ image }) => {
  const preview = useImagePreview(image);

  return (
    <>
      {preview ? (
        <img src={preview} alt="Project preview" className="avatar-image" />
      ) : (
        <i className="fa-solid fa-image"></i>
      )}
    </>
  );
};

function ProjectForm({ projectData, setProjectData, projectsList = [], onAdd, onClear, onUpdate, onDelete, errors = {} }) {
  const currentImagePreview = useImagePreview(projectData.imagen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleListChange = (index, name, value) => {
    onUpdate(index, name, value);
  };

  const handleListImageChange = (index, file) => {
    onUpdate(index, "imagen", file);
  };

  const handleListRemoveImage = (index) => {
    onUpdate(index, "imagen", null);
  };

  const getImageLabel = (image) => {
    if (!image) return "JPG, PNG • Max 5MB";
    return typeof image === "string" ? image : image.name;
  };

  return (
    <section>
        <div className="form-section">
          <div className="section-header-forms">
            <div className="section-icon">
              <i className="fa-solid fa-folder-open"></i>
            </div>
            <div>
              <h3>Project Information</h3>
              <p>Add your most relevant work</p>
            </div>
          </div>

          {projectsList.length > 0 && (
            <div className="accordion-group">
              {projectsList.map((project, index) => (
                <AccordionItem
                  key={index}
                  title={`${project.nombre || "Project"}${project.tecnologias ? ` - ${project.tecnologias}` : ""}`}
                  icon="fa-solid fa-folder-open"
                  onDelete={() => onDelete && onDelete(index)}
                >
                  <div className="form-grid">
                    <div className="input-group">
                      <label>Project Name</label>
                      <input
                        type="text"
                        value={project.nombre}
                        onChange={(e) => handleListChange(index, "nombre", e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label>Technologies</label>
                      <input
                        type="text"
                        value={project.tecnologias}
                        onChange={(e) => handleListChange(index, "tecnologias", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Description</label>
                    <textarea
                      rows="4"
                      value={project.descripcion}
                      onChange={(e) => handleListChange(index, "descripcion", e.target.value)}
                    />
                  </div>
                  <div className="form-grid">
                    <div className="input-group">
                      <label>Repository</label>
                      <input
                        type="url"
                        value={project.repositorio}
                        onChange={(e) => handleListChange(index, "repositorio", e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label>Live Demo</label>
                      <input
                        type="url"
                        value={project.deploy}
                        onChange={(e) => handleListChange(index, "deploy", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="photo-section project-photo-section">
                    <div className="profile-preview">
                      <div className="avatar-placeholder">
                        <ImagePreview image={project.imagen} />
                      </div>
                    </div>
                    <div className="photo-info">
                      <h4>Project Image</h4>
                      <p>Upload or change the image for this project</p>
                      <div className="photo-actions">
                        <input
                          id={`Foto_proyecto_${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleListImageChange(index, e.target.files[0])
                          }
                          style={{ display: "none" }}
                        />
                        <label htmlFor={`Foto_proyecto_${index}`} className="btn-upload">
                          <i className="fa-solid fa-cloud-upload-alt"></i>
                          Change file
                        </label>
                        {project.imagen && (
                          <button
                            type="button"
                            className="btn-upload btn-remove"
                            onClick={() => handleListRemoveImage(index)}
                          >
                            <i className="fa-solid fa-trash"></i>
                            Remove
                          </button>
                        )}
                      </div>
                      <span className="file-hint">{getImageLabel(project.imagen)}</span>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </div>
          )}

          <div className="form-grid">
            <div className="input-group">
              <label>
                <i className="fa-solid fa-diagram-project"></i>
                Project Name
              </label>
              <input
                type="text"
                name="nombre"
                value={projectData.nombre}
                onChange={handleChange}
                placeholder="Task Manager App"
              />
              {errors?.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            <div className="input-group">
              <label>
                <i className="fa-solid fa-code"></i>
                Technologies
              </label>
              <input
                type="text"
                name="tecnologias"
                value={projectData.tecnologias}
                onChange={handleChange}
                placeholder="React, Node.js, MySQL"
              />
              {errors?.tecnologias && <span className="error-message">{errors.tecnologias}</span>}
            </div>
          </div>

          <div className="input-group">
            <label>
              <i className="fa-solid fa-align-left"></i>
              Description
            </label>
            <textarea
              rows="5"
              name="descripcion"
              value={projectData.descripcion}
              onChange={handleChange}
              placeholder="Describe your project, goals and achievements..."
            ></textarea>
            {errors?.descripcion && <span className="error-message">{errors.descripcion}</span>}
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>
                <i className="fa-brands fa-github"></i>
                Repository
              </label>
              <input
                type="url"
                name="repositorio"
                value={projectData.repositorio}
                onChange={handleChange}
                placeholder="https://github.com/user/project"
              />
              {errors?.repositorio && <span className="error-message">{errors.repositorio}</span>}
            </div>

            <div className="input-group">
              <label>
                <i className="fa-solid fa-globe"></i>
                Live Demo
              </label>
              <input
                type="url"
                name="deploy"
                value={projectData.deploy}
                onChange={handleChange}
                placeholder="https://project.com"
              />
              {errors?.deploy && <span className="error-message">{errors.deploy}</span>}
            </div>
          </div>

            <div className="photo-section">
              <div className="profile-preview">
                <div className="avatar-placeholder">
                  <ImagePreview image={projectData.imagen} />
                </div>
                <button type="button" className="btn-edit-photo">
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>

              <div className="photo-info">
                <h4>Project Preview</h4>
                <p>The project image will appear here</p>
                <div className="photo-actions">
                  <input
                    id="Foto_proyecto"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setProjectData({ ...projectData, imagen: e.target.files[0] })
                    }
                    style={{ display: "none" }}
                  />
                  <label htmlFor="Foto_proyecto" className="btn-upload">
                    <i className="fa-solid fa-cloud-upload-alt"></i>
                    Choose file
                  </label>
                  {projectData.imagen && (
                    <button
                      type="button"
                      className="btn-upload btn-remove"
                      onClick={() => setProjectData({ ...projectData, imagen: null })}
                    >
                      <i className="fa-solid fa-trash"></i>
                      Remove
                    </button>
                  )}
                </div>
                <span className="file-hint">{getImageLabel(projectData.imagen)}</span>
              </div>
            </div>

          <div className="skill-actions">
            <button type="button" className="btn-upload" onClick={onAdd}>
              <i className="fa-solid fa-plus"></i>
              Add Project
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

export default ProjectForm;